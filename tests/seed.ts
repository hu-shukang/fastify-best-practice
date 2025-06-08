import { AppDataSource } from '@/data-source';
import { UserEntity } from '@/entities/user.entity';

export const user1Id = '123e4567-e89b-12d3-a456-426614174000'; // Example UUID for user1
export const user2Id = '123e4567-e89b-12d3-a456-426614174001'; // Example UUID for user2
export const user3Id = '123e4567-e89b-12d3-a456-426614174002'; // Example UUID for user3

export const seed = async () => {
  AppDataSource.setOptions({
    host: process.env.DB_HOST,
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
  });
  const dataSource = await AppDataSource.initialize();
  const user1 = UserEntity.create({
    id: user1Id,
    username: 'user1',
    email: 'user1@sample.com',
    address: '123 Main St',
    birthday: new Date('1990-01-01T00:00:00Z').toISOString(),
  });

  const user2 = UserEntity.create({
    id: user2Id,
    username: 'user2',
    email: 'user2@sample.com',
    address: '456 Elm St',
    birthday: new Date('1992-02-02T00:00:00Z').toISOString(),
  });
  const user3 = UserEntity.create({
    id: user3Id,
    username: 'user3',
    email: 'user3@sample.com',
    address: '789 Oak St',
    birthday: new Date('1994-03-03T00:00:00Z').toISOString(),
  });
  await UserEntity.save([user1, user2, user3]);
  await dataSource.destroy();
};
