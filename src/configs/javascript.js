import pluginJs from '@eslint/js';

/** @type {import('eslint').Linter.Config[]} */
export default [
	{
		name: 'eslint/js/recommended',
		...pluginJs.configs.recommended,
	},
	{
		name: 'eslint/js/custom-rules',
		rules: {
			// Require absolute paths
			'no-restricted-imports': [
				'error',
				{
					patterns: [
						{
							group: ['./', '../'],
							message: 'Relative imports are not allowed. Use absolute paths instead.',
						},
					],
				},
			],
		},
	},
];
