import { SimpleMessagesProvider } from '@vinejs/vine'

export const customerMessageValidator = (fields: any) =>
  new SimpleMessagesProvider(
    {
      // Applicable for all fields
      'required': 'O {{ field }} é obrigatório',
      'string': 'O valor do campo {{ field }} deve ser uma string',
      'database.exists': 'O {{ field }} não foi encontrado',
      'database.unique': 'Já existe  {{ field }} cadastrado',
      'minLength': '{{field}} tem que ter no minimo {{min}}',
      'min': '{{field}} tem que ser maior ou igual a {{min}}',
      'max': '{{field}} tem que ser menor ou igual a {{max}}',
    },
    fields
  )
