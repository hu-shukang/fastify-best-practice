import { randomUUID } from 'crypto';

const uuid = () => {
  return randomUUID();
};

export const Str = {
  uuid,
};
