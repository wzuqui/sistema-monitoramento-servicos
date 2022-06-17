import { ServicoRepository } from "../repository/ServicoRepository";
import { ServicoJaExisteComMesmoNomeError } from "./errors/ServicoJaExisteComMesmoNomeError";

export class CadastrarServico {
  private _repository: ServicoRepository;

  constructor(repository: ServicoRepository) {
    this._repository = repository;
  }

  async execute(nome: string) {
    const servico = await this._repository.obterPorNome(nome);
    if (servico !== undefined) throw new ServicoJaExisteComMesmoNomeError(nome);

    const retorno = await this._repository.adicionar(nome);

    return retorno;
  }
}
