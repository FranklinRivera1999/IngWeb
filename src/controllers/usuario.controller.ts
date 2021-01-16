import {authenticate} from '@loopback/authentication';
import { Context, inject } from '@loopback/core';
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
  Request,
  HttpErrors,
  RestBindings,
  RequestContext,
} from '@loopback/rest';
import { TokenServiceBindings } from '../keys';
import {Usuario} from '../models';
import {UsuarioRepository} from '../repositories';
import { JWTService, UsuarioService } from '../services';
import {CredentialsSchema} from '../types'


class Credentials {
  code: string;
}

export class UsuarioController {

  usuarioService : UsuarioService;

  constructor(
    @repository(UsuarioRepository)
    public usuarioRepository : UsuarioRepository,

    @inject(TokenServiceBindings.TOKEN_SERVICE)
    public jwtService: JWTService,
  ) {
    this.usuarioService=new UsuarioService(usuarioRepository)
  }

  @post('/api/login', {
    responses: {
      '200': {
        description: 'Login for users'
      }
    }
  })
  async login(
    @requestBody() credentials: CredentialsSchema
  ): Promise<object> {
    let user = await  this.usuarioService.verifyCredentials(credentials)
    const userProfile = await this.usuarioService.convertToUserProfile(user)
    const token = await this.jwtService.generateToken(userProfile)

    let userRelations = await this.usuarioRepository.findById(user.id,{
      include:['roles','mesas']
    })

    userRelations.codigo = ''
    return {
      user: userRelations
      ,token
    }
  }
  

  @authenticate("jwt")
  @post('/api/usuarios', {
    responses: {
      '200': {
        description: 'Usuario model instance',
        content: {'application/json': {schema: getModelSchemaRef(Usuario)}},
      },
    },
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Usuario, {
            title: 'NewUsuario',
            exclude: ['id'],
          }),
        },
      },
    })
    usuario: Omit<Usuario, 'id'>,
  ): Promise<Usuario> {
    return this.usuarioRepository.create(usuario);
  }


  @get('/api/usuarios', {
    responses: {
      '200': {
        description: 'Array of Usuario model instances',
        content: {
          'application/json': {
            schema: {
              type: 'array',
              items: getModelSchemaRef(Usuario, {includeRelations: true}),
            },
          },
        },
      },
    },
  })
  async find(
    @param.filter(Usuario) filter?: Filter<Usuario>,
  ): Promise<Usuario[]> {
    return this.usuarioRepository.find(filter);
  }

  @authenticate("jwt")
  @patch('/api/usuarios', {
    responses: {
      '200': {
        description: 'Usuario PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Usuario, {partial: true}),
        },
      },
    })
    usuario: Usuario,
    @param.where(Usuario) where?: Where<Usuario>,
  ): Promise<Count> {
    return this.usuarioRepository.updateAll(usuario, where);
  }

  @authenticate("jwt")
  @get('/api/usuarios/{id}', {
    responses: {
      '200': {
        description: 'Usuario model instance',
        content: {
          'application/json': {
            schema: getModelSchemaRef(Usuario, {includeRelations: true}),
          },
        },
      },
    },
  })
  async findById(
    @param.path.string('id') id: string,
  ): Promise<Usuario> {
    return this.usuarioRepository.findById(id, {include:["roles"]});
  }

  

  @authenticate("jwt")
  @patch('/api/usuarios/{id}', {
    responses: {
      '204': {
        description: 'Usuario PATCH success',
      },
    },
  })
  async updateById(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Usuario, {partial: true}),
        },
      },
    })
    usuario: Usuario,
  ): Promise<void> {
    await this.usuarioRepository.updateById(id, usuario);
  }


  @authenticate("jwt")
  @put('/api/usuarios/{id}', {
    responses: {
      '204': {
        description: 'Usuario PUT success',
      },
    },
  })
  async replaceById(
    @param.path.string('id') id: string,
    @requestBody() usuario: Usuario,
  ): Promise<void> {
    await this.usuarioRepository.replaceById(id, usuario);
  }

   
  @authenticate("jwt")
  @del('/api/usuarios/{id}', {
    responses: {
      '204': {
        description: 'Usuario DELETE success',
      },
    },
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.usuarioRepository.deleteById(id);
  }

}
