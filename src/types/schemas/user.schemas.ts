import { model, property } from "@loopback/repository";

@model()
export class CredentialsSchema{
    @property()
    codigo: string
}