import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Product {
  @PrimaryGeneratedColumn({ type: 'bigint' })
  id: number;

  @Column()
  name: string;

  @Column({ type: 'decimal', precision: 5, scale: 2 })
  price: number;

  @Column({ type: 'tinytext' })
  description: string;
}
