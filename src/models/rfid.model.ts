import {Entity, model, property} from '@loopback/repository';

@model()
export class Rfid extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: true,
  })
  id?: string;

  @property({
    type: 'string',
  })
  code?: string;

  @property({
    type: 'number',
    default: 100
  })
  saldo?: number;

  constructor(data?: Partial<Rfid>) {
    super(data);
  }
}

export interface RfidRelations {
  // describe navigational properties here
}

export type RfidWithRelations = Rfid & RfidRelations;
