import sqlite3 from "sqlite3";
import { open } from "sqlite";

export const database = (async () => {
  const db = await open({
    filename: "database.sqlite",
    driver: sqlite3.Database,
  });
  await db.migrate({
    migrationsPath: "migrations",
  });
  return db;
})();
