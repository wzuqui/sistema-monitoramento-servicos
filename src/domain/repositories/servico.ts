import { Servico } from "@/domain/entities";

export interface ServicoRepository {
  adicionar( nome: string) : Promise<Servico | undefined>;
  obterPorIpPorta(ip: string, porta: number): Promise<Servico | undefined>;
  obterPorNome(nome: string): Promise<Servico | undefined>;
  salvarConexao(origem: string, destino: string, ip: string, porta: number): Promise<void>;
  salvarOuvinte(origem: string, ip: string, porta: number, ouvindo: boolean): Promise<void>;
}
