import {Model, model, property} from '@loopback/repository';

@model()
export class ProductoComprado extends Model {
  @property({
    type: 'string',
  })
  nombre?: string;

  @property({
    type: 'number',
  })
  precio?: number;

  @property({
    type: 'string',
  })
  categoria?: string;

  @property({
    type: 'number',
  })
  cantidad?: number;


  constructor(data?: Partial<ProductoComprado>) {
    super(data);
  }
}

export interface ProductoCompradoRelations {
  // describe navigational properties here
}

export type ProductoCompradoWithRelations = ProductoComprado & ProductoCompradoRelations;
