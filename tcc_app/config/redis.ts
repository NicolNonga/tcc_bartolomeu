import env from '#start/env'
import { defineConfig } from '@adonisjs/redis'

const redisConfig = defineConfig({
  connection: 'main',
  connections: {
    main: {
      host: env.get('REDIS_HOST'),
      port: env.get('REDIS_PORT'),
      password: env.get('REDIS_PASSWORD', ''),
      db: 0,
      keyPrefix: env.get('REDIS_KEY_PREFIX'),
      maxRetriesPerRequest: 3,
      retryDelayOnFailover: 100,
      retryDelayOnCluster: 100,
      lazyConnect: true,
    },
    // Separate connection for queues (better isolation)
    queue: {
      host: env.get('QUEUE_REDIS_HOST', env.get('REDIS_HOST')!),
      port: env.get('QUEUE_REDIS_PORT', env.get('REDIS_PORT')!),
      password: env.get('QUEUE_REDIS_PASSWORD', env.get('REDIS_PASSWORD', '')),
      db: 0,
      retryDelayOnFailover: 100,
      maxRetriesPerRequest: 3,
      lazyConnect: true,
    },
  },
})

export default redisConfig
