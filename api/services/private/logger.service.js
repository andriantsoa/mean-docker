const winston = require("winston");
const winstonDailyRotateFile = require('winston-daily-rotate-file');
winston.addColors({ debug: 'green', info: 'cyan', silly: 'magenta', warn: 'yellow', error: 'red' });

//define custom log format
const logFormat = winston.format.combine(
  winston.format.colorize({
    all: true
  }),
  winston.format.label({
    label: '[LOGGER]'
  }),
  winston.format.timestamp(),
  winston.format.align(),

  winston.format.printf(
    info => `[${info.level}] ${info.timestamp}: ${info.message}`,
  ),
);

//add file and console loggers to the winston instance
const logger = winston.loggers.add('customLogger', {
  format: logFormat,
  transports: [
    new winstonDailyRotateFile({
      filename: '../logs/%DATE%-server.log',
      datePattern: 'YYYY-MM-DD',
      level: 'info',
    }),
    new winston.transports.Console({
      format: winston.format.combine(winston.format.colorize(), logFormat)
    }),
  ],
});
// --------------------
// const winston = require("winston");
// const { createLogger, format, transports } = require('winston');
// const { combine, timestamp, label, printf } = format;

// const colorizer = winston.format.colorize();

// const logger = winston.createLogger({
//   levels: {
//     error: 0,
//     warn: 1,
//     info: 2,
//     debug: 4
//   },
//   format: combine(
//     winston.format.timestamp(),
//     winston.format.simple(),
//     winston.format.printf(msg =>
//       colorizer.colorize(msg.level, `${msg.timestamp} - ${msg.level}: ${msg.message}`)
//     )
//   ),
//   transports: [
//     new (winston.transports.Console)({
//       // format: winston.format.combine(winston.format.colorize(), alignColorsAndTime),
//       prettyPrint: true,
//       colorize: true,
//       timestamp: true,

//     }),
//   ],
// });

module.exports = logger;

/**
 *
 * Style 0:
 *
 const winston = require('winston');
 const logger = winston.createLogger({
  transports: [
    new winston.transports.Console()
  ]
});
---------------------------------------------------------
 * Style 1:
 *
 *
 * -----------------------------------------
 *
 * Style 2:
let date = new Date().toISOString();
const logFormat = winston.format.printf(function (info) {
  return `${date}-${info.level}: ${JSON.stringify(info.message, null, 4)}\n`;
});
const logger = winston.createLogger({
  transports: [
    new winston.transports.Console({
      level: 'info',
      format: winston.format.combine(winston.format.colorize(), logFormat)
    })
  ]
});
 *
 *
 *
 * --------------------------------
 *
 * style 3:
const { createLogger, format, transports } = require('winston');
const { combine, timestamp, label, prettyPrint } = format;

const logger = createLogger({
  format: combine(
    label({ label: 'ASAKO' }),
    timestamp(),
    prettyPrint()
  ),
  transports: [
    new transports.Console(),
  ]
});
 *
 *
 * ---------------------------------------
 * style 4
const winston = require("winston");
const winstonDailyRotateFile = require('winston-daily-rotate-file');
//define custom log format
const logFormat = winston.format.combine(
  winston.format.colorize(),
  winston.format.timestamp(),
  winston.format.align(),
  winston.format.printf(
    info => `${info.timestamp} ${info.level}: ${info.message}`,
  ),
);

//add file and console loggers to the winston instance
const logger = winston.loggers.add('customLogger', {
  format: logFormat,
  transports: [
    new winstonDailyRotateFile({
      filename: '../logs/%DATE%-server.log',
      datePattern: 'YYYY-MM-DD',
      level: 'info',
    }),
    new winston.transports.Console({
      level: 'info',
      format: winston.format.combine(winston.format.colorize(), logFormat)
    }),
  ],
});
*
*
------------------------------
const winston = require("winston");
const { createLogger, format, transports } = require('winston');
const { combine, timestamp, label, printf } = format;

const colorizer = winston.format.colorize();

const logger = winston.createLogger({
    levels: {
        error: 0,
        warn: 1,
        info: 2,
        debug: 4
    },
    format: combine(
        winston.format.timestamp(),
        winston.format.simple(),
        winston.format.printf(msg =>
            colorizer.colorize(msg.level, `${msg.timestamp} - ${msg.level}: ${msg.message}`)
        )
),
    transports: [
        new (winston.transports.Console)({
            // format: winston.format.combine(winston.format.colorize(), alignColorsAndTime),
            prettyPrint: true,
            colorize: true,
            timestamp: true,

        }),
    ],
});
 */

