import eslintPluginPrettierRecommended from 'eslint-plugin-prettier/recommended';
import stylistic from '@stylistic/eslint-plugin';
import { Linter } from 'eslint';

type ESLintConfigStyleOptions = {
	react: boolean;
};

const DEFAULT_OPTIONS = {
	react: false,
} as const satisfies ESLintConfigStyleOptions;

export function getConfig(options: ESLintConfigStyleOptions): Linter.Config[] {
	const mergedOptions = {
		react: options.react ?? DEFAULT_OPTIONS.react,
	};

	return [
		eslintPluginPrettierRecommended,
		{
			name: '@stylistic/recommended',
			...stylistic.configs.customize({
				flat: true,
				indent: 'tab',
				quotes: 'single',
				semi: true,
				jsx: mergedOptions.react,
			}),
		},
		{
			name: '@stylistic/custom-rules',
			rules: {
				// Disallow mixed spaces and tabs for indentation
				'@stylistic/no-mixed-spaces-and-tabs': ['error', 'smart-tabs'],
			},
		},
	];
}
