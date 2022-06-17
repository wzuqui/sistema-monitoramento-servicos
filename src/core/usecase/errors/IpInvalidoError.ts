export class IpInvalidoError extends Error {
  constructor(ip: string) {
    super(`O ip ${ip} é inválido`);
  }
}
