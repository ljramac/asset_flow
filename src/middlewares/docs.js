import swaggerUi from 'swagger-ui-express'
import YAML from 'yamljs'

export default () => ['/api/docs', swaggerUi.serve, swaggerUi.setup(YAML.load('./openapi.yaml'))]
