export class NaoExisteServicoIpPortaError extends Error {
  constructor(ip: string, porta: number) {
    super(`Não existe serviço para o ip ${ip} e porta ${porta}`);
  }
}
