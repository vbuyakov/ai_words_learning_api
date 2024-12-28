import { Injectable } from '@nestjs/common';
import { config } from 'dotenv';
import { join } from 'path';

@Injectable()
export class AppConfigService {
  private readonly env: { [key: string]: string | undefined };

  constructor() {
    const nodeEnv = process.env.NODE_ENV || 'development';
    const envFilePath = join(__dirname, `../../${nodeEnv}.env`);
    config({ path: envFilePath });

    console.log(`Loaded environment file: ${envFilePath}`); // Debugging

    this.env = process.env;
  }

  get(key: string, defaultValue?: string): string {
    const value = this.env[key];
    if (value === undefined && defaultValue === undefined) {
      throw new Error(`Environment variable ${key} is not defined`);
    }
    return value ?? defaultValue;
  }

  getNumber(key: string): number {
    const value = this.get(key);
    const parsedValue = parseInt(value, 10);
    if (isNaN(parsedValue)) {
      throw new Error(`Environment variable ${key} is not a valid number`);
    }
    return parsedValue;
  }
}
