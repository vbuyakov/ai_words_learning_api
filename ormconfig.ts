import { config } from 'dotenv';
import { SnakeNamingStrategy } from './src/snake-naming.strategy';
import { DataSource } from 'typeorm';

if (!(<any>module).hot /* for webpack HMR */) {
  process.env.NODE_ENV = process.env.NODE_ENV || 'development';
}

config({
  path: `${process.env.NODE_ENV}.env`,
});

// Replace \\n with \n to support multiline strings in AWS
for (const envName of Object.keys(process.env)) {
  process.env[envName] = process.env[envName].replace(/\\n/g, '\n');
}

const datasource = new DataSource({
  type: 'postgres',
  host: process.env.DATABASE_HOST || 'localhost',
  port: parseInt(process.env.DATABASE_PORT, 10) || 5432,
  username: process.env.DATABASE_USERNAME || 'postgres',
  password: process.env.DATABASE_PASSWORD || 'password',
  database: process.env.DATABASE_NAME || 'french_learning_placeholders',
  namingStrategy: new SnakeNamingStrategy(),
  entities: ['src/**/*.entity{.ts,.js}'],
  migrations: ['database/migrations/*{.ts,.js}'],
});

datasource.initialize();
export default datasource;
