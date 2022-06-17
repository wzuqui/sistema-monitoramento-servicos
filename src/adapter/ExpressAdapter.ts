import { Request, Response } from "express";

export class ExpressAdapter {
  static create(fn: (params: unknown, body: unknown) => unknown) {
    const retorno = async function (req: Request, res: Response) {
      const obj = await fn(req.params, req.body);
      res.json(obj);
    };

    return retorno;
  }
}
