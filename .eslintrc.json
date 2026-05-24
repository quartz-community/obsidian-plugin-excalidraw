{
  "root": true,
  "env": {
    "es2022": true,
    "node": true
  },
  "parser": "@typescript-eslint/parser",
  "parserOptions": {
    "sourceType": "module",
    "ecmaVersion": "latest",
    "project": "./tsconfig.json"
  },
  "plugins": ["@typescript-eslint"],
  "extends": ["eslint:recommended", "plugin:@typescript-eslint/recommended", "prettier"],
  "ignorePatterns": ["dist", "node_modules"],
  "rules": {
    "@typescript-eslint/no-unused-vars": [
      "error",
      {
        "argsIgnorePattern": "^_",
        "varsIgnorePattern": "^_",
        "caughtErrorsIgnorePattern": "^_"
      }
    ],
    "no-restricted-syntax": [
      "warn",
      {
        "selector": "Program:has(CallExpression[callee.property.name='addEventListener']):not(:has(CallExpression[callee.object.name='window'][callee.property.name='addCleanup']))",
        "message": "addEventListener should be paired with window.addCleanup() for proper SPA cleanup. See ARCHITECTURE.md for details."
      }
    ]
  },
  "overrides": [
    {
      "files": ["types/**/*.d.ts"],
      "rules": {
        "@typescript-eslint/triple-slash-reference": "off"
      }
    }
  ]
}
