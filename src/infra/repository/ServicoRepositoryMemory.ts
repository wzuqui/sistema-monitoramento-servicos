import { ServicoAdapter } from "../../adapter/ServicoAdapter";
import { Servico } from "../../core/entity/Servico";
import { ServicoRepository } from "../../core/repository/ServicoRepository";

type DbSet<T> = T;

export class ServicoRepositoryMemory implements ServicoRepository {
  private _conexoes: DbSet<{ origem: string; destino: string; ip: string; porta: number }>[];
  private _ouvintes: DbSet<{ origem: string; ip: string; porta: number; ouvindo: boolean }>[];
  private _servicos: DbSet<{ nome: string }>[];

  constructor() {
    this._conexoes = [];
    this._ouvintes = [];
    this._servicos = [{ nome: "backend" }, { nome: "mssql" }];
  }

  adicionar(nome: string): Promise<Servico | undefined> {
    this._servicos.push({ nome });
    const retorno = ServicoAdapter.create(nome, [], []);

    return Promise.resolve(retorno);
  }

  obterPorIpPorta(ip: string, porta: number): Promise<Servico | undefined> {
    const ouvinte = this._ouvintes.find((p) => p.ip === ip && p.porta === porta);
    if (!ouvinte) return Promise.resolve(undefined);

    const data = this._servicos.find((p) => p.nome === ouvinte.origem);
    if (!data) return Promise.resolve(undefined);

    const ouvintes = this._ouvintes.filter((p) => p.origem === data.nome);
    const conexoes = this._conexoes.filter((p) => p.origem === data.nome);
    const retorno = ServicoAdapter.create(data.nome, conexoes, ouvintes);

    return Promise.resolve(retorno);
  }

  obterPorNome(nome: string): Promise<Servico | undefined> {
    const data = this._servicos.find((p) => p.nome === nome);
    if (!data) return Promise.resolve(undefined);

    const ouvintes = this._ouvintes.filter((p) => p.origem === data.nome);
    const conexoes = this._conexoes.filter((p) => p.origem === data.nome);
    const retorno = ServicoAdapter.create(data.nome, conexoes, ouvintes);

    return Promise.resolve(retorno);
  }

  salvarConexao(origem: string, destino: string, ip: string, porta: number): Promise<void> {
    this._conexoes.push({ origem, destino, ip, porta });
    return Promise.resolve();
  }

  salvarOuvinte(origem: string, ip: string, porta: number, ouvindo: boolean): Promise<void> {
    this._ouvintes.push({ origem, ip, porta, ouvindo });
    return Promise.resolve();
  }
}
