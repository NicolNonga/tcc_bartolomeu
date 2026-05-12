export default {
  path: import.meta.dirname + '/../', // ← aponta para a raiz do projecto
  title: 'TCC API',
  version: '1.0.0',
  description: 'Documentação da API',
  tagIndex: 2,
  snakeCase: true,
  debug: false,
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
  apis: ['docs/swagger/**/*.yml'],
}
