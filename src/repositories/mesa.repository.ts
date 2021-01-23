import {DefaultCrudRepository, repository, BelongsToAccessor} from '@loopback/repository';
import {Mesa, MesaRelations, Usuario, Cliente} from '../models';
import {MongodbDataSource} from '../datasources';
import {inject, Getter} from '@loopback/core';
import {UsuarioRepository} from './usuario.repository';
import {ClienteRepository} from './cliente.repository';

export class MesaRepository extends DefaultCrudRepository<
  Mesa,
  typeof Mesa.prototype.id,
  MesaRelations
> {

  public readonly mozo: BelongsToAccessor<Usuario, typeof Mesa.prototype.id>;

  public readonly cliente: BelongsToAccessor<Cliente, typeof Mesa.prototype.id>;

  constructor(
    @inject('datasources.mongodb') dataSource: MongodbDataSource, @repository.getter('UsuarioRepository') protected usuarioRepositoryGetter: Getter<UsuarioRepository>, @repository.getter('ClienteRepository') protected clienteRepositoryGetter: Getter<ClienteRepository>,
  ) {
    super(Mesa, dataSource);
    this.cliente = this.createBelongsToAccessorFor('cliente', clienteRepositoryGetter,);
    this.registerInclusionResolver('cliente', this.cliente.inclusionResolver);
    this.mozo = this.createBelongsToAccessorFor('mozo', usuarioRepositoryGetter,);
    this.registerInclusionResolver('mozo', this.mozo.inclusionResolver);
  }
}
