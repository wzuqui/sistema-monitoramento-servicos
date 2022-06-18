import { JaExisteServicoComMesmoNomeError } from "@/domain/errors";
import { CadastrarServico } from "@/domain/usecases";
import { ServicoRepositorySqLite } from "@/infra/repositories";

test("DADO um nome {A} QUANDO tentar cadastrar um serviço DEVE conseguir", async function () {
  // arrange
  const repository = new ServicoRepositorySqLite({ memoria: true });

  // act
  const target = new CadastrarServico(repository);
  const actual = await target.execute("Frontend");

  // assert
  expect(actual).not.toBeNull();
  expect(actual!.nome).toBe("Frontend");
});

test("DADO um nome {A} QUANDO tentar cadastrar um serviço DEVE gerar uma exceção que já existe", async function () {
  // arrange
  const repository = new ServicoRepositorySqLite({ memoria: true });

  // act
  const target = new CadastrarServico(repository);
  await target.execute("Frontend");
  const actual = async () => await target.execute("Frontend");

  // assert
  await expect(actual()).rejects.toThrow(JaExisteServicoComMesmoNomeError);
});
