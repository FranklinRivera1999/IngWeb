import {
  Count,
  CountSchema,
  Filter,
  FilterExcludingWhere,
  repository,
  Where,
} from '@loopback/repository';
import {
  post,
  param,
  get,
  getModelSchemaRef,
  patch,
  put,
  del,
  requestBody,
} from '@loopback/rest';
import {Producto} from '../models';
import {ProductoRepository} from '../repositories';

export class ProductoController {
  constructor(
    @repository(ProductoRepository)
    public productoRepository : ProductoRepository,
  ) {}

  @post('/api/productos', {
    responses: {
      '200': {
        description: 'Producto model instance',
        content: {'application/json': {schema: getModelSchemaRef(Producto)}},
      },
    },
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Producto, {
            title: 'NewProducto',
            exclude: ['id'],
          }),
        },
      },
    })
    producto: Omit<Producto, 'id'>,
  ): Promise<Producto> {
    return this.productoRepository.create(producto);
  }


  @get('/api/productos', {
    responses: {
      '200': {
        description: 'Array of Producto model instances',
        content: {
          'application/json': {
            schema: {
              type: 'array',
              items: getModelSchemaRef(Producto, {includeRelations: true}),
            },
          },
        },
      },
    },
  })
  async find(
    @param.query.string('categoria') categoria :string,
    @param.query.number('limit') limit?:number,
  ): Promise<Producto[]> {
    return this.productoRepository.find({
      where:{
        categoria
      },
      limit
    });
  }


  @get('/api/productos/{id}', {
    responses: {
      '200': {
        description: 'Producto model instance',
        content: {
          'application/json': {
            schema: getModelSchemaRef(Producto, {includeRelations: true}),
          },
        },
      },
    },
  })
  async findById(
    @param.path.string('id') id: string,
    @param.filter(Producto, {exclude: 'where'}) filter?: FilterExcludingWhere<Producto>
  ): Promise<Producto> {
    return this.productoRepository.findById(id, filter);
  }

  @get('/api/productos/categorias')
  getCategorias(){
    return [
      'Bebidas',
      'Comidas',
      'Ensaladas'
    ]
  }
  @patch('/api/productos/{id}', {
    responses: {
      '204': {
        description: 'Producto PATCH success',
      },
    },
  })
  async updateById(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Producto, {partial: true}),
        },
      },
    })
    producto: Producto,
  ): Promise<void> {
    await this.productoRepository.updateById(id, producto);
  }

  @put('/api/productos/{id}', {
    responses: {
      '204': {
        description: 'Producto PUT success',
      },
    },
  })
  async replaceById(
    @param.path.string('id') id: string,
    @requestBody() producto: Producto,
  ): Promise<void> {
    await this.productoRepository.replaceById(id, producto);
  }

  @del('/api/productos/{id}', {
    responses: {
      '204': {
        description: 'Producto DELETE success',
      },
    },
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.productoRepository.deleteById(id);
  }
}
