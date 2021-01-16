import {belongsTo, Entity, model, property, hasMany} from '@loopback/repository';
import { Rol } from './rol.model';
import {Mesa} from './mesa.model';

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

  @property({
    type: 'string',
  })
  correo: string;

  @property({
    type: 'string',
  })
  numTelefono: string;

  @belongsTo(() => Rol, {name: 'roles'})
  rolId: string;

  @hasMany(() => Mesa, {keyTo: 'mozoId',name:'mesas'})
  mesas: Mesa[];

  constructor(data?: Partial<Usuario>) {
    super(data);
  }
}

export interface UsuarioRelations {
  // describe navigational properties here
}

export type UsuarioWithRelations = Usuario & UsuarioRelations;
