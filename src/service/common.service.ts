import { FastifyBaseLogger } from 'fastify';

export abstract class CommonService {
  constructor(protected logger: FastifyBaseLogger) {}
}
