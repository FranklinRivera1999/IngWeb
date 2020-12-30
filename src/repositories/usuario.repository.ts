import {DefaultCrudRepository, repository, BelongsToAccessor} from '@loopback/repository';
import {Usuario, UsuarioRelations, Rol} from '../models';
import {MongodbDataSource} from '../datasources';
import {inject, Getter} from '@loopback/core';
import {RolRepository} from './rol.repository';

export type Credentials = {
  codigo: string;
}

export class UsuarioRepository extends DefaultCrudRepository<
  Usuario,
  typeof Usuario.prototype.id,
  UsuarioRelations
> {

  public readonly roles: BelongsToAccessor<Rol, typeof Usuario.prototype.id>;

  constructor(
    @inject('datasources.mongodb') dataSource: MongodbDataSource, @repository.getter('RolRepository') protected rolRepositoryGetter: Getter<RolRepository>,
  ) {
    super(Usuario, dataSource);
    this.roles = this.createBelongsToAccessorFor('roles', rolRepositoryGetter,);
    this.registerInclusionResolver('roles', this.roles.inclusionResolver);
  }
}
