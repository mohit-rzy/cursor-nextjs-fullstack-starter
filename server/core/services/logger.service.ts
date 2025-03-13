import winston from 'winston';
import { getContext } from '../utils/hooks';
import { getRequestId } from '../utils/hooks';

// Define log levels
const levels = {
  error: 0,
  warn: 1,
  info: 2,
  http: 3,
  debug: 4,
};

// Define level based on environment
const level = () => {
  const logLevel = process.env.LOG_LEVEL || 'info';

  // Ensure the provided log level is valid
  return Object.keys(levels).includes(logLevel) ? logLevel : 'info';
};

// Define colors for each level
const colors = {
  error: 'red',
  warn: 'yellow',
  info: 'green',
  http: 'magenta',
  debug: 'white',
};

// Tell winston about our colors
winston.addColors(colors);

// Custom format to handle errors properly
const errorFormat = winston.format((info) => {
  if (info.message instanceof Error) {
    // If the message is an error object
    const error = info.message;
    info.message = error.message;
    info.stack = error.stack;
    info.name = error.name;
  } else if (info instanceof Error) {
    // If the info itself is an error object
    const error = info;
    info = {
      message: error.message,
      stack: error.stack,
      name: error.name,
      level: 'error',
      [Symbol.for('level')]: 'error',
    };
  } else if (typeof info.message === 'object') {
    // If the message is an object (but not an Error)
    info.message = JSON.stringify(info.message, null, 2);
  }
  return info;
});

// Create a format for request context
const requestContextFormat = winston.format((info) => {
  try {
    const ctx = getContext();
    const requestId = getRequestId();
    info.requestId = requestId;
    info.method = ctx.req?.method;
    info.path = ctx.req?.url;
    info.ip = ctx.req?.headers.get('x-forwarded-for');

    // Add user agent
    info.userAgent = ctx.req?.headers.get('user-agent');
  } catch {
    // Handle the case where the request context is not available
    info.message = `[server] ${info.message}`;
  }
  return info;
});

// Update the format to include request context
const format = winston.format.combine(
  errorFormat(),
  requestContextFormat(),
  winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss:ms' }),
  winston.format.errors({ stack: true }),
  // winston.format.colorize({ all: true }),
  process.env.NODE_ENV == 'production'
    ? winston.format.json()
    : winston.format.printf((info) => {
        // Build the base log message
        let base = `${info.timestamp} `;

        // Add request context if available
        if (info.requestId) {
          base += `[${info.requestId}] `;
        }
        if (info.method && info.path) {
          base += `${info.method} ${info.path} `;
        }
        if (info.ip) {
          base += `(${info.ip}) `;
        }

        base += `${info.level}: ${info.message}`;

        // Add query parameters if they exist
        const query = info.query ? ` Query: ${JSON.stringify(info.query)}` : '';

        // Add user agent if it exists
        const userAgent = info.userAgent
          ? ` User-Agent: ${info.userAgent}`
          : '';

        // Add error information if it exists
        const errorName = info.name ? ` Error: ${info.name}` : '';
        const stack = info.stack ? ` Stack: ${info.stack}` : '';

        return `${base}${query}${userAgent}${errorName}${stack}`;
      })
);

// Define which transports we want to use
const transports = [
  // Console transport for all logs
  new winston.transports.Console(),

  // Rotate file transport for error logs
  // new DailyRotateFile({
  //   filename: path.join('logs', 'error-%DATE%.log'),
  //   datePattern: 'YYYY-MM-DD',
  //   zippedArchive: true,
  //   maxSize: '20m',
  //   maxFiles: '14d',
  //   level: 'error',
  // }),

  // // Rotate file transport for all logs
  // new DailyRotateFile({
  //   filename: path.join('logs', 'combined-%DATE%.log'),
  //   datePattern: 'YYYY-MM-DD',
  //   zippedArchive: true,
  //   maxSize: '20m',
  //   maxFiles: '14d',
  // }),
];

// Create the logger
const logger = winston.createLogger({
  level: level(),
  levels,
  format,
  transports,
});

// Create a stream object for Trpc logging
const stream = {
  write: (message: string) => {
    try {
      const requestId = getRequestId();
      const ctx = getContext();
      logger.http({
        message: message.trim(),
        requestId,
        method: ctx.req?.method,
        path: ctx.req?.url,
        ip: ctx.req?.headers.get('x-forwarded-for'),
        userAgent: ctx.req?.headers.get('user-agent'),
      });
    } catch {
      logger.http(message.trim());
    }
  },
};

export { logger, stream };
