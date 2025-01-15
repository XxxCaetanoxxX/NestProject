import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Query } from '@nestjs/common';
import { CarsService } from './cars.service';
import { CreateCarDto } from './dto/create-car.dto';
import { UpdateCarDto } from './dto/update-car.dto';
import { Roles } from 'src/authorization/roles.decorator';
import { RolesGuard } from 'src/authorization/roles.guard';
import { Role } from 'src/authorization/role.enum';
import { FindAllCarsDto } from './dto/find-all-cars.dto';
import { ApiBearerAuth, ApiBody, ApiOkResponse, ApiQuery } from '@nestjs/swagger';
import { ResponseCarDto } from './dto/response-car.dto';
import { ResponseDeleteCarDto } from './dto/response-delete-car.dto';

@ApiBearerAuth()
@Controller('cars')
export class CarsController {
  constructor(private readonly carsService: CarsService) { }

  @Post()
  @ApiOkResponse({
    description: 'Create a car.',
    type: ResponseCarDto,
  })
  @UseGuards(RolesGuard)
  @Roles(Role.MANAGER, Role.ADMIN)
  create(@Body() createCarDto: CreateCarDto) {
    return this.carsService.create(createCarDto);
  }

  @Get()
  @ApiOkResponse({
    description: 'List all cars',
    type: [ResponseCarDto],
  })
  findAll(@Query() findAllCarsDto?: FindAllCarsDto) {
    return this.carsService.findAll(findAllCarsDto);
  }

  @Get(':id')
  @ApiOkResponse({
    description: 'Returns the details of a car.',
    type: ResponseCarDto,
  })
  findOne(@Param('id') id: number) {
    return this.carsService.findOne(id);
  }

  //como passo o api property se ele extends a create?
  @Patch(':id')
  @ApiOkResponse({
    description: 'Returns the details of a updated car.',
    type: ResponseCarDto,
  })
  @UseGuards(RolesGuard)
  @Roles(Role.MANAGER, Role.ADMIN)
  update(@Param('id') id: number, @Body() updateCarDto: UpdateCarDto) {
    return this.carsService.update(id, updateCarDto);
  }

  @Delete(':id')
  @ApiOkResponse({
    description: 'Delete a car',
    type: ResponseDeleteCarDto,
  })
  @UseGuards(RolesGuard)
  @Roles(Role.MANAGER, Role.ADMIN)
  remove(@Param('id') id: number) {
    return this.carsService.remove(id);
  }
}
