import { CreateGenreDto } from '@core/dtos';
import { Genre } from '@core/entities';
import { Injectable } from '@nestjs/common';

@Injectable()
export class GenreFactoryService {
  createNewGenre(createGenreDto: CreateGenreDto): Genre {
    const { title } = createGenreDto;
    const id = title;
    const slug = title;
    const createdAt = new Date();
    const updatedAt = new Date();

    const newGenre = new Genre();

    newGenre.setId(id);
    newGenre.setTitle(title);
    newGenre.setSlug(slug);
    newGenre.setCreatedAt(createdAt);
    newGenre.setUpdatedAt(updatedAt);

    return newGenre;
  }
}
