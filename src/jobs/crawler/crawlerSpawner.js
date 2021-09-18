const { spawn } = require("child_process");

// python3 main.py -t "Naver" -u "https://news.naver.com/main/list.naver?mode=LS2D&mid=shm&sid1=101&sid2=259" -n 3

class CrawlerSpawner {
  crawlerType;
  url;
  numPosts;
  crawler;
  result;

  constructor(crawlerType, url, numPosts) {
    this.crawlerType = crawlerType;
    this.url = url;
    this.numPosts = numPosts;
    this.result = "";
  }

  run() {
    this.crawler = spawn("python3", [
      "main.py",
      "-t",
      this.crawlerType,
      "-u",
      this.url,
      "-n",
      this.numPosts
    ]);

    this.crawler.stdout.on("data", data => {
      this.result += data;
      console.log(data.toString());
    });

    this.crawler.stderr.on("data", data => {
      console.error(data.toString());
    });

    this.crawler.on("exit", code => {
      let parsed = JSON.parse(this.result);
      console.log(parsed);
      console.log(`Child exited with code ${code}`);
    });
  }
}

async function run() {
  const crawler = new CrawlerSpawner(
    "Naver",
    "https://news.naver.com/main/list.naver?mode=LS2D&mid=shm&sid1=100&sid2=264",
    "5"
  );

  crawler.run();
}

run();
