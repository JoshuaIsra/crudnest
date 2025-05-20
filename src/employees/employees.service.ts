import { HttpException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { CreateEmployeeDto } from './dto/create-employee.dto';
import { UpdateEmployeeDto } from './dto/update-employee.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Employee } from './entities/employee.entity';
import { Repository } from 'typeorm';

@Injectable()
export class EmployeesService {
  constructor(  @InjectRepository(Employee)
  private employeeRepository:Repository<Employee>,){}
  
  
  async create(createEmployeeDto: CreateEmployeeDto) {
    try {
      const employee = this.employeeRepository.create(createEmployeeDto);
      await this.employeeRepository.save(employee);
      return employee;
    } catch (e) {
      throw new HttpException(
        `Error creando employee: ${e.message}`,
        500
      );
    }
  }

  async findAll() {
    try {
      return await this.employeeRepository.find({ where: { status: true } });
    } catch (e) {
      throw new Error('Error buscando employee: ' + e.message);
    }
  }

  async findOne(id: number) {
    try {
      const employee = await this.employeeRepository.findOneBy({id:id,});
      if(!employee){
        throw new NotFoundException(`Employee con ID ${id} no encontrado`);
      }
      return employee;  
    } catch (e) {
      throw new NotFoundException(`Employee con ID ${id} no encontrado`);
    }
    
  }

  async update(id: number, UpdateEmployeeDto: UpdateEmployeeDto) {
   try{
      const employee = await this.employeeRepository.findOneBy({id});
      if(!employee){
        throw new NotFoundException(`employee con ID ${id} no encontrado`);
      }
   }catch(error){
    if(error instanceof NotFoundException){
      throw error;
    }
    throw +new InternalServerErrorException('Error al actualizar el Empleado');
   }
  }



  
  async remove(id: number) {
    try {
      const employee = await this.employeeRepository.findOneBy({id});
      if (!employee) {
        throw new NotFoundException(`Employee con ID ${id} no encontrado`);
      }
      await this.employeeRepository.update(id, { status: false });
      return { message: 'Empleado eliminado correctamente' };
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      throw new InternalServerErrorException('Error al eliminar el Empleado');
    }
  }

  async search(busqueda: string) {
    try {
      const employees = await this.employeeRepository
        .createQueryBuilder('employee')
        .where('employee.name LIKE :name', { name: `%${busqueda}%` })
        .orWhere('employee.lastName LIKE :lastName', { lastName: `%${busqueda}%` })
        .getMany();
      return employees;
    } catch (error) {
      throw new InternalServerErrorException('Error al buscar el empleado');
    }
  }

  async activar(id:number){
    try{
      const emp = await this.employeeRepository.findOneBy({id});
      const empAct= await this.employeeRepository.preload({
        id,
        status :!emp?.status
      });
      if(!empAct){
        throw new NotFoundException(`Empleado con ID ${id} no encontrado`);
      }
      await this.employeeRepository.save(empAct);
      return empAct;
    }
    catch(error){
      if(error instanceof NotFoundException){
        throw error;
      }
      throw new InternalServerErrorException('Error al activar el empleado');
    }
  }
}

