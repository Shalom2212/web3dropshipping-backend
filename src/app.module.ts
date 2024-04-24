import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DeployInBlockchainModule } from './deploy-in-blockchain/deploy-in-blockchain.module';
import { SupplierDetailsModule } from './supplier-details/supplier-details.module';

@Module({
  imports: [DeployInBlockchainModule, SupplierDetailsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
