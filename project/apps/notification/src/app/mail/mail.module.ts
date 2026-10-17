import { MailerModule } from "@nestjs-modules/mailer";
import { Module } from "@nestjs/common";
import { getMailerAsyncOptions } from "@project/notify";
import { MailService } from "./mail.service";

@Module({
  imports: [
    MailerModule.forRootAsync(getMailerAsyncOptions('mail'))
  ],
  providers: [
    MailService
  ],
  exports: [
    MailService
  ]
})
export class MailModule {}