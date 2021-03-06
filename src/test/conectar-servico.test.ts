import { NaoExisteServicoIpPortaError, ServicoNaoEstaOuvindoIpPortaError } from "@/domain/errors";
import { CadastrarOuvinte, ConectarServico, ObterServicoPorNome } from "@/domain/usecases";
import { ServicoRepositoryMemory, ServicoRepositorySqLite } from "@/infra/repositories";

test("[SQLITE] DADO um serviço {A} e um serviço {B} {ouvindo portas} QUANDO {A} tentar conectar em {B} DEVE criar uma conexão", async function () {
  // arrange
  const repository = new ServicoRepositorySqLite({ memoria: true });
  const obterServicoPorNome = new ObterServicoPorNome(repository);
  const destino = await obterServicoPorNome.execute("mssql");
  const cadastrarOuvinte = new CadastrarOuvinte(repository);
  const ouvinte = await cadastrarOuvinte.execute(destino.nome, "127.0.0.1", 1433, true);

  // act
  const target = new ConectarServico(repository);
  const origem = await obterServicoPorNome.execute("backend");
  const actual = await target.execute(origem.nome, ouvinte.ip, ouvinte.porta);

  // assert
  expect(actual).not.toBeNull();
  expect(actual.origem.toLowerCase()).toBe("backend");
  expect(actual.destino.toLowerCase()).toBe("mssql");
  expect(actual.ip).toBe("127.0.0.1");
  expect(actual.porta).toBe(1433);
});

test("DADO um serviço {A} e um serviço {B} {ouvindo portas} QUANDO {A} tentar conectar em {B} DEVE criar uma conexão", async function () {
  // arrange
  const repository = new ServicoRepositoryMemory();
  const obterServicoPorNome = new ObterServicoPorNome(repository);
  const destino = await obterServicoPorNome.execute("mssql");
  const cadastrarOuvinte = new CadastrarOuvinte(repository);
  const ouvinte = await cadastrarOuvinte.execute(destino.nome, "127.0.0.1", 1433, true);

  // act
  const target = new ConectarServico(repository);
  const origem = await obterServicoPorNome.execute("backend");
  const actual = await target.execute(origem.nome, ouvinte.ip, ouvinte.porta);

  // assert
  expect(actual).not.toBeNull();
  expect(actual.origem).toBe("backend");
  expect(actual.destino).toBe("mssql");
  expect(actual.ip).toBe("127.0.0.1");
  expect(actual.porta).toBe(1433);
});

test("DADO um serviço {A} e um serviço {B} QUANDO {A} tentar conectar em {B} DEVE gerar uma exceção dizendo que não existe ip e porta", async function () {
  // arrange
  const repository = new ServicoRepositoryMemory();
  const obterServicoPorNome = new ObterServicoPorNome(repository);
  const origem = await obterServicoPorNome.execute("backend");

  // act
  const target = new ConectarServico(repository);
  const actual = async () => await target.execute(origem.nome, "127.0.0.1", 1433);

  // assert
  await expect(actual()).rejects.toThrow(NaoExisteServicoIpPortaError);
});

test("DADO um serviço {A} e um serviço {B} {não ouvindo portas} QUANDO {A} tentar conectar em {B} DEVE dizendo que não está ouvindo ip e porta", async function () {
  // arrange
  const repository = new ServicoRepositoryMemory();
  const obterServicoPorNome = new ObterServicoPorNome(repository);
  const destino = await obterServicoPorNome.execute("mssql");
  const cadastrarOuvinte = new CadastrarOuvinte(repository);
  const ouvinte = await cadastrarOuvinte.execute(destino.nome, "127.0.0.1", 1433, false);

  // act
  const target = new ConectarServico(repository);
  const origem = await obterServicoPorNome.execute("backend");
  const actual = async () => await target.execute(origem.nome, ouvinte.ip, ouvinte.porta);

  // assert
  await expect(actual()).rejects.toThrow(ServicoNaoEstaOuvindoIpPortaError);
});
