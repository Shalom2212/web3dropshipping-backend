import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DeployInBlockchainModule } from './deploy-in-blockchain/deploy-in-blockchain.module';
import { SupplierDetailsModule } from './supplier-details/supplier-details.module';
import { DeployPackageTrackerController } from './deploy-package-tracker/deploy-package-tracker.controller';
import { DeployPackageTrackerModule } from './deploy-package-tracker/deploy-package-tracker.module';
import { DeployPackageTrackerService } from './deploy-package-tracker/deploy-package-tracker.service';
import { ConfigModule } from '@nestjs/config';
import { ProductDetailsModule } from './product-details/product-details.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    DeployInBlockchainModule,
    SupplierDetailsModule,
    DeployPackageTrackerModule,
    ProductDetailsModule,
  ],
  controllers: [AppController, DeployPackageTrackerController],
  providers: [AppService, DeployPackageTrackerService],
})
export class AppModule {}
