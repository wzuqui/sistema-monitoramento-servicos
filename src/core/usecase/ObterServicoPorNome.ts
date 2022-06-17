import { Servico } from "../entity/Servico";
import { ServicoRepository } from "../repository/ServicoRepository";
import { NaoExisteServicoNomeError } from "./errors/NaoExisteServicoNomeError";

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
