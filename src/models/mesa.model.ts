import {Entity, model, property, belongsTo} from '@loopback/repository';
import {Usuario} from './usuario.model';
import {Cliente} from './cliente.model';

@model()
export class Mesa extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: true,
  })
  id?: string;

  @property({
    type: 'string',
    required: true,
  })
  numMesa: string;

  @property({
    type: 'string',
  })
  especificacion?: string;

  @property({
    type: 'number',
  })
  canComensales?: number;

  @belongsTo(() => Usuario, {name: 'mozo'})
  mozoId: string;

  @belongsTo(() => Cliente,{name:'cliente'})
  clienteId: string;

  constructor(data?: Partial<Mesa>) {
    super(data);
  }
}

export interface MesaRelations {
  // describe navigational properties here
}

export type MesaWithRelations = Mesa & MesaRelations;
