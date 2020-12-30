import { repository } from '@loopback/repository';
import { HttpErrors } from '@loopback/rest';
import { securityId, UserProfile } from '@loopback/security';
import { Usuario } from '../models';
import { Credentials, UsuarioRepository } from '../repositories';

export class UsuarioService {
    constructor(
        
        @repository(UsuarioRepository) 
        private userRepository: UsuarioRepository,
    ){

    }

    async verifyCredentials(credentials: Credentials): Promise<Usuario> {
      // implement this method
      const foundUser = await this.userRepository.findOne({
        where: {
          codigo: credentials.codigo
        }
      });
      if (!foundUser) {
        throw new HttpErrors.NotFound('user not found');
      }
     
      return foundUser;
    }
    convertToUserProfile(user: Usuario): UserProfile {
      let userName = '';
      if (user.nombres)
        userName = user.nombres;
      if (user.apellidos) {
        userName =`${user.nombres} ${user.apellidos}`;
      }

      return {
        [securityId]: user.id!.toString(),    
        name: userName,
        id: user.id,
        email: ''
      };
      // throw new Error('Method not implemented.');
    }
}
