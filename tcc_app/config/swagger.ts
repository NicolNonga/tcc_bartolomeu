export default {
  path: import.meta.dirname + '/../', // aponta para a raiz do projecto
  title: 'TCC API',
  version: '1.0.0',
  description: 'Documentação da API',
  tagIndex: 1,
  snakeCase: true,
  debug: true,
  ignore: ['/swagger', '/docs'],
  preferredPutPatch: 'PUT',
  common: {
    parameters: {},
    headers: {},
  },
  authMiddlewares: ['auth'],
  defaultSecurityScheme: 'BearerAuth',
  persistAuthorization: true,
  showFullPath: false,
}
