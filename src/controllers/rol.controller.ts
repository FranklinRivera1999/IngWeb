import { inject, service } from '@loopback/core';

import {
  post,
  param,
  get,
  getModelSchemaRef,
  put,
  del,
  requestBody,
} from '@loopback/rest';
import {Rol} from '../models';
import { RolService} from '../services';
import { newRolSchema } from '../types'
export class RolController {
  constructor(
    @service(RolService)
    public rolService: RolService,
  ) {}

  @post('/rols', {
    responses: {
      '200': {
        description: 'Rol model instance',
        content: {'application/json': {schema: getModelSchemaRef(Rol)}},
      },
    },
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(newRolSchema),
        },
      },
    })
    rol: newRolSchema,
  ): Promise<Rol> {
    return this.rolService.createRol(rol);
  }


  @get('/rols', {
    responses: {
      '200': {
        description: 'Array of Rol model instances',
        content: {
          'application/json': {
            schema: {
              type: 'array',
              items: getModelSchemaRef(Rol, {includeRelations: true}),
            },
          },
        },
      },
    },
  })
  async find(
  ): Promise<Rol[]> {
    return this.rolService.getAll();
  }


  @get('/rols/{id}', {
    responses: {
      '200': {
        description: 'Rol model instance',
        content: {
          'application/json': {
            schema: getModelSchemaRef(Rol, {includeRelations: true}),
          },
        },
      },
    },
  })
  async findById(
    @param.path.string('id') id: string,
  ): Promise<Rol> {
    return this.rolService.getOneRol(id);
  }

  @put('/rols/{id}', {
    responses: {
      '204': {
        description: 'Rol PATCH success',
      },
    },
  })
  async updateById(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(newRolSchema),
        },
      },
    })
    rol: newRolSchema,
  ): Promise<void> {
    await this.rolService.updateRol(id, rol);
  }

  @del('/rols/{id}', {
    responses: {
      '204': {
        description: 'Rol DELETE success',
      },
    },
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.rolService.deleteRol(id);
  }
}
