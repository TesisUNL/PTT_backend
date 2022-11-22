import { User } from '../../users/entities/user.entity';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  ManyToMany,
  CreateDateColumn,
  UpdateDateColumn,
  JoinTable,
} from 'typeorm';
import { Attraction } from '../../attractions/entities/attraction.entity';

@Entity()
export class TouristRoute {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ length: 255 })
  name: string;

  @Column({ default: true })
  isUserRoute: boolean;

  @Column({ default: 1 })
  views: number; //count views

  // maybe we can think about this is useful or not its reference to length (km or m of the travel)
  @Column({ nullable: true })
  path_length: number;

  @ManyToOne(() => User)
  owner: User;

  // https://orkhan.gitbook.io/typeorm/docs/many-to-many-relations
  @ManyToMany(() => Attraction)
  @JoinTable()
  attractions: Attraction[];

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
