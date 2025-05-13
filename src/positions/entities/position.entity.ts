import { Employee } from "src/employees/entities/employee.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Position {
    @PrimaryGeneratedColumn()
    id :number;

    @Column()
    name :string;

    @Column()
    description : string;

    @Column()
    salary: number;
    
    @Column({
        default:true
    })
    isActive : boolean;

    @OneToMany(()=>Employee,(employee)=>employee.position)
    employees: Employee[];
}
