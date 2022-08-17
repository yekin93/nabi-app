import path from 'path';
import winston, { format } from 'winston';
import  DailyRotateFile from 'winston-daily-rotate-file';
const { combine, timestamp, label, prettyPrint, colorize, printf, errors } = format;

const myFormat = printf((info) => {
  return `${info.level}: ${info.timestamp} ${info.message}: ${info.stack ? info.stack : ''}`;
});

const logPath = path.join('C://', 'nabi-app', 'logging', 'nabi-%DATE%.log');

const transport: DailyRotateFile = new DailyRotateFile({
    filename: logPath,
    datePattern: 'YYYY-MM-DD',
    zippedArchive: true,
    maxSize: '20m',
    maxFiles: '14d'
  });

transport.on('rotate', function(oldFilename, newFilename) {
      // do something fun
    });

const logger = winston.createLogger({
    format: combine(
        errors({stack: true}),
        timestamp(),
        myFormat
      ),
    transports: [
    transport
    ]
});

export default logger;
