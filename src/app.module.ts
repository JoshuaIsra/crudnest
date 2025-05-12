import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { EmployeesModule } from './employees/employees.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PositionsModule } from './positions/positions.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
    type: 'postgres', // Cambia a 'postgres' si usas PostgreSQL
    host: 'localhost',
    port: 5432, // Cambia a 5432 si usas PostgreSQL
    username: 'postgres',
    password: '191103',
    database: 'employeesbd',
    autoLoadEntities: true,
    synchronize: true,
  }),EmployeesModule, PositionsModule],
  controllers: [AppController],
  providers: [AppService],
})

export class AppModule {

}
