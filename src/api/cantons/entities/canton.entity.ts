import { Attraction } from '../../attractions/entities/attraction.entity';
import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, OneToMany } from 'typeorm';

@Entity()
export class Canton {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ length: 255, unique: true })
  name: string;

  @Column({ nullable: true })
  description: string;

  // ! generate this on the code with count mysql analize that
  //@Column({ default: 0 })
  //tourist_attractions_count: number;

  // not of all necessary but could be important to scale (by default = loja)
  @Column({ default: 'Loja' })
  province: string;

  // relation with tourist attraction one to many
  @OneToMany(() => Attraction, (attraction) => attraction.canton)
  tourist_attractions?: Attraction[];

  @CreateDateColumn({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP(6)',
  })
  created_at: Date;

  @UpdateDateColumn({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP(6)',
    onUpdate: 'CURRENT_TIMESTAMP(6)',
  })
  updated_at: Date;
}
