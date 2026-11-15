import { Controller, Get, Param } from "@nestjs/common";
import { EmailSubscriberService } from "./email-subscriber.service";

@Controller('subscribers')
export class SubscribersController {
  constructor(
    private readonly emailSubscriberService: EmailSubscriberService,
  ) {}

  @Get(':userId/count')
  async getSubscriberCount(
    @Param('userId') userId: string,
  ) {
    return this.emailSubscriberService.countByAuthorId(userId);
  }
}