module.exports = {
    env: {
        es2021: true,
        node: true
    },
    extends: ['standard'],
    parserOptions: {
        ecmaVersion: 12,
        sourceType: 'module'
    },
    rules: {
        indent: ['error', 4],
        'spaced-comment': ['error', 'always', { markers: ['/'] }],
        'no-trailing-spaces': 'error',
        camelcase: ['error', { properties: 'never' }],
        'space-before-function-paren': ['error', 'ignore'],
        'no-console': 'error'
    }
}
