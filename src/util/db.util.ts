import { AppDataSource } from '@/data-source';
import { DataSource } from 'typeorm';

export let dataSource: DataSource;

export const initDataSource = async () => {
  dataSource = await AppDataSource.initialize();
};

export const destroyDataSource = async () => {
  await dataSource.destroy();
};
