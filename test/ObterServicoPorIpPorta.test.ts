import { ObterServicoPorIpPorta } from "../src/core/usecase/ObterServicoPorIpPorta";
import { ServicoRepositorySqLite } from "../src/infra/repository/ServicoRepositorySqLite";

test("DADO um ip {A} e porta {B} DEVE obter um serviço", async function () {
  // arrange
  const repository = new ServicoRepositorySqLite();

  // act
  const target = new ObterServicoPorIpPorta(repository);
  const actual = await target.execute("127.0.0.1", 1433);

  // assert
  expect(actual).not.toBeNull();
});
