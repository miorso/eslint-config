import tseslint from 'typescript-eslint';

/** @type {import('eslint').Linter.Config[]} */
export default [
	{
		name: 'typescript/core',
		languageOptions: { parserOptions: { projectService: true } },
		settings: { 'import/resolver': { typescript: { alwaysTryTypes: true, node: true } } },
	},
	...tseslint.configs.strictTypeChecked,
	...tseslint.configs.stylisticTypeChecked,
];
