import { ObterServicoPorNome } from "@/domain/usecases";
import { ServicoRepositorySqLite } from "@/infra/repositories";

export class ServicoController {
  static async obterServicoPorNome(params: any, body: any) {
    const repository = new ServicoRepositorySqLite();
    const obterServicoPorNome = new ObterServicoPorNome(repository);
    const retorno = await obterServicoPorNome.execute(params.nome);

    return retorno;
  }
}
