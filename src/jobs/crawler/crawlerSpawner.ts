import { spawn } from "child_process";

// python3 main.py -t "Naver" -u "https://news.naver.com/main/list.naver?mode=LS2D&mid=shm&sid1=101&sid2=259" -n 3
type CRAWLER_TYPE = "Naver" | "velog";

class Crawler {
  public crawlerType: CRAWLER_TYPE;
  public url: string;
  public numPosts: number;
  public crawler: any;
  public result: string;

  constructor(crawlerType: CRAWLER_TYPE, url: string, numPosts: number) {
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
      this.numPosts.toString()
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
  const crawler = new Crawler(
    "Naver",
    "https://news.naver.com/main/list.naver?mode=LS2D&mid=shm&sid1=100&sid2=264",
    2
  );

  crawler.run();
}

run();
