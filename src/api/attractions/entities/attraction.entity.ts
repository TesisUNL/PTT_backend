import { Canton } from '../../cantons/entities/canton.entity';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  OneToMany,
} from 'typeorm';
import { Rating } from '../../ratings/entities/rating.entity';

@Entity()
export class Attraction {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ length: 255 })
  name: string;

  @Column({ nullable: true })
  latitude: number;

  @Column({ nullable: true })
  longitude: number;

  @Column({ length: 120 })
  short_description: string;

  @Column({ nullable: true })
  long_description: string;

  // url review possibility of use some free resource to allocate the image if not maybe s3 is a good option
  @Column({ nullable: true })
  cover_image: string;

  @Column({ type: 'simple-array', nullable: true })
  images: string[];

  @ManyToOne(() => Canton)
  canton: Canton;

  @OneToMany(() => Rating, (rating) => rating.attraction)
  ratings: Rating[];

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
