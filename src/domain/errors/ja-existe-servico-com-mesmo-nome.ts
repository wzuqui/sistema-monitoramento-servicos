export class JaExisteServicoComMesmoNomeError extends Error {
  constructor(public readonly nome: string) {
    super(`Já existe serviço com o nome ${nome}`);
  }
}
