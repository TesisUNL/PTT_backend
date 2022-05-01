import { TouristAttraction } from '../../tourist-attractions/entities/tourist-attraction.entity';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
} from 'typeorm';

@Entity()
export class Canton {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ length: 255 })
  name: string;

  @Column()
  tourist_attractions_count: number;

  // relation with tourist attraction one to many
  @OneToMany(
    () => TouristAttraction,
    (touristAttraction) => touristAttraction.canton,
  )
  tourist_attractions: TouristAttraction[];
}
