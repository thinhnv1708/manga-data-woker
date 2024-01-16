/* eslint-disable @typescript-eslint/ban-types */
import { COMMONS } from '@constants/index';
import { CrawlerService } from '@modules/crawler/crawler.service';
import { Process, Processor } from '@nestjs/bull';
import { Job } from 'bull';
import { getSource } from 'src/utils/source.util';
const { BULL_QUEUE_NAMES } = COMMONS;
@Processor(BULL_QUEUE_NAMES.MANGA)
export class MangaBullConsumer {
  constructor(private crawlerService: CrawlerService) {}
  @Process()
  async handle(job: Job) {
    myQueue.enqueue(
      createAction({
        promiseCallback: this.crawlerService.handleCrawlManga({
          url: getSource(job.data?.id),
        }),
        onSuccess: () => {
          console.log('SuccessJob:', job.data);
        },
        onError: () => {
          console.log('ErrorJob:', job.data);
        },
      }),
    );
  }
}

class ActionQueue {
  maxConcurrent: any;
  queue: Function[] = [];
  running: number;

  constructor(maxConcurrent) {
    this.maxConcurrent = maxConcurrent || 5;
    this.queue = [];
    this.running = 0;
  }

  enqueue(action) {
    this.queue.push(action);
    this.processQueue();
  }

  processQueue() {
    while (this.running < this.maxConcurrent && this.queue.length > 0) {
      const action = this.queue.shift();
      this.running++;
      action?.(this.handleActionCompletion.bind(this));
    }
  }

  handleActionCompletion() {
    this.running--;
    this.processQueue();
  }
}

const myQueue = new ActionQueue(5);

const createAction = ({ promiseCallback, onSuccess, onError }) => {
  return async function (callback) {
    try {
      await promiseCallback();
      onSuccess();
      callback();
    } catch (error) {
      onError();
    }
  };
};
