declare module '@eslint-community/eslint-plugin-eslint-comments/configs' {
	import type { Linter } from 'eslint';
	export = { recommended: Linter.Config };
}

declare module 'eslint-plugin-promise' {
	import type { Linter } from 'eslint';
	export = { configs: { 'flat/recommended': Linter.Config } };
}

declare module 'eslint-plugin-import' {
	import type { Linter } from 'eslint';
	export = { flatConfigs: { recommended: Linter.Config } };
}

declare module 'eslint-plugin-jsx-a11y' {
	import type { Linter } from 'eslint';
	export = { flatConfigs: { recommended: Linter.Config } };
}

declare module 'eslint-plugin-react-hooks' {
	import type { Linter } from 'eslint';
	export = { configs: { recommended: Linter.Config } };
}
