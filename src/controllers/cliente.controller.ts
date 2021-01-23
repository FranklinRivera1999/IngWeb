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
  HttpErrors,
} from '@loopback/rest';
import {Cliente} from '../models';
import {ClienteRepository, MesaRepository} from '../repositories';

export class ClienteController {
  constructor(
    @repository(ClienteRepository)
    public clienteRepository : ClienteRepository,
    @repository(MesaRepository)
    public mesaRepository : MesaRepository,
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
    @param.query.string('query') query ?: string
  ): Promise<Cliente[]> {
    let findLogic:any = {
      where:{

      },
      include:['rfid']
    }

    if(query){
      findLogic.where.or =[{
        dni:{
          regexp: new RegExp('^.*' + query + '.*$', 'i')
        }
      }]
    }
    return this.clienteRepository.find(findLogic);
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

  @patch('/api/clientes/inside/{id}', {
    responses: {
      '204': {
        description: 'Cliente PATCH success',
      },
    },
  })
  async insideClient(
    @param.path.string('id') id: string
  ): Promise<void> {
    await this.clienteRepository.updateById(id, {
      status:"inside"
    });
  }

  @patch('/api/clientes/outside/{id}', {
    responses: {
      '204': {
        description: 'Cliente PATCH success',
      },
    },
  })
  async outsideClient(
    @param.path.string('id') id: string
  ): Promise<void> {

    await this.mesaRepository.updateAll(
      {
        clienteId: undefined
      },{
        clienteId: id
      }
    )
    await this.clienteRepository.updateById(id, {
      status:"inside"
    });
  }

  @patch('/api/clientes/assign', {
    responses: {
      '204': {
        description: 'Cliente PATCH success',
      },
    },
  })
  async assignMesa(
    @param.query.string('clienteId',{required:true}) clienteId: string,
    @param.query.string('mesaId',{required:true}) mesaId: string
  ): Promise<void> {
    let client = await this.clienteRepository.findById(clienteId)
    if(client.status == "outside") throw new HttpErrors[400]('Client Outside')
    await this.clienteRepository.updateById(clienteId,{
      status:"assign"
    })

    await this.mesaRepository.updateById(mesaId,{
      clienteId
    })
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
