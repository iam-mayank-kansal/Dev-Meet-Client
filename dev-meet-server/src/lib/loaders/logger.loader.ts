import { LoggerService } from '@nestjs/common';
import { createLogger, transports, format } from 'winston';

const winstonLogger = createLogger({
  level: 'info',
  format: format.combine(
    format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
    format.printf(({ timestamp, level, message }) => {
      return `[${timestamp}] ${level.toUpperCase()}: ${message}`;
    })
  ),
  transports: [new transports.Console()],
});

export class Logger implements LoggerService {
  log(message: string) {
    winstonLogger.info(message);
  }

  error(message: string, trace?: string) {
    winstonLogger.error(`${message} - ${trace}`);
  }

  warn(message: string) {
    winstonLogger.warn(message);
  }

  debug?(message: string) {
    winstonLogger.debug?.(message);
  }

  verbose?(message: string) {
    winstonLogger.verbose?.(message);
  }
}
