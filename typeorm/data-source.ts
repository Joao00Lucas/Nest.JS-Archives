import * as dotenv from 'dotenv';
import { DataSource } from "typeorm";
import { join} from 'path';

dotenv.config();

const dataSource = new DataSource({
    type: 'mysql',
      host: process.env.DB_HOST,
      port: Number(process.env.DB_PORT),
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_DATABASE,
      entities: ['src/**/entity/*.ts'],
      migrations: [join(__dirname, '/migration/**/*.ts')],
});

export default dataSource;