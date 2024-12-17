import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { CarrosService } from './carros.service';
import { CreateCarroDto } from './dto/create-carro.dto';
import { UpdateCarroDto } from './dto/update-carro.dto';
import { Roles } from 'src/authorization/roles.decorator';
import { RolesGuard } from 'src/authorization/roles.guard';
import { Role } from 'src/authorization/role.enum';

@Controller('carros')
export class CarrosController {
  constructor(private readonly carrosService: CarrosService) { }

  @Post()
  create(@Body() createCarroDto: CreateCarroDto) {
    return this.carrosService.create(createCarroDto);
  }

  @Get()
  @UseGuards(RolesGuard)
  @Roles(Role.ADMIN, Role.GERENTE)
  // @Roles(Perfis.GERENTE, Perfis.PADRAO, Perfis.ADMIN)
  findAll() {
    return this.carrosService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.carrosService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCarroDto: UpdateCarroDto) {
    return this.carrosService.update(id, updateCarroDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.carrosService.remove(id);
  }
}
