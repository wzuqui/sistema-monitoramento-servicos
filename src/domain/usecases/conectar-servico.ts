import { ServicoRepository } from "@/domain/repositories";
import {
  NaoExisteServicoIpPortaError,
  NaoExisteServicoNomeError,
  ServicoNaoEstaOuvindoIpPortaError,
} from "@/domain/errors";

export class ConectarServico {
  private _repository: ServicoRepository;

  constructor(repository: ServicoRepository) {
    this._repository = repository;
  }

  async execute(origem_nome: string, ip: string, porta: number) {
    const origem = await this._repository.obterPorNome(origem_nome);
    if (!origem) throw new NaoExisteServicoNomeError(origem_nome);

    const destino = await this._repository.obterPorIpPorta(ip, porta);
    if (!destino) throw new NaoExisteServicoIpPortaError(ip, porta);

    if (!destino.estaOuvindo(ip, porta)) throw new ServicoNaoEstaOuvindoIpPortaError(destino.nome, ip, porta);

    const retorno = { origem: origem.nome, destino: destino.nome, ip, porta };
    await this._repository.salvarConexao(retorno.origem, retorno.destino, retorno.ip, retorno.porta);

    return retorno;
  }
}
