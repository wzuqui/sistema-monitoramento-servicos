import { ServicoAdapter } from "../../adapter/ServicoAdapter";
import { Servico } from "../../core/entity/Servico";
import { ServicoRepository } from "../../core/repository/ServicoRepository";
import { database } from "../database/database";

export class ServicoRepositorySqLite implements ServicoRepository {
  async obterPorIpPorta(ip: string, porta: number): Promise<Servico | undefined> {
    const data = await this._obterPorIpPorta(ip, porta);
    if (!data) return undefined;

    const retorno = ServicoAdapter.create(data.nome, data.conexoes, data.ouvintes);

    return retorno;
  }

  async obterPorNome(nome: string): Promise<Servico | undefined> {
    const data = await this._obterPorNome(nome);
    if (!data) return undefined;

    const retorno = ServicoAdapter.create(data.nome, data.conexoes, data.ouvintes);

    return retorno;
  }

  salvarConexao(origem: string, destino: string, ip: string, porta: number): Promise<void> {
    throw new Error("Method not implemented.");
  }

  salvarOuvinte(origem: string, ip: string, porta: number, ouvindo: boolean): Promise<void> {
    throw new Error("Method not implemented.");
  }

  private async _obterPorIpPorta(ip: string, porta: number) {
    const db = await database;
    const SQL = `SELECT Nome as nome
                    FROM Servicos AS Servico
                    INNER JOIN Ouvintes AS Ouvinte ON Servico.Id = Ouvinte.OrigemId
                    WHERE Ouvinte.Ip = ? AND Ouvinte.Porta =?`;

    const data = await db.get<{ nome: string }>(SQL, ip, porta);
    if (!data) return undefined;
    return { nome: data.nome, conexoes: await this._obterConexoes(data.nome), ouvintes: await this._obterOuvintes(data.nome) };
  }

  private async _obterPorNome(nome: string) {
    const db = await database;
    const SQL = `SELECT Nome as nome FROM Servicos WHERE Nome = ?`;

    const data = await db.get<{ nome: string }>(SQL, nome);
    if (!data) return undefined;
    return { nome: data.nome, conexoes: await this._obterConexoes(nome), ouvintes: await this._obterOuvintes(nome) };
  }

  private async _obterConexoes(nome: string) {
    const db = await database;
    const SQL = `SELECT Origem.Nome AS origem
                      , Destino.Nome AS destino
                      , Conexao.Ip AS ip
                      , Conexao.Porta AS porta
                    FROM Conexoes AS Conexao
                    INNER JOIN Servicos AS Origem ON Conexao.OrigemId = Origem.Id
                    INNER JOIN Servicos AS Destino ON Conexao.DestinoId = Destino.Id
                    WHERE Origem.Nome = ?`;

    const data = await db.all<{ origem: string; destino: string; ip: string; porta: number }[]>(SQL, nome);
    return data;
  }

  private async _obterOuvintes(nome: string) {
    const db = await database;
    const SQL = `SELECT Origem.Nome AS origem
                      , Ouvinte.Ip AS ip
                      , Ouvinte.Porta AS porta
                      , Ouvinte.Ouvindo AS ouvindo
                    FROM Ouvintes as Ouvinte
                    INNER JOIN Servicos AS Origem ON Ouvinte.OrigemId = Origem.Id
                    WHERE Origem.Nome = ?`;

    const data = await db.all<{ origem: string; ip: string; porta: number; ouvindo: boolean }[]>(SQL, nome);
    return data;
  }
}
