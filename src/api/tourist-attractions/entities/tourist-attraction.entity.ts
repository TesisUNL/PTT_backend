import { Canton } from '../../cantons/entities/canton.entity';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
} from 'typeorm';

@Entity()
export class TouristAttraction {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ length: 255 })
  name: string;

  @Column({ type: 'st_point' }) // test if it is mapped to POINT type on db an if is useful for us
  coordinates: string;

  @Column({ length: 120, nullable: false })
  short_description: string;

  @Column()
  long_description?: string;

  @Column()
  cover_image: string; // url review possibility of use some free resource to allocate the image if not maybe s3 is a good option

  @Column()
  imageUrl: string[];

  @ManyToOne(() => Canton)
  canton: Canton;

  @CreateDateColumn({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP(6)',
  })
  public created_at: Date;

  @UpdateDateColumn({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP(6)',
    onUpdate: 'CURRENT_TIMESTAMP(6)',
  })
  public updated_at: Date;
}
