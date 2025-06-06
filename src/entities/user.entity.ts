import { UserQueryInput } from '@/models/user.model';
import {
  Entity,
  Column,
  PrimaryColumn,
  BaseEntity,
  CreateDateColumn,
  DeleteDateColumn,
  UpdateDateColumn,
  IsNull,
  ILike,
} from 'typeorm';

@Entity({ name: 'user_tbl' })
export class UserEntity extends BaseEntity {
  @PrimaryColumn({ type: 'uuid' })
  id: string;

  @Column({ type: 'varchar', length: 100 })
  username: string;

  @Column({ type: 'varchar', length: 255 })
  address: string;

  @Column({ type: 'varchar', length: 100 })
  email: string;

  @Column({ type: 'timestamp with time zone' })
  birthday: Date;

  @CreateDateColumn({ type: 'timestamp with time zone' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp with time zone', nullable: true })
  updatedAt?: Date;

  @DeleteDateColumn({ type: 'timestamp with time zone', nullable: true, select: false })
  deleteAt?: Date;

  static queryList(input: UserQueryInput) {
    return this.find({
      where: {
        deleteAt: IsNull(),
        id: input.id,
        username: input.username ? ILike(`%${input.username}%`) : undefined,
      },
      order: {
        createdAt: 'DESC',
      },
    });
  }
}
