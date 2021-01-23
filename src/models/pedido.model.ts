import {Entity, model, property, belongsTo} from '@loopback/repository';
import {Cliente} from './cliente.model';

@model()
export class Pedido extends Entity {
  @property({
    type: 'string',
    id: true,
    required: true,
  })
  id: string;

  @property({
    type: 'string',
  })
  clienteDNI?: string;

  @property({
    type: 'date',
    defaultFn: 'now'
  })
  created?: string;


  @property({
    type: 'array'
  })
  productos?: object[]

  @belongsTo(() => Cliente)
  clienteId: string;

  constructor(data?: Partial<Pedido>) {
    super(data);
  }
}

export interface PedidoRelations {
  // describe navigational properties here
}

export type PedidoWithRelations = Pedido & PedidoRelations;
