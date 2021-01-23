import {DefaultCrudRepository, repository, BelongsToAccessor} from '@loopback/repository';
import {Cliente, ClienteRelations, Rfid} from '../models';
import {MongodbDataSource} from '../datasources';
import {inject, Getter} from '@loopback/core';
import {RfidRepository} from './rfid.repository';

export class ClienteRepository extends DefaultCrudRepository<
  Cliente,
  typeof Cliente.prototype.id,
  ClienteRelations
> {

  public readonly rfid: BelongsToAccessor<Rfid, typeof Cliente.prototype.id>;

  constructor(
    @inject('datasources.mongodb') dataSource: MongodbDataSource, @repository.getter('RfidRepository') protected rfidRepositoryGetter: Getter<RfidRepository>,
  ) {
    super(Cliente, dataSource);
    this.rfid = this.createBelongsToAccessorFor('rfid', rfidRepositoryGetter,);
    this.registerInclusionResolver('rfid', this.rfid.inclusionResolver);
  }
}
