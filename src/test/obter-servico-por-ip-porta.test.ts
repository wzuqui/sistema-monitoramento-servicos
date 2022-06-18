import { ObterServicoPorIpPorta } from "@/domain/usecases";
import { ServicoRepositorySqLite } from "@/infra/repositories";

test("DADO um ip {A} e porta {B} DEVE obter um serviço", async function () {
  // arrange
  const repository = new ServicoRepositorySqLite({memoria: true});

  // act
  const target = new ObterServicoPorIpPorta(repository);
  const actual = await target.execute("127.0.0.1", 1433);

  // assert
  expect(actual).not.toBeNull();
});
