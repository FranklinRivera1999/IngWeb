import {
  Count,
  CountSchema,
  Filter,
  FilterExcludingWhere,
  repository,
  Where,
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
import {Cliente} from '../models';
import {ClienteRepository} from '../repositories';

export class ClienteController {
  constructor(
    @repository(ClienteRepository)
    public clienteRepository : ClienteRepository,
  ) {}

  @post('/api/clientes', {
    responses: {
      '200': {
        description: 'Cliente model instance',
        content: {'application/json': {schema: getModelSchemaRef(Cliente)}},
      },
    },
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Cliente, {
            title: 'NewCliente',
            exclude: ['id'],
          }),
        },
      },
    })
    cliente: Omit<Cliente, 'id'>,
  ): Promise<Cliente> {
    return this.clienteRepository.create(cliente);
  }


  @get('/api/clientes', {
    responses: {
      '200': {
        description: 'Array of Cliente model instances',
        content: {
          'application/json': {
            schema: {
              type: 'array',
              items: getModelSchemaRef(Cliente, {includeRelations: true}),
            },
          },
        },
      },
    },
  })
  async find(

  ): Promise<Cliente[]> {
    return this.clienteRepository.find({
      include:['rfid']
    });
  }


  @get('/api/clientes/{id}', {
    responses: {
      '200': {
        description: 'Cliente model instance',
        content: {
          'application/json': {
            schema: getModelSchemaRef(Cliente, {includeRelations: true}),
          },
        },
      },
    },
  })
  async findById(
    @param.path.string('id') id: string,
    @param.filter(Cliente, {exclude: 'where'}) filter?: FilterExcludingWhere<Cliente>
  ): Promise<Cliente> {
    return this.clienteRepository.findById(id, filter);
  }

  @patch('/api/clientes/{id}', {
    responses: {
      '204': {
        description: 'Cliente PATCH success',
      },
    },
  })
  async updateById(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Cliente, {partial: true}),
        },
      },
    })
    cliente: Cliente,
  ): Promise<void> {
    await this.clienteRepository.updateById(id, cliente);
  }

  @del('/api/clientes/{id}', {
    responses: {
      '204': {
        description: 'Cliente DELETE success',
      },
    },
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.clienteRepository.deleteById(id);
  }
}
