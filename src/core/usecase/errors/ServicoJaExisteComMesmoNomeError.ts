export class ServicoJaExisteComMesmoNomeError extends Error {
  constructor(public readonly nome: string) {
    super(`Serviço ${nome} já existe`);
  }
}