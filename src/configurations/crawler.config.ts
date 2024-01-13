interface IPuppeteer {
  executablePath: string;
  userDataDir: string;
}

export default (): { PUPPETEER_CONFIG: IPuppeteer } => ({
  PUPPETEER_CONFIG: {
    executablePath:
      'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
    userDataDir:
      'C:\\Users\\Admin\\AppData\\Local\\Google\\Chrome\\User Data\\Profile 3',
  },
});
