import globals from 'globals';
import { Linter } from 'eslint';

export default [
	{
		name: 'eslint/core',
		files: ['**/*.{js,ts,jsx,tsx}'],
		linterOptions: { reportUnusedDisableDirectives: 'error' },
		languageOptions: { globals: { ...globals.browser, ...globals.node } },
	},
] satisfies Linter.Config[];
