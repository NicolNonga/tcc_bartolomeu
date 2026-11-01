import { BaseSeeder } from '@adonisjs/lucid/seeders'
import { DateTime } from 'luxon'
import User from '#models/user'
import Condutor from '#models/condutor'
import Viatura from '#models/viatura'

export default class extends BaseSeeder {
  async run() {
    const pedro = await User.findBy('email', 'pedro.condutor@tcc.com')
    const maria = await User.findBy('email', 'maria.condutor@tcc.com')

    const condutores = await Condutor.updateOrCreateMany('numeroCarta', [
      {
        userId: pedro?.id || null,
        numeroCarta: 'AO-12345678',
        categoriaCarta: 'B',
        validadeCarta: DateTime.now().plus({ days: 20 }),
        telefone: '+244 923 111 222',
        dataNascimento: DateTime.fromISO('1990-05-15'),
        morada: 'Luanda, Maianga',
        observacao: 'Condutor principal',
      },
      {
        userId: maria?.id || null,
        numeroCarta: 'AO-87654321',
        categoriaCarta: 'D',
        validadeCarta: DateTime.now().plus({ months: 8 }),
        telefone: '+244 923 333 444',
        dataNascimento: DateTime.fromISO('1988-11-20'),
        morada: 'Luanda, Talatona',
        observacao: 'Condutora de autocarro',
      },
      {
        userId: null,
        numeroCarta: 'AO-11223344',
        categoriaCarta: 'C',
        validadeCarta: DateTime.now().plus({ days: 10 }),
        telefone: '+244 923 555 666',
        morada: 'Benguela',
        observacao: 'Condutor de viaturas pesadas',
      },
    ])

    const hilux = await Viatura.findBy('matricula', 'LD-12-34-AB')
    if (hilux && condutores[0]) {
      hilux.condutorResponsavelId = condutores[0].id
      await hilux.save()
    }
  }
}
