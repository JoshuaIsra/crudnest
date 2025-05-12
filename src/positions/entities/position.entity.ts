import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

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
}
