import { database } from "./infra/database/database";

(async () => {
  const db = await database();
  db.get("SELECT * FROM servicos").then(console.log);
  db.get("SELECT * FROM ouvintes").then(console.log);
  db.get("SELECT * FROM conexoes").then(console.log);
})();
