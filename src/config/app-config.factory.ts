import { AppConfigService } from './app-config.service';

export const AppConfigFactory = {
  provide: AppConfigService,
  useFactory: (): AppConfigService => {
    return new AppConfigService(); // Instantiate the service
  },
};
