import tseslint from 'typescript-eslint';

export default tseslint.config({
	files: ['**/*.{ts,tsx}'],
	languageOptions: { parserOptions: { projectService: true, tsconfigRootDir: './' } },
	settings: { 'import/resolver': { typescript: { alwaysTryTypes: true, project: './tsconfig.json' } } },
	extends: [tseslint.configs.strictTypeChecked, tseslint.configs.stylisticTypeChecked],
});
