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
            '@config': './src/config/',
            '@controllers': './src/controllers/',
            '@database': './src/database/',
            '@routes': './src/routes/',
            '@shared': './src/shared/',
            '@utils': './src/utils/',
            '@views': './views/'            
        }
      }]
    ],
    ignore: [
      '**/*.spec.ts'
    ]
  }