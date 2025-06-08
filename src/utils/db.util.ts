import { DataSource } from 'typeorm';

import { AppDataSource } from '@/data-source';

export let dataSource: DataSource;

export const initDataSource = async () => {
  dataSource = await AppDataSource.initialize();
};

export const destroyDataSource = async () => {
  await dataSource.destroy();
};
