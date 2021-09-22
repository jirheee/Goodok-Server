import config from "@/config";
import { Website } from "@/db/entity/website";
import { WebsiteRepository } from "@/db/repository/WebsiteRepository";
import { createConnection } from "typeorm";

const urls = [
  //정치
  "https://news.naver.com/main/list.naver?mode=LSD&mid=sec&sid1=100",
  //경제
  "https://news.naver.com/main/list.naver?mode=LSD&mid=sec&sid1=101",
  //사회
  "https://news.naver.com/main/list.naver?mode=LSD&mid=sec&sid1=102"
];

async function seed() {
  const connection = await createConnection(config.db);
  const websiteRepository = connection.getCustomRepository(WebsiteRepository);

  for (const url of urls) {
    const website = new Website();
    website.domain = url;
    await websiteRepository.saveWebsite(website);
  }

  console.log("Finished Seeding");
}

seed();
