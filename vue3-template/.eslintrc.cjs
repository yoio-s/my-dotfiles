module.exports = {
  root: true,
  extends: [
    '../eslint-config/eslint-config-vue-ts',
    'prettier',
  ],
  parserOptions: {
    ecmaFeatures: {
      jsx: true
    },
  },
  settings: { 'import/core-modules': ['envs', '~pages'] },
  rules: {
    'vue/no-static-inline-styles': ['error', { allowBinding: false }],
    'vue/no-restricted-block': [
      'error',
      {
        element: 'style',
        message:
          'this project use tailwind, do not use <style> block in this project',
      },
    ],
    '@typescript-eslint/no-unsafe-assignment': 'off',
    '@typescript-eslint/no-unsafe-member-access': 'off',
    '@typescript-eslint/no-unsafe-call': 'off',
  },
}
