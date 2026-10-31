import { Module } from "@nestjs/common";
import { PostMailingService } from "./post-mailing.service";
import { PostMailingController } from "./post-mailing.controller";
import { NotifyModule } from "../notify/notify.module";
import { PostMailingRepository } from "./post-mailing.repository";
import { PrismaClientModule } from "@project/models";

@Module({
    imports: [NotifyModule, PrismaClientModule],
    exports: [PostMailingService],
    controllers: [PostMailingController],
    providers: [PostMailingService, PostMailingRepository],
})
export class PostMailingModule {}