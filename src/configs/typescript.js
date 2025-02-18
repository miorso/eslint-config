import tseslint from 'typescript-eslint';

/** @type {import('eslint').Linter.Config[]} */
export default [
	{
		name: 'typescript/core',
		languageOptions: { parserOptions: { projectService: true, tsconfigRootDir: './' } },
		settings: { 'import/resolver': { typescript: { alwaysTryTypes: true, project: './tsconfig.json' } } },
	},
	...tseslint.configs.strictTypeChecked,
	...tseslint.configs.stylisticTypeChecked,
];
