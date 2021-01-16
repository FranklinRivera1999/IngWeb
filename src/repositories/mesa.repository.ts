import {DefaultCrudRepository, repository, BelongsToAccessor} from '@loopback/repository';
import {Mesa, MesaRelations, Usuario} from '../models';
import {MongodbDataSource} from '../datasources';
import {inject, Getter} from '@loopback/core';
import {UsuarioRepository} from './usuario.repository';

export class MesaRepository extends DefaultCrudRepository<
  Mesa,
  typeof Mesa.prototype.id,
  MesaRelations
> {

  public readonly mozo: BelongsToAccessor<Usuario, typeof Mesa.prototype.id>;

  constructor(
    @inject('datasources.mongodb') dataSource: MongodbDataSource, @repository.getter('UsuarioRepository') protected usuarioRepositoryGetter: Getter<UsuarioRepository>,
  ) {
    super(Mesa, dataSource);
    this.mozo = this.createBelongsToAccessorFor('mozo', usuarioRepositoryGetter,);
    this.registerInclusionResolver('mozo', this.mozo.inclusionResolver);
  }
}
