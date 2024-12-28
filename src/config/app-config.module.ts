import { Global, Module } from '@nestjs/common';
import { AppConfigService } from './app-config.service';
import { AppConfigFactory } from './app-config.factory';

@Global() // Makes the module globally available
@Module({
  providers: [AppConfigFactory],
  exports: [AppConfigService], // Export the service for global use
})
export class AppConfigModule {}
