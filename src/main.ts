require('dotenv').config();
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
NestFactory.createApplicationContext(AppModule);