import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DeployInBlockchainModule } from './deploy-in-blockchain/deploy-in-blockchain.module';

@Module({
  imports: [DeployInBlockchainModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
