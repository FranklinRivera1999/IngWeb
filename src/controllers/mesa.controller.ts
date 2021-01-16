import {authenticate} from '@loopback/authentication';
import {
  Filter,
  FilterExcludingWhere,
  repository,
} from '@loopback/repository';
import {
  post,
  param,
  get,
  getModelSchemaRef,
  patch,
  put,
  del,
  requestBody,
} from '@loopback/rest';
import {Mesa} from '../models';
import {MesaRepository} from '../repositories';

export class MesaController {
  constructor(
    @repository(MesaRepository)
    public mesaRepository : MesaRepository,
  ) {}
 
  @authenticate("jwt")
  @post('/api/mesas', {
    responses: {
      '200': {
        description: 'Mesa model instance',
        content: {'application/json': {schema: getModelSchemaRef(Mesa)}},
      },
    },
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Mesa, {
            title: 'NewMesa',
            exclude: ['id'],
          }),
        },
      },
    })
    mesa: Omit<Mesa, 'id'>,
  ): Promise<Mesa> {
    return this.mesaRepository.create(mesa);
  }

  @authenticate("jwt")
  @get('/api/mesas', {
    responses: {
      '200': {
        description: 'Array of Mesa model instances',
        content: {
          'application/json': {
            schema: {
              type: 'array',
              items: getModelSchemaRef(Mesa, {includeRelations: true}),
            },
          },
        },
      },
    },
  })
  async find(
    @param.filter(Mesa) filter?: Filter<Mesa>,
  ): Promise<Mesa[]> {
    return this.mesaRepository.find(filter);
  }


  @authenticate("jwt")
  @get('/api/mesas/{id}', {
    responses: {
      '200': {
        description: 'Mesa model instance',
        content: {
          'application/json': {
            schema: getModelSchemaRef(Mesa, {includeRelations: true}),
          },
        },
      },
    },
  })
  async findById(
    @param.path.string('id') id: string,
    @param.filter(Mesa, {exclude: 'where'}) filter?: FilterExcludingWhere<Mesa>
  ): Promise<Mesa> {
    return this.mesaRepository.findById(id, filter);
  }

  @authenticate("jwt")
  @patch('/api/mesas/{id}', {
    responses: {
      '204': {
        description: 'Mesa PATCH success',
      },
    },
  })
  async updateById(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Mesa, {partial: true}),
        },
      },
    })
    mesa: Mesa,
  ): Promise<void> {
    await this.mesaRepository.updateById(id, mesa);
  }

  @authenticate("jwt")
  @put('/api/mesas/{id}', {
    responses: {
      '204': {
        description: 'Mesa PUT success',
      },
    },
  })
  async replaceById(
    @param.path.string('id') id: string,
    @requestBody() mesa: Mesa,
  ): Promise<void> {
    await this.mesaRepository.replaceById(id, mesa);
  }

  @authenticate("jwt")
  @del('/api/mesas/{id}', {
    responses: {
      '204': {
        description: 'Mesa DELETE success',
      },
    },
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.mesaRepository.deleteById(id);
  }
}
