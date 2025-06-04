import { UserQueryInput } from '@/models/user.model';
import {
  Entity,
  Column,
  PrimaryColumn,
  BaseEntity,
  CreateDateColumn,
  DeleteDateColumn,
  UpdateDateColumn,
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
    const builder = this.createQueryBuilder('u').where('u.deleteAt is null');
    if (input.id) {
      builder.andWhere('u.id = :id', { id: input.id });
    }
    if (input.username) {
      builder.andWhere('u.username like :username', { username: `%${input.username}%` });
    }
    return builder.orderBy('u.createdAt', 'DESC').getMany();
  }
}
