import { ObterServicoPorNome } from "../src/core/usecase/ObterServicoPorNome";
import { ServicoRepositorySqLite } from "../src/infra/repository/ServicoRepositorySqLite";

test("DADO um nome {A} DEVE obter um serviço", async function () {
  // arrange
  const repository = new ServicoRepositorySqLite({ memoria: true });

  // act
  const target = new ObterServicoPorNome(repository);
  const actual = await target.execute("MSSQL");

  // assert
  expect(actual).not.toBeNull();
});

test("DADO um nome {B} DEVE obter um serviço", async function () {
  // arrange
  const repository = new ServicoRepositorySqLite({ memoria: true });

  // act
  const target = new ObterServicoPorNome(repository);
  const actual = await target.execute("Backend");

  // assert
  expect(actual).not.toBeNull();
});
