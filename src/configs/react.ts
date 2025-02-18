import pluginReact from 'eslint-plugin-react';
import globals from 'globals';
import jsxA11yPlugin from 'eslint-plugin-jsx-a11y';
import pluginReactHooks from 'eslint-plugin-react-hooks';
import pluginQuery from '@tanstack/eslint-plugin-query';
import { Linter } from 'eslint';

export default [
	{
		name: 'eslint-plugin-react/recommended',
		...pluginReact.configs.flat['recommended'],
		languageOptions: {
			...pluginReact.configs.flat['recommended']?.languageOptions,
			globals: {
				...globals.serviceworker,
			},
		},
	},
	{
		name: 'eslint-plugin-react/jsx-runtime',
		...pluginReact.configs.flat['jsx-runtime'],
		languageOptions: {
			...pluginReact.configs.flat['jsx-runtime']?.languageOptions,
			globals: {
				...globals.serviceworker,
			},
		},
	},
	{
		...jsxA11yPlugin.flatConfigs.recommended,
		languageOptions: {
			...jsxA11yPlugin.flatConfigs.recommended.languageOptions,
			globals: {
				...globals.serviceworker,
				...globals.browser,
			},
		},
	},
	{
		name: 'eslint-plugin-react-hooks/recommended',
		plugins: {
			'react-hooks': pluginReactHooks,
		},
		rules: { ...pluginReactHooks.configs.recommended.rules },
	},
	...pluginQuery.configs['flat/recommended'],
] satisfies Linter.Config[];
