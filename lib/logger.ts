import pino from 'pino'

// Configuration du logger
const level = process.env.LOG_LEVEL || 'info'

export const logger = pino({
  level,
  transport: {
    target: 'pino-pretty',
    options: {
      colorize: true,
      translateTime: 'SYS:standard',
      ignore: 'pid,hostname',
    },
  },
})

export function logInfo(message: string, data?: any) {
  logger.info(data || {}, message)
}

export function logError(message: string, error?: any) {
  logger.error(error || {}, message)
}

export function logWarn(message: string, data?: any) {
  logger.warn(data || {}, message)
}

export function logDebug(message: string, data?: any) {
  logger.debug(data || {}, message)
}
