import antfu from '@antfu/eslint-config'

export default antfu(
  {
    // lint for front
    files: ['frontend/**/*.js', 'frontend/**/*.jsx'],
    languageOptions: {
      globals: {
        // enable browser functions
        window: 'readonly',
        document: 'readonly',
      },
    },
    rules: {
      // ...
    },
  },
  {
    // lint for back
    files: ['backend/**/*.js'],
    languageOptions: {
      globals: {
        // enable server functions
        process: 'readonly',
        console: 'readonly', 
      },
    },
    rules: {
      'no-console': 'off',
    },
  }
)