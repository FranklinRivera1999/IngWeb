import {belongsTo, Entity, model, property} from '@loopback/repository';
import { Rol } from './rol.model';

@model()
export class Usuario extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: true,
  })
  id?: string;

  @property({
    type: 'string',
  })
  nombres?: string;

  @property({
    type: 'string',
  })
  apellidos?: string;

  @property({
    type: 'string',
    required: true,
  })
  codigo: string;


  @belongsTo(() => Rol, {name: 'roles'})
  rolId: string;

  constructor(data?: Partial<Usuario>) {
    super(data);
  }
}

export interface UsuarioRelations {
  // describe navigational properties here
}

export type UsuarioWithRelations = Usuario & UsuarioRelations;
