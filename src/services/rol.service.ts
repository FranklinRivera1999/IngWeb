
import { repository } from '@loopback/repository';
import {RolRepository} from '../repositories';
import { newRol } from '../types';

export class RolService {
    constructor(
        @repository(RolRepository)
        private rolRepository : RolRepository,
      ) {}

    async createRol(payloadRol: newRol){
        return await this.rolRepository.create(payloadRol)
    }

    async getAll(){
        return await this.rolRepository.find()
    }

    async getOneRol(id: string){
        return await this.rolRepository.findById(id)
    }

    async deleteRol(id:string){
        return await this.rolRepository.deleteById(id)
    }

    async updateRol(id: string, payloadRol: newRol){
        return this.rolRepository.updateById(id, payloadRol)
    }
}