import Abstract from './abstract.js'

export default (type, credentials) => {
  switch (type) {
    // Implement other authentication types here like OAuth, SAML, etc.
    default:
      return new Abstract(credentials)
  }
}
