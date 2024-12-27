import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Query } from '@nestjs/common';
import { CarrosService } from './carros.service';
import { CreateCarroDto } from './dto/create-carro.dto';
import { UpdateCarroDto } from './dto/update-carro.dto';
import { Roles } from 'src/authorization/roles.decorator';
import { RolesGuard } from 'src/authorization/roles.guard';
import { Role } from 'src/authorization/role.enum';
import { FindAlLCarsDto } from './dto/find-all-cars.dto';

@Controller('carros')
export class CarrosController {
  constructor(private readonly carrosService: CarrosService) { }

  @Post()
  @UseGuards(RolesGuard)
  @Roles(Role.GERENTE, Role.ADMIN)
  create(@Body() createCarroDto: CreateCarroDto) {
    return this.carrosService.create(createCarroDto);
  }

  @Get()
  findAll(@Query() findAllCarsDto : FindAlLCarsDto) {
    return this.carrosService.findAll(findAllCarsDto);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.carrosService.findOne(id);
  }

  @Patch(':id')
  @UseGuards(RolesGuard)
  @Roles(Role.GERENTE, Role.ADMIN)
  update(@Param('id') id: string, @Body() updateCarroDto: UpdateCarroDto) {
    return this.carrosService.update(id, updateCarroDto);
  }

  @Delete(':id')
  @UseGuards(RolesGuard)
  @Roles(Role.GERENTE, Role.ADMIN)
  remove(@Param('id') id: string) {
    return this.carrosService.remove(id);
  }
}
