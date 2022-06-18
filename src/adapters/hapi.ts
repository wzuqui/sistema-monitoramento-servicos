import { Request } from "@hapi/hapi";

export class HapiAdapter {
  static create(fn: (params: unknown, body: unknown) => unknown) {
    const retorno = async function (req: Request) {
      const obj = await fn(req.params, req.payload);
      return obj;
    };

    return retorno;
  }
}
