import {
  repository,
} from '@loopback/repository';
import {
  param,
  get,
  getModelSchemaRef,
} from '@loopback/rest';
import {
  Pedido,
  Mesa,
} from '../models';
import {PedidoRepository} from '../repositories';

export class PedidoMesaController {
  constructor(
    @repository(PedidoRepository)
    public pedidoRepository: PedidoRepository,
  ) { }

  @get('/pedidos/{id}/mesa', {
    responses: {
      '200': {
        description: 'Mesa belonging to Pedido',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Mesa)},
          },
        },
      },
    },
  })
  async getMesa(
    @param.path.string('id') id: typeof Pedido.prototype.id,
  ): Promise<Mesa> {
    return this.pedidoRepository.mesa(id);
  }
}
