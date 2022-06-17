import { CadastrarOuvinte } from "../src/core/usecase/CadastrarOuvinte";
import { IpInvalidoError } from "../src/core/usecase/errors/IpInvalidoError";
import { ObterServicoPorNome } from "../src/core/usecase/ObterServicoPorNome";
import { ServicoRepositoryMemory } from "../src/infra/repository/ServicoRepositoryMemory";

test("DADO um serviço {A} QUANDO tentar cadastrar um ouvinte {IP} e {PORTA} DEVE criar ouvinte", async function () {
  // arrange
  const repository = new ServicoRepositoryMemory();
  const obterServicoPorNome = new ObterServicoPorNome(repository);
  const origem = await obterServicoPorNome.execute("mssql");

  // act
  const target = new CadastrarOuvinte(repository);
  const actual = await target.execute(origem.nome, "127.0.0.1", 1433);

  // assert
  expect(actual).not.toBeNull();
  expect(actual.ip).toBe("127.0.0.1");
  expect(actual.porta).toBe(1433);
});

test("DADO um serviço {A} QUANDO tentar cadastrar um ouvinte {IP inválido} e {PORTA} DEVE gerar uma exceção", async function () {
  // arrange
  const repository = new ServicoRepositoryMemory();
  const obterServicoPorNome = new ObterServicoPorNome(repository);
  const origem = await obterServicoPorNome.execute("mssql");

  // act
  const target = new CadastrarOuvinte(repository);
  const actual = async () => await target.execute(origem.nome, "127.X.X.1", 1433);

  // assert
  await expect(actual()).rejects.toThrow(IpInvalidoError);
});
