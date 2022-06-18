import { Servico } from "@/domain/entities";
import { NaoExisteServicoIpPortaError } from "@/domain/errors";
import { ServicoRepository } from "@/domain/repositories";

export class ObterServicoPorIpPorta {
  private _servicoRepository: ServicoRepository;

  constructor(servicoRepository: ServicoRepository) {
    this._servicoRepository = servicoRepository;
  }

  async execute(ip: string, porta: number): Promise<Servico> {
    const retorno = await this._servicoRepository.obterPorIpPorta(ip, porta);
    if (!retorno) throw new NaoExisteServicoIpPortaError(ip, porta);

    return retorno;
  }
}
