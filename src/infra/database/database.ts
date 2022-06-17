import sqlite3 from "sqlite3";
import { open, Database } from "sqlite";

export const database = async function ({ memory = false } = {}) {
  const db = await open({
    filename: memory ? ":memory:" : "database.sqlite",
    driver: sqlite3.Database,
  });
  await db.migrate({
    migrationsPath: "migrations",
  });
  return db;
};
