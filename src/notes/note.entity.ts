import {BaseEntity, Column, Entity, PrimaryGeneratedColumn, Table} from 'typeorm';
import { IsString, Max, MaxLength, Min, MinLength } from 'class-validator';

@Entity({
  name: 'test'
})
export class Note extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 150 })
  @MinLength(1)
  @MaxLength(150)
  @IsString()
  title: string;

  @Column()
  @MinLength(1)
  @IsString()
  description: string;

  @Column()
  startDate: Date;

  @Column()
  endDate: Date;
}
