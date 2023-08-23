const winston = require('winston');
require('winston-daily-rotate-file');
const moment = require('moment');

// Utiliza una ubicación que sea permitida para escritura en Vercel (p. ej. /tmp)
const logsDirectory = '/tmp';

const transportApi = new (winston.transports.DailyRotateFile)({
  filename: `${logsDirectory}/${process.env.APP}-%DATE%.log`,
  datePattern: 'YYYY-MM-DD',
  zippedArchive: true,
  maxSize: '10m',
  maxFiles: '15d',
});
const appendTimestamp = winston.format(
  (info) => Object.assign(info, { timestamp: moment().format() }),
);

module.exports = {
  api: winston.createLogger(
    {
      level: process.env.LOG_LEVEL,
      format: winston.format.combine(
        winston.format.splat(),
        winston.format.metadata(),
        appendTimestamp(),
        winston.format.errors({ stack: true }),
        winston.format.json(),
      ),
      transports: [
        transportApi,
        new winston.transports.Console(),
      ],
    },
  ),
};
