import { Position } from "src/positions/entities/position.entity";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Employee {
    @PrimaryGeneratedColumn()
    id :number;
    
    @Column()
    name :string;

    @Column()
    lastName : string;

    @Column({
        unique:true
    })
    email: string;


    @Column({
        default: true,
    })
    status : boolean;   
    
    @ManyToOne(()=>Position,(positions)=>positions.employees, {eager:true})
    position :Position;
    
}
