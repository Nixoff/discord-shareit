import { Module } from '@nestjs/common';
import { NotionRoutineService } from './Services/notion.service';

@Module({
  controllers: [],
  providers: [NotionRoutineService]
})

export class NotionModule { }
