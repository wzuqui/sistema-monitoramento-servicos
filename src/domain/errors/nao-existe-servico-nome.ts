export class NaoExisteServicoNomeError extends Error {
  constructor(nome: string) {
    super(`Não existe serviço com o nome ${nome}`);
  }
}