import { DataSource, DataSourceOptions } from "typeorm";
import { fromEnv } from "../../utils";
import { join } from "path";

const POSTGRES_HOST: string = fromEnv("POSTGRES_HOST") || "localhost";
const POSTGRES_USER: string = fromEnv("POSTGRES_USER") || "admin";
const POSTGRES_PASSWORD: string = fromEnv("POSTGRES_PASSWORD") || "admin";
const POSTGRES_PORT: number = Number(fromEnv("POSTGRES_PORT"));
const POSTGRES_DB: string = fromEnv("POSTGRES_DB") || "taskmanager";

export const AppDataSourceConfig : DataSourceOptions = {
  type: "postgres",
  host: POSTGRES_HOST,
  database: POSTGRES_DB,
  username: POSTGRES_USER,
  password: POSTGRES_PASSWORD,
  port: POSTGRES_PORT,
  logging: true,
  synchronize: true,
  entities: [join(__dirname, "../../entities/**/*.ts")],
  migrations: [join(__dirname, "../../migrations/**/*.ts")],
}

export const AppDataSource: DataSource = new DataSource(AppDataSourceConfig);
