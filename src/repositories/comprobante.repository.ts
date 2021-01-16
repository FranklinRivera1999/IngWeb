import {DefaultCrudRepository} from '@loopback/repository';
import {Comprobante, ComprobanteRelations} from '../models';
import {MongodbDataSource} from '../datasources';
import {inject} from '@loopback/core';

export class ComprobanteRepository extends DefaultCrudRepository<
  Comprobante,
  typeof Comprobante.prototype.id,
  ComprobanteRelations
> {
  constructor(
    @inject('datasources.mongodb') dataSource: MongodbDataSource,
  ) {
    super(Comprobante, dataSource);
  }
}
