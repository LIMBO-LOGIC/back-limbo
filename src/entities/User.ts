import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column({ length: 100 })
  fullname!: string;

  @Column({ unique: true, length: 50 })
  nickname!: string;

  @Column({ unique: true, length: 100 })
  email!: string;

  @Column({ length: 255 })
  password!: string;

  @Column('date')
  birthdate!: Date;

  @Column('boolean')
  active!: boolean;

  @Column('bigint')
  all_points!: number;

  @Column('bigint')
  current_points!: number;

  @CreateDateColumn()
  created_at!: Date;

  @UpdateDateColumn()
  updated_at!: Date;
}
