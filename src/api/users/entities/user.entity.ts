import { APP_ROLES } from '../../utils';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  //OneToMany,
} from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  // !NOT NECESSARY ADD ONLY IF WE NEED FOR SOME REASON
  //@Column({ length: 255, unique: true })
  //userName: string;

  @Column({ type: 'enum', enum: APP_ROLES, default: APP_ROLES.USER })
  role: string;

  @Column({ length: 70, nullable: false, unique: true })
  email: string;

  // For record token login from social media
  @Column({ nullable: true })
  authSocialToken?: string;

  // TODO: add password hashing ONLY IF WE USE USERNAME/PASSWORD AUTHENTICATION LOCAL STRATEGY
  @Column({ length: 255 })
  password: string;

  @Column({ default: true })
  isActive: boolean;

  // Possible not necessary but could be the photo of google record
  @Column({ nullable: true })
  imageUrl: string;

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

  /* relation with tourist attraction one to many
  note : add only if we are going to use
  @OneToMany(() => Rating, (Rating) => Rating.user)
  Ratings: Rating[];*/
}
