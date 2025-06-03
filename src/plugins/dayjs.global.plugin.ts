import dayjs from 'dayjs';
import timezone from 'dayjs/plugin/timezone';
import utc from 'dayjs/plugin/utc';
import { FastifyPluginAsync } from 'fastify';
import fp from 'fastify-plugin';

const dayjsPlugin: FastifyPluginAsync = fp(async () => {
  dayjs.extend(utc);
  dayjs.extend(timezone);
});

export default dayjsPlugin;
