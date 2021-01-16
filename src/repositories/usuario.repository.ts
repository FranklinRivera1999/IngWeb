import {DefaultCrudRepository, repository, BelongsToAccessor, HasManyRepositoryFactory} from '@loopback/repository';
import {Usuario, UsuarioRelations, Rol, Mesa} from '../models';
import {MongodbDataSource} from '../datasources';
import {inject, Getter} from '@loopback/core';
import {RolRepository} from './rol.repository';
import {MesaRepository} from './mesa.repository';

export type Credentials = {
  codigo: string;
}

export class UsuarioRepository extends DefaultCrudRepository<
  Usuario,
  typeof Usuario.prototype.id,
  UsuarioRelations
> {

  public readonly roles: BelongsToAccessor<Rol, typeof Usuario.prototype.id>;

  public readonly mesas: HasManyRepositoryFactory<Mesa, typeof Usuario.prototype.id>;

  constructor(
    @inject('datasources.mongodb') dataSource: MongodbDataSource, @repository.getter('RolRepository') protected rolRepositoryGetter: Getter<RolRepository>, @repository.getter('MesaRepository') protected mesaRepositoryGetter: Getter<MesaRepository>,
  ) {
    super(Usuario, dataSource);
    this.mesas = this.createHasManyRepositoryFactoryFor('mesas', mesaRepositoryGetter,);
    this.registerInclusionResolver('mesas', this.mesas.inclusionResolver);
    this.roles = this.createBelongsToAccessorFor('roles', rolRepositoryGetter,);
    this.registerInclusionResolver('roles', this.roles.inclusionResolver);
  }
}
