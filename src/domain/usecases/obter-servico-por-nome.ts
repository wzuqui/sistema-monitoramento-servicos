import { Servico } from "@/domain/entities";
import { ServicoRepository } from "@/domain/repositories";
import { NaoExisteServicoNomeError } from "@/domain/errors";

export class ObterServicoPorNome {
  private _servicoRepository: ServicoRepository;

  constructor(servicoRepository: ServicoRepository) {
    this._servicoRepository = servicoRepository;
  }

  async execute(nome: string): Promise<Servico> {
    const retorno = await this._servicoRepository.obterPorNome(nome);
    if (!retorno) throw new NaoExisteServicoNomeError(nome);

    return retorno;
  }
}
