import sonarjsPlugin from 'eslint-plugin-sonarjs';
import commentsPlugin from '@eslint-community/eslint-plugin-eslint-comments/configs';
import pluginPromise from 'eslint-plugin-promise';
import importPlugin from 'eslint-plugin-import';
import eslintPluginUnicorn from 'eslint-plugin-unicorn';

/** @type {import('eslint').Linter.Config[]} */
export default [
	sonarjsPlugin.configs.recommended,
	commentsPlugin.recommended,
	eslintPluginUnicorn.configs['flat/recommended'],
	pluginPromise.configs['flat/recommended'],
	{
		name: 'promise/custom-rules',
		rules: {
			// Disallow nested then() or catch() statements
			'promise/no-nesting': 'error',
			// Disallow return statements in finally()
			'promise/no-return-in-finally': 'error',
			// Enforce the proper number of arguments are passed to Promise functions
			'promise/valid-params': 'error',
			// Discourages the use of promises inside callbacks
			'promise/no-promise-in-callback': 'error',
			// Discourages the use of callbacks inside promises
			'promise/no-callback-in-promise': 'error',
		},
	},
	importPlugin.flatConfigs.recommended,
	{
		name: 'import/custom-rules',
		rules: {
			// Prohibit default exports
			'import/no-default-export': 'error',
			// Prohibit no duplicated imports
			'import/no-duplicates': 'error',
			// Prohibit use of an exported name as the locally imported name of a default export
			'import/no-named-as-default': 'error',
			// Prohibit use of an exported name as a property on the default export
			'import/no-named-as-default-member': 'error',
		},
	},
	{
		name: 'import/custom-rules/off',
		files: ['eslint.config.js'],
		rules: {
			// Prohibit default exports
			'import/no-default-export': 'error',
		},
	},
];
