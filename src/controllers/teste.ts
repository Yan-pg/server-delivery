import { Request, Response } from 'express';
import { getRepository } from 'typeorm';
import Products from '../models/Products';

export default class find {
  public async index(request: Request, response: Response): Promise<Response> {
    const findResitory = getRepository(Products);
    const { product_id } = request.params;

    const finde = await findResitory.find({ where: product_id });

    console.log(finde);

    return response.json(finde);
  }
}
