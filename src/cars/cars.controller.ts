import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Query,
  ParseIntPipe,
} from '@nestjs/common';
import { CarsService } from './cars.service';
import { CreateCarDto } from './dto/create-car.dto';
import { UpdateCarDto } from './dto/update-car.dto';
import { Roles } from 'src/authorization/roles.decorator';
import { RolesGuard } from 'src/authorization/roles.guard';
import { Role } from 'src/authorization/role.enum';
import { FindAllCarsDto } from './dto/find-all-cars.dto';
import { ApiBearerAuth, ApiOkResponse, ApiParam } from '@nestjs/swagger';
import { ResponseCarDto } from './dto/response-car.dto';
import { ResponseDeleteCarDto } from './dto/response-delete-car.dto';
import { UpdateManyCarsDto } from './dto/update-many-cars.dto';

@ApiBearerAuth()
@Controller('cars')
export class CarsController {
  constructor(private readonly carsService: CarsService) {}

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
  @ApiParam({ name: 'id', type: Number })
  @ApiOkResponse({
    description: 'Returns the details of a car.',
    type: ResponseCarDto,
  })
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.carsService.findOne(id);
  }

  @Patch(':id')
  @ApiParam({ name: 'id', type: Number })
  @ApiOkResponse({
    description: 'Returns the details of a updated car.',
    type: ResponseCarDto,
  })
  @UseGuards(RolesGuard)
  @Roles(Role.MANAGER, Role.ADMIN)
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateCarDto: UpdateCarDto,
  ) {
    return this.carsService.update(id, updateCarDto);
  }

  @Patch('/update/many')
  @ApiOkResponse({
    description: 'update many cars',
    schema: {
      type: 'object',
      properties: {
        count: { type: 'number' },
      },
    },
  })
  @UseGuards(RolesGuard)
  @Roles(Role.MANAGER, Role.ADMIN)
  updateMany(@Body() updateManyCarsDto: UpdateManyCarsDto) {
    return this.carsService.updateMany(updateManyCarsDto);
  }

  @Delete(':id')
  @ApiOkResponse({
    description: 'Delete a car',
    type: ResponseDeleteCarDto,
  })
  @ApiParam({ name: 'id', type: Number })
  @UseGuards(RolesGuard)
  @Roles(Role.MANAGER, Role.ADMIN)
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.carsService.remove(id);
  }
}
