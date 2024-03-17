import { createLogger, transports } from "winston";

export type LogLevel =
  | "error"
  | "warn"
  | "info"
  | "http"
  | "verbose"
  | "debug"
  | "silly";

const logger = createLogger({
  transports: [
    new transports.Console(),
    new transports.File({ filename: 'combined.log' })
  ]
});

export const log = (
  level: LogLevel, message: any) =>
  logger.log({ level: level.toString(), message });