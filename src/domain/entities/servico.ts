type Conexao = { origem: string; destino: string; ip: string; porta: number };
type Ouvinte = { origem: string; ip: string; porta: number; ouvindo: boolean };

export class Servico {
  nome: string;
  conexoes: Conexao[];
  ouvintes: Ouvinte[];

  constructor(nome: string, conexoes: Conexao[], ouvintes: Ouvinte[]) {
    this.nome = nome;
    this.conexoes = conexoes;
    this.ouvintes = ouvintes;
  }

  estaOuvindo(ip: string, porta: number) {
    const retorno = this.ouvintes.some((p) => p.ip === ip && p.porta === porta && p.ouvindo);

    return retorno;
  }
}
