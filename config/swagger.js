import swaggerJsDoc from 'swagger-jsdoc'
export const swaggerOptions = {
    swaggerDefinition: {
        info: {
            server: ['localhost:3000']
        }
    },
    apis: [
        `${process.cwd()}/index.js`,
        `${process.cwd()}/src/auth/auth.routes.js`
    ]
}
export const swaggerDocs = swaggerJsDoc(swaggerOptions)
