import { Module } from '@nestjs/common'
import { EnvModule } from '../env/env.module'
import { CacheRepos } from './cache-repos'
import { RedisCacheRepos } from './redis/redis-cache-repos'
import { RedisService } from './redis/redis.service'

@Module({
  imports: [EnvModule],
  providers: [
    RedisService,
    {
      provide: CacheRepos,
      useClass: RedisCacheRepos,
    },
  ],
  exports: [CacheRepos],
})
export class CacheModule {}
