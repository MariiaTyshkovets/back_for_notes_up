import { MongooseModule } from '@nestjs/mongoose';
import { Module } from '@nestjs/common';
import { NotesModule } from './notes/notes.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { URI } from './config/app.config';



@Module({
  imports: [NotesModule, MongooseModule.forRoot(URI)],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
