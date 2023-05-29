import { Module } from '@nestjs/common';
import { NotionController } from './Controllers/notion.controller';
import { NotionService } from './Services/notion.service';

@Module({
  controllers: [NotionController],
  providers: [NotionService]
})
export class NotionModule {}
