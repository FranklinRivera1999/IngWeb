import {DefaultCrudRepository} from '@loopback/repository';
import {Rfid, RfidRelations} from '../models';
import {MongodbDataSource} from '../datasources';
import {inject} from '@loopback/core';

export class RfidRepository extends DefaultCrudRepository<
  Rfid,
  typeof Rfid.prototype.id,
  RfidRelations
> {
  constructor(
    @inject('datasources.mongodb') dataSource: MongodbDataSource,
  ) {
    super(Rfid, dataSource);
  }
}
