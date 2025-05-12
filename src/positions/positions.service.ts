import { HttpException, Injectable } from '@nestjs/common';
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

  findOne(id: number) {
    return `This action returns a #${id} position`;
  }

  update(id: number, updatePositionDto: UpdatePositionDto) {
    return `This action updates a #${id} position`;
  }

  remove(id: number) {
    return `This action removes a #${id} position`;
  }
}
