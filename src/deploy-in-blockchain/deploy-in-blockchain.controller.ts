import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { DeployInBlockchainService } from './deploy-in-blockchain.service';
import { CreateDeployInBlockchainDto } from './dto/create-deploy-in-blockchain.dto';
import { UpdateDeployInBlockchainDto } from './dto/update-deploy-in-blockchain.dto';

@Controller('deploy-in-blockchain')
export class DeployInBlockchainController {
  constructor(
    private readonly deployInBlockchainService: DeployInBlockchainService,
  ) {}

  @Post()
  create(@Body() createDeployInBlockchainDto: CreateDeployInBlockchainDto) {
    return this.deployInBlockchainService.create(createDeployInBlockchainDto);
  }

  @Get()
  findAll() {
    return this.deployInBlockchainService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.deployInBlockchainService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateDeployInBlockchainDto: UpdateDeployInBlockchainDto,
  ) {
    return this.deployInBlockchainService.update(
      +id,
      updateDeployInBlockchainDto,
    );
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.deployInBlockchainService.remove(+id);
  }
}
