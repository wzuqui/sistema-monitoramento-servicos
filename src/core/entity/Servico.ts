type Conexao = { origem: string; destino: string; ip: string; porta: number };
type Ouvinte = { origem: string; ip: string; porta: number };

export class Servico {
  nome: string;
  conexoes: Conexao[];
  ouvintes: Ouvinte[];

  constructor(nome: string, conexoes: Conexao[], ouvintes: Ouvinte[]) {
    this.nome = nome;
    this.conexoes = conexoes;
    this.ouvintes = ouvintes;
  }
}