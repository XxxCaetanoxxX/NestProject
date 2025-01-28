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
  Request,
  UseInterceptors
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
import { AuthenticatedRequest } from 'src/auth/authenticated-request';
import { CreationInterceptor } from 'src/interceptors/creation.interceptor';
import { UpdateInterceptor } from 'src/interceptors/update.interceptor';

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
  @UseInterceptors(CreationInterceptor)
  create(@Body() createCarDto: CreateCarDto,
    @Request() req: AuthenticatedRequest) {
    createCarDto.creationDate = req['creationDate'];
    createCarDto.updateDate = req['creationDate'];
    return this.carsService.create(createCarDto, req.user['userId']);
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
  @UseInterceptors(UpdateInterceptor)
  @Roles(Role.MANAGER, Role.ADMIN)
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateCarDto: UpdateCarDto,
    @Request() req: AuthenticatedRequest
  ) {
    updateCarDto.updatedById = req.user['userId'];
    updateCarDto.updateDate = req['updateDate'];
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
