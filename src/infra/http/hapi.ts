import hapi from "@hapi/hapi";
import { HapiAdapter } from "../../adapter/HapiAdapter";
import { ServicoController } from "../../controller/ServicoController";

const server = hapi.server({
  port: process.env.PORT || 3000,
  host: process.env.HOST || "localhost",
});

server.route({
  method: "GET",
  path: "/servicos/{nome}",
  handler: HapiAdapter.create(ServicoController.obterServicoPorNome),
});

server.start().then(() => {
  console.log("Server running on %s", server.info.uri);
});