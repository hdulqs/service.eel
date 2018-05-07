import dotenv from 'dotenv'

// Reads environment variables stored in the '.env' file and writes them to the
//  process.env object
const result = dotenv.config({ path: `${__dirname}/../.env` })

if (result.error) {
  throw result.error
}

const fullConfig = {
  development: {
    mongodbUri: encodeURI(process.env.MONGODB_URI), // NOTE: encodeURI is necessary for passwords with URI reserved characters
    process: {
      logLevel: 'silly',
    },
    blockchain: {
      minConfirmations: 0,
      startingBlockHeight: 0,
      averageBlockTime: 15, // in seconds, this dictates how frequently to run agenda jobs
    },
  },

  staging: {
    mongodbUri: encodeURI(process.env.MONGODB_URI), // NOTE: encodeURI is necessary for passwords with URI reserved characters
    process: {
      logLevel: 'verbose',
    },
    blockchain: {
      // minConfirmations: 5,
      minConfirmations: 1, // NOTE: temporarily changing minConfirmations to 1 for Ethereal demos, change back afterwards
      startingBlockHeight: 2053830,
      averageBlockTime: 15, // in seconds, this dictates how frequently to run agenda jobs
    },
  },

  // TODO: populate when a production environment is set up
  // TODO: logLevel: 'info',
  production: {},
}

process.env.NODE_ENV = process.env.NODE_ENV || 'development'

const envConfig = fullConfig[process.env.NODE_ENV]

envConfig.useSentry = !!process.env.SENTRY_DSN

export default envConfig
