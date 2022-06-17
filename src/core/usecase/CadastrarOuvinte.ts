import { ServicoRepository } from "../repository/ServicoRepository";
import { IpInvalidoError } from "./errors/IpInvalidoError";
import { NaoExisteServicoNomeError } from "./errors/NaoExisteServicoNomeError";

export class CadastrarOuvinte {
  private _repository: ServicoRepository;

  constructor(repository: ServicoRepository) {
    this._repository = repository;
  }

  async execute(nome: string, ip: string, porta: number) {
    if (this._ipInvalido(ip)) throw new IpInvalidoError(ip);

    const origem = await this._repository.obterPorNome(nome);
    if (!origem) throw new NaoExisteServicoNomeError(nome);

    const retorno = { origem: origem.nome, ip, porta };
    await this._repository.salvarOuvinte(retorno.origem, retorno.ip, retorno.porta);

    return retorno;
  }

  private _ipInvalido(ip: string): boolean {
    const retorno = !ip.match(/^\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}$/);

    return retorno;
  }
}
