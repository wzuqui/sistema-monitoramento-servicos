export class ServicoNaoEstaOuvindoIpPortaError extends Error {
  constructor(nome: string, ip: string, porta: number) {
    super(`Serviço ${nome} não está ouvindo ${ip}:${porta}`);
  }
}