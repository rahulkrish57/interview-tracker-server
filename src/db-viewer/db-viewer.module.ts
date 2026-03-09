import { Module } from '@nestjs/common';
import { DbViewerController } from './db-viewer.controller';

@Module({
  controllers: [DbViewerController],
})
export class DbViewerModule {}
