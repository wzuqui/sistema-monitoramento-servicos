import express from "express";
import { ExpressAdapter } from "../../adapters/express";
import { ServicoController } from "../../controllers/ServicoController";

const app = express();

app.get("/servicos/:nome", ExpressAdapter.create(ServicoController.obterServicoPorNome));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
