import { TouristService } from '../../tourist-services/entities/tourist-service.entity';
import { Attraction } from '../../attractions/entities/attraction.entity';
import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, OneToMany } from 'typeorm';

@Entity()
export class Canton {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ length: 255, unique: true })
  name: string;

  @Column({ nullable: true, length: 3000 })
  description: string;

  // ! generate this on the code with count mysql analize that
  //@Column({ default: 0 })
  //tourist_attractions_count: number;

  // not of all necessary but could be important to scale (by default = loja)
  @Column({ nullable: true, default: 'Loja' })
  province: string;

  @Column({ nullable: true })
  flag_image: string;

  // Consider use array instand of string to have more videos
  // @Column({ type: 'simple-array', nullable: true })
  // video: string[];
  @Column({ nullable: true })
  presentation_video: string;

  // relation with tourist attraction one to many
  @OneToMany(() => Attraction, (attraction) => attraction.canton)
  tourist_attractions?: Attraction[];

  // relation with tourist service one to many (comment in the first init)
  @OneToMany(() => TouristService, (touristService) => touristService.canton)
  tourist_services?: TouristService[];

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
