import { HttpException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { CreatePositionDto } from './dto/create-position.dto';
import { UpdatePositionDto } from './dto/update-position.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Position } from './entities/position.entity';
import { Repository } from 'typeorm';

@Injectable()
export class PositionsService {

    constructor(  @InjectRepository(Position)
    private PositionRep:Repository<Position>,){}
  
  async create(createPositionDto: CreatePositionDto) {
    try { 
      const position = this.PositionRep.create(createPositionDto);
      await this.PositionRep.save(position);
      return position;
    } catch (e) {
            throw new HttpException(
              `Error creando employee: ${e.message}`,
              500
            );
    }
    
  }

  async findAll() {
    try {
      return await this.PositionRep.find();
    } catch (e) {
      throw new Error('Error buscando employee: ' + e.message);
    }
  }

  async findOne(id: number) {
    try {
      const position = this.PositionRep.findOneBy({id:id});
      if(!position){
        throw new NotFoundException(`Position con ID ${id} no encontrado`);        
      }
      return position;
    } catch (error) {
      throw new NotFoundException(`Position con ID ${id} no encontrado`);
    }
  }

  async update(id: number, updatePositionDto: UpdatePositionDto) {
    try {
      const position = await this.PositionRep.findOneBy({ id });
      if (!position) {
        throw new NotFoundException(`Position con ID ${id} no encontrado`);
      }

      await this.PositionRep.update(id, updatePositionDto);

      return { message: 'Posición actualizada correctamente' };
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      throw new InternalServerErrorException('Error al actualizar la posición');
    }
  }

  async remove(id: number) {
      try {
        const employee = await this.PositionRep.findOneBy({id});
        if (!employee) {
        throw new NotFoundException(`Positions con ID ${id} no encontrado`);
      }
      await this.PositionRep.remove(employee);
      return { message: 'Empleado eliminado correctamente' };
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      throw new InternalServerErrorException('Error al eliminar el Position');
    }
  }
}
