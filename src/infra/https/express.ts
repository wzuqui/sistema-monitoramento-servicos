import { ExpressAdapter } from "@/adapters";
import { ServicoController } from "@/controllers";
import express from "express";

const app = express();

app.get("/servicos/:nome", ExpressAdapter.create(ServicoController.obterServicoPorNome));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
