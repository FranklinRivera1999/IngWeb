import { model, property } from "@loopback/repository";

@model()
export class newRolSchema {
    @property()
    nombre: string
}