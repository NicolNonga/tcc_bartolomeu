import env from '#start/env'
import NodeMailer from 'nodemailer'

// eslint-disable-next-line @typescript-eslint/naming-convention
interface emailInterface {
  to: string
  subject: string
  content: string
}

export class SendEmail {
  private TRASPORTER = NodeMailer.createTransport({
    host: env.get('SMTP_HOST'),
    port: env.get('SMTP_PORT'),
    secure: false,
    auth: {
      user: env.get('SMTP_USERNAME'),
      pass: env.get('SMTP_PASSWORD'),
    },
  })

  async send(emailProps: emailInterface) {
    try {
      this.TRASPORTER.sendMail({
        from: env.get('USER_EMAIL'),
        to: emailProps.to,
        subject: emailProps.subject,
        text: emailProps.content,
      })
    } catch (error) {}
  }
}
