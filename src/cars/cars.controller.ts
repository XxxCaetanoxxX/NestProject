import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Query } from '@nestjs/common';
import { CarsService } from './cars.service';
import { CreateCarroDto } from './dto/create-carro.dto';
import { UpdateCarroDto } from './dto/update-carro.dto';
import { Roles } from 'src/authorization/roles.decorator';
import { RolesGuard } from 'src/authorization/roles.guard';
import { Role } from 'src/authorization/role.enum';
import { FindAllCarsDto } from './dto/find-all-cars.dto';

@Controller('cars')
export class CarsController {
  constructor(private readonly carsService: CarsService) { }

  @Post()
  @UseGuards(RolesGuard)
  @Roles(Role.MANAGER, Role.ADMIN)
  create(@Body() createCarroDto: CreateCarroDto) {
    return this.carsService.create(createCarroDto);
  }

  @Get()
  findAll(@Query() findAllCarsDto?: FindAllCarsDto) {
    return this.carsService.findAll(findAllCarsDto);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.carsService.findOne(id);
  }

  @Patch(':id')
  @UseGuards(RolesGuard)
  @Roles(Role.MANAGER, Role.ADMIN)
  update(@Param('id') id: string, @Body() updateCarroDto: UpdateCarroDto) {
    return this.carsService.update(id, updateCarroDto);
  }

  @Delete(':id')
  @UseGuards(RolesGuard)
  @Roles(Role.MANAGER, Role.ADMIN)
  remove(@Param('id') id: string) {
    return this.carsService.remove(id);
  }
}
