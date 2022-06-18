import { HapiAdapter } from "@/adapters";
import { ServicoController } from "@/controllers";
import hapi from "@hapi/hapi";

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
