import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { DeployPackageTrackerService } from './deploy-package-tracker.service';
import { CreateDeployPackageTrackerDto } from './dto/create-deploy-package-tracker.dto';
import { UpdateDeployPackageTrackerDto } from './dto/update-deploy-package-tracker.dto';

@Controller('deploy-package-tracker')
export class DeployPackageTrackerController {
  constructor(private readonly deployPackageTrackerService: DeployPackageTrackerService) {}

  @Post()
  create(@Body() createDeployPackageTrackerDto: CreateDeployPackageTrackerDto) {
    return this.deployPackageTrackerService.create(createDeployPackageTrackerDto);
  }

  @Get()
  findAll() {
    return this.deployPackageTrackerService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.deployPackageTrackerService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateDeployPackageTrackerDto: UpdateDeployPackageTrackerDto) {
    return this.deployPackageTrackerService.update(+id, updateDeployPackageTrackerDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.deployPackageTrackerService.remove(+id);
  }
}
