import globals from 'globals';

/** @type {import('eslint').Linter.Config[]} */
export default [
	{
		name: 'eslint/core',
		files: ['**/*.{js,ts,jsx,tsx}'],
		linterOptions: { reportUnusedDisableDirectives: 'error' },
		languageOptions: { globals: { ...globals.browser, ...globals.node } },
	},
];
