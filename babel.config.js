module.exports = {
    presets: [
      [
        '@babel/preset-env',
        {
          targets: {
            node: 'current'
          }
        }
      ],
      '@babel/preset-typescript'
    ],
    plugins: [
      ['module-resolver', {
        alias: {
            '@config': './src/config',
            '@controllers': './src/controllers/',
            '@models': './src/models/',
            '@services': './src/services/',
            '@utils': './src/utils/',
            '@views': './src/views/'         
        }
      }]
    ],
    ignore: [
      '**/*.spec.ts'
    ]
  }