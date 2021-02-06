import {Entity, model, property, belongsTo} from '@loopback/repository';
import {Cliente} from './cliente.model';
import { ProductoComprado } from './producto-comprado.model';
import {Mesa} from './mesa.model';

@model()
export class Pedido extends Entity {
  @property({
    type: 'string',
    id: true,
    required: true,
  })
  id: string;


  @property({
    type: 'date',
    defaultFn: 'now'
  })
  created?: string;

  @property({
    type: 'number',
  })
  total?: number;

  @property({
    type: 'array',
    itemType: Object
  })
  productos?: ProductoComprado[]

  @belongsTo(() => Cliente)
  clienteId: string;

  @belongsTo(() => Mesa)
  mesaId: string;

  constructor(data?: Partial<Pedido>) {
    super(data);
  }
}

export interface PedidoRelations {
  // describe navigational properties here
}

export type PedidoWithRelations = Pedido & PedidoRelations;
