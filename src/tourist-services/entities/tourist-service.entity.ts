import { Canton } from '../../api/cantons/entities/canton.entity';
import { AttractionServicesTypes, ColumnNumericTransformer } from '../../api/utils';
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, CreateDateColumn, UpdateDateColumn } from 'typeorm';

@Entity()
export class TouristService {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ length: 255 })
  name: string;

  @Column({ type: 'boolean', default: true })
  is_certified: boolean;

  @ManyToOne(() => Canton)
  canton: Canton;

  @Column({ type: 'enum', enum: AttractionServicesTypes, default: AttractionServicesTypes.OTHER })
  type: string;

  @Column({ nullable: true, type: 'decimal', precision: 18, scale: 15, transformer: new ColumnNumericTransformer() })
  latitude: number;

  @Column({ nullable: true, type: 'decimal', precision: 18, scale: 15, transformer: new ColumnNumericTransformer() })
  longitude: number;

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
