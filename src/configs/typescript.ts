import tseslint from 'typescript-eslint';
import { Linter } from 'eslint';

const tsEslintConfigs = [
	...tseslint.configs.strictTypeChecked,
	...tseslint.configs.stylisticTypeChecked,
] as Linter.Config[];

export default [
	{
		name: 'typescript/core',
		languageOptions: { parserOptions: { projectService: true, tsconfigRootDir: './' } },
		settings: { 'import/resolver': { typescript: { alwaysTryTypes: true, project: './tsconfig.json' } } },
	},
	...tsEslintConfigs,
] satisfies Linter.Config[];
