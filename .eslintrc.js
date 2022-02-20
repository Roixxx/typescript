module.exports = {
	env: {
		es2020: true,
		browser: true
	},
	parser: "@typescript-eslint/parser",
	parserOptions: {
		project: [
			"./tsconfig.json"
		],
		sourceType: "module",
		ecmaVersion: 2020
	},
	extends: [
		"airbnb-typescript/base",
		"plugin:@typescript-eslint/recommended",
		"plugin:@typescript-eslint/recommended-requiring-type-checking",
		"airbnb-base",
	],
	plugins: [
		"@typescript-eslint"
	],
	rules: {
		"no-console": process.env.NODE_ENV === "production" ? "warn" : "off",
		"no-debugger": process.env.NODE_ENV === "production" ? "warn" : "off",
		"linebreak-style": ["error", "windows"],
	},
  settings: {
    'import/resolver': {
      alias: {
        map: [
          ['@', './src/'],
        ],
      }
    }
  }
}
