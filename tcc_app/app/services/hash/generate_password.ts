export class GenerateRandomPassword {
  private PASSWORDLENGTH: number
  constructor(passwordLength: number) {
    this.PASSWORDLENGTH = passwordLength
  }

  handle(): string {
    const charset = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'
    let retVal = ''

    for (let i = 0, n = charset.length; i < this.PASSWORDLENGTH; i++) {
      retVal += charset.charAt(Math.floor(Math.random() * n))
    }

    return retVal
  }
}
