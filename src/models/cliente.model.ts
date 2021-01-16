import {Entity, model, property} from '@loopback/repository';

@model()
export class Cliente extends Entity {
  
  @property({
    type: 'string',
    id: true,
    generated: true,
  })
  id?: string;

  @property({
    type: 'string',
  })
  dni?: string;

  @property({
    type: 'string',
  })
  nombres?: string;

  @property({
    type: 'string',
  })
  apellidos?: string;

  @property({
    type: 'number',
  })
  telefono?: number;

  @property({
    type: 'string',
  })
  nroTarjeta?: string;


  constructor(data?: Partial<Cliente>) {
    super(data);
  }
}

export interface ClienteRelations {
  // describe navigational properties here
}

export type ClienteWithRelations = Cliente & ClienteRelations;
