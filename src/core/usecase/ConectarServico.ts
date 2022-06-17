import { ServicoRepository } from "../repository/ServicoRepository";
import { NaoExisteServicoIpPortaError } from "./errors/NaoExisteServicoIpPortaError";
import { NaoExisteServicoNomeError } from "./errors/NaoExisteServicoNomeError";

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

    const retorno = { origem: origem.nome, destino: destino.nome, ip, porta };
    await this._repository.salvarConexao(retorno.origem, retorno.destino, retorno.ip, retorno.porta);

    return retorno;
  }
}
