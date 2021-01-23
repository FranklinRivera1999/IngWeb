import {DefaultCrudRepository, repository, BelongsToAccessor} from '@loopback/repository';
import {Pedido, PedidoRelations, Cliente} from '../models';
import {MongodbDataSource} from '../datasources';
import {inject, Getter} from '@loopback/core';
import {ClienteRepository} from './cliente.repository';

export class PedidoRepository extends DefaultCrudRepository<
  Pedido,
  typeof Pedido.prototype.id,
  PedidoRelations
> {

  public readonly cliente: BelongsToAccessor<Cliente, typeof Pedido.prototype.id>;

  constructor(
    @inject('datasources.mongodb') dataSource: MongodbDataSource, @repository.getter('ClienteRepository') protected clienteRepositoryGetter: Getter<ClienteRepository>,
  ) {
    super(Pedido, dataSource);
    this.cliente = this.createBelongsToAccessorFor('cliente', clienteRepositoryGetter,);
    this.registerInclusionResolver('cliente', this.cliente.inclusionResolver);
  }
}
