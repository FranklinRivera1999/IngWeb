import {DefaultCrudRepository, repository, BelongsToAccessor} from '@loopback/repository';
import {Pedido, PedidoRelations, Cliente, Mesa} from '../models';
import {MongodbDataSource} from '../datasources';
import {inject, Getter} from '@loopback/core';
import {ClienteRepository} from './cliente.repository';
import {MesaRepository} from './mesa.repository';

export class PedidoRepository extends DefaultCrudRepository<
  Pedido,
  typeof Pedido.prototype.id,
  PedidoRelations
> {

  public readonly cliente: BelongsToAccessor<Cliente, typeof Pedido.prototype.id>;

  public readonly mesa: BelongsToAccessor<Mesa, typeof Pedido.prototype.id>;

  constructor(
    @inject('datasources.mongodb') dataSource: MongodbDataSource, @repository.getter('ClienteRepository') protected clienteRepositoryGetter: Getter<ClienteRepository>, @repository.getter('MesaRepository') protected mesaRepositoryGetter: Getter<MesaRepository>,
  ) {
    super(Pedido, dataSource);
    this.mesa = this.createBelongsToAccessorFor('mesa', mesaRepositoryGetter,);
    this.registerInclusionResolver('mesa', this.mesa.inclusionResolver);
    this.cliente = this.createBelongsToAccessorFor('cliente', clienteRepositoryGetter,);
    this.registerInclusionResolver('cliente', this.cliente.inclusionResolver);
  }
}
