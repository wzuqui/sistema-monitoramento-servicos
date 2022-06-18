import { ServicoRepository } from "@/domain/repositories";
import { JaExisteServicoComMesmoNomeError } from "@/domain/errors";

export class CadastrarServico {
  private _repository: ServicoRepository;

  constructor(repository: ServicoRepository) {
    this._repository = repository;
  }

  async execute(nome: string) {
    const servico = await this._repository.obterPorNome(nome);
    if (servico !== undefined) throw new JaExisteServicoComMesmoNomeError(nome);

    const retorno = await this._repository.adicionar(nome);

    return retorno;
  }
}
