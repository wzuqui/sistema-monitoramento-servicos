import { Servico } from "../core/entity/Servico";

type Conexao = { origem: string; destino: string; ip: string; porta: number };
type Ouvinte = { origem: string; ip: string; porta: number };

export class ServicoAdapter {
  static create(nome: string, conexoes: Conexao[], ouvintes: Ouvinte[]) {
    const retorno = new Servico(nome, conexoes, ouvintes);

    return retorno;
  }
}