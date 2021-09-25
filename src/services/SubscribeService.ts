import { SubscribeRepository } from "@/db/repository/SubscribeRepository";

class SubscribeService {
  private subscribeRepository: SubscribeRepository;

  constructor(subscribeRepository: SubscribeRepository) {
    this.subscribeRepository = subscribeRepository;
  }
}

export default SubscribeService;
