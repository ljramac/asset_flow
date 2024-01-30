export default class AuthAbstract {
  constructor (credentials) {
    this.credentials = credentials
  }

  async authenticate () {
    return { username: this.credentials?.username }
  }
}
