import pino from 'pino';
import { config } from './config';

const logger = pino({
  level: config.LOG_LEVEL || 'info',
});

import type { Logger } from 'pino';
export default logger as Logger;
