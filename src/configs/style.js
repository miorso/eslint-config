import eslintPluginPrettierRecommended from 'eslint-plugin-prettier/recommended';
import stylistic from '@stylistic/eslint-plugin';

/**
 * @typedef {Object} ESLintConfigStyleOptions
 * @property {boolean} [react=false] - Include JSX config for @stylistic.
 */

/** @type {ESLintConfigStyleOptions} */
const DEFAULT_OPTIONS = {
	react: false,
};

/**
 * Returns an ESLint config based on style rules.
 * @param {ESLintConfigStyleOptions} options - An object with booleans indicating which configs to include.
 * @returns {import('eslint').Linter.Config[]} The combined ESLint configuration.
 */
export function getConfig(options = {}) {
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
