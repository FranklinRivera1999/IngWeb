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
import {Rfid} from '../models';
import {RfidRepository} from '../repositories';

export class RfidController {
  constructor(
    @repository(RfidRepository)
    public rfidRepository : RfidRepository,
  ) {}

  @post('/rfids', {
    responses: {
      '200': {
        description: 'Rfid model instance',
        content: {'application/json': {schema: getModelSchemaRef(Rfid)}},
      },
    },
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Rfid, {
            title: 'NewRfid',
            exclude: ['id'],
          }),
        },
      },
    })
    rfid: Omit<Rfid, 'id'>,
  ): Promise<Rfid> {
    return this.rfidRepository.create(rfid);
  }


  @get('/rfids', {
    responses: {
      '200': {
        description: 'Array of Rfid model instances',
        content: {
          'application/json': {
            schema: {
              type: 'array',
              items: getModelSchemaRef(Rfid, {includeRelations: true}),
            },
          },
        },
      },
    },
  })
  async find(
    @param.filter(Rfid) filter?: Filter<Rfid>,
  ): Promise<Rfid[]> {
    return this.rfidRepository.find(filter);
  }


  @get('/rfids/{id}', {
    responses: {
      '200': {
        description: 'Rfid model instance',
        content: {
          'application/json': {
            schema: getModelSchemaRef(Rfid, {includeRelations: true}),
          },
        },
      },
    },
  })
  async findById(
    @param.path.string('id') id: string,
    @param.filter(Rfid, {exclude: 'where'}) filter?: FilterExcludingWhere<Rfid>
  ): Promise<Rfid> {
    return this.rfidRepository.findById(id, filter);
  }

  @patch('/rfids/{id}', {
    responses: {
      '204': {
        description: 'Rfid PATCH success',
      },
    },
  })
  async updateById(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Rfid, {partial: true}),
        },
      },
    })
    rfid: Rfid,
  ): Promise<void> {
    await this.rfidRepository.updateById(id, rfid);
  }

  @del('/rfids/{id}', {
    responses: {
      '204': {
        description: 'Rfid DELETE success',
      },
    },
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.rfidRepository.deleteById(id);
  }
}
