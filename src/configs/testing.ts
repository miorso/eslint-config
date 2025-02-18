import vitestPlugin from '@vitest/eslint-plugin';
import testingLibraryPlugin from 'eslint-plugin-testing-library';
import playwrightPlugin from 'eslint-plugin-playwright';
import { Linter } from 'eslint';

type ESLintConfigTestingOptions = {
	vitest: boolean;
	react: boolean;
	playwright: boolean;
};

const DEFAULT_OPTIONS = {
	vitest: true,
	react: false,
	playwright: false,
} as const satisfies ESLintConfigTestingOptions;

export function getConfig(options: Partial<ESLintConfigTestingOptions>): Linter.Config[] {
	const mergedOptions = {
		vitest: options.vitest ?? DEFAULT_OPTIONS.vitest,
		react: options.react ?? DEFAULT_OPTIONS.react,
		playwright: options.playwright ?? DEFAULT_OPTIONS.playwright,
	};

	const configs: Linter.Config[] = [];

	if (mergedOptions.vitest) {
		configs.push({
			name: '@vitest/recommended',
			files: ['*.test.{js,ts,jsx,tsx}'],
			...vitestPlugin.configs.recommended,
			settings: {
				vitest: { typecheck: true },
			},
		});
	}

	if (mergedOptions.react) {
		configs.push({
			name: 'testing-library/flat/react',
			files: ['*.test.{js,ts,jsx,tsx}'],
			...testingLibraryPlugin.configs['flat/react'],
		});
	}

	if (mergedOptions.playwright) {
		configs.push({
			name: 'playwright/flat/recommended',
			...playwrightPlugin.configs['flat/recommended'],
			files: ['*.spec.{js,ts,jsx,tsx}'],
		});
		configs.push({
			name: 'playwright/custom-rules',
			plugins: {
				playwright: playwrightPlugin,
			},
			rules: {
				...playwrightPlugin.configs['flat/recommended'].rules,
				// Enforce assertion to be made in a test body
				'playwright/expect-expect': 'error',
				// Enforces a maximum depth to nested describe calls
				'playwright/max-nested-describe': ['error', { max: 0 }],
				// Disallow commented out tests
				'playwright/no-commented-out-tests': 'error',
				// Disallow calling expect conditionally
				'playwright/no-conditional-expect': 'error',
				// Disallow conditional logic in tests
				'playwright/no-conditional-in-test': 'error',
				// Disallow duplicate setup and teardown hooks
				'playwright/no-duplicate-hooks': 'error',
				// Disallow usage of element handles
				'playwright/no-element-handle': 'error',
				// Disallow usage of page.$eval() and page.$$eval()
				'playwright/no-eval': 'error',
				// Disallow usage of the { force: true } option
				'playwright/no-force-option': 'error',
				// Disallow using getByTitle()
				'playwright/no-get-by-title': 'error',
				// Disallow nested test.step() methods
				'playwright/no-nested-step': 'error',
				// Disallow using page.pause()
				'playwright/no-page-pause': 'error',
				// Disallow usage of the .skip annotation
				'playwright/no-skipped-test': 'error',
				// Disallow unnecessary awaits for Playwright methods
				'playwright/no-useless-await': 'error',
				// Disallow usage of not matchers when a specific matcher exists
				'playwright/no-useless-not': 'error',
				// Disallow usage of page.waitForSelector()
				'playwright/no-wait-for-selector': 'error',
				// Disallow usage of page.waitForTimeout()
				'playwright/no-wait-for-timeout': 'error',
				// Suggest using the built-in comparison matchers
				'playwright/prefer-comparison-matcher': 'error',
				// Suggest using the built-in equality matchers
				'playwright/prefer-equality-matcher': 'error',
				// Prefer having hooks in a consistent order
				'playwright/prefer-hooks-in-order': 'error',
				// Suggest built-in locators over page.locator()
				'playwright/prefer-native-locators': 'error',
				// Suggest locators over page methods
				'playwright/prefer-locator': 'error',
				// Suggest using toStrictEqual()
				'playwright/prefer-strict-equal': 'error',
				// Suggest using toBe()
				'playwright/prefer-to-be': 'error',
				// Suggest using toContain()
				'playwright/prefer-to-contain': 'error',
				// Suggest using toHaveCount()
				'playwright/prefer-to-have-count': 'error',
				// Suggest using toHaveLength()
				'playwright/prefer-to-have-length': 'error',
				// Require assertions to use expect.soft()
				'playwright/require-soft-assertions': 'error',
				// Require a message for toThrow()
				'playwright/require-to-throw-message': 'error',
			},
		});
	}

	return configs;
}
