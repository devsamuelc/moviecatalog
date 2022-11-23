import { DataSource } from "typeorm";

export const databaseProviders = [
    {
      provide: 'DATA_SOURCE',
      useFactory: async () => {
        const dataSource = new DataSource({
            type: 'postgres',
            database: process.env.DB_DATABASE,
            username: process.env.DB_USERNAME,
            password: process.env.DB_PASSWORD,
            port: Number(process.env.DB_PORT),
            host: process.env.DB_HOST,
            synchronize: true,
            entities: ['dist/**/entities/*.entity.js'],
        });

        return dataSource.initialize();
      },
    },
  ];