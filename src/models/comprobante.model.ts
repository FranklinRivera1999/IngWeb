import {Entity, model, property} from '@loopback/repository';

@model()
export class Comprobante extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: true,
  })
  id?: string;

  @property({
    type: 'string',
  })
  tipoPago?: string;


  constructor(data?: Partial<Comprobante>) {
    super(data);
  }
}

export interface ComprobanteRelations {
  // describe navigational properties here
}

export type ComprobanteWithRelations = Comprobante & ComprobanteRelations;
