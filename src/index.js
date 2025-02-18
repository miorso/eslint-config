import core from './configs/core.js';
import typescript from './configs/typescript.js';
import javascript from './configs/javascript.js';
import { getConfig as getStyleConfig } from './configs/style.js';
import react from './configs/react.js';
import quality from './configs/quality.js';
import { getConfig as getTestingConfig } from './configs/testing.js';

/**
 * @typedef {Object} ESLintConfigOptions
 * @property {boolean} [core=true] - Include core config.
 * @property {boolean} [javascript=true] - Include JavaScript config.
 * @property {boolean} [typescript=false] - Include TypeScript config.
 * @property {boolean} [style=true] - Include styling rules.
 * @property {boolean} [react=false] - Include React-specific rules.
 * @property {boolean} [quality=true] - Include best practices.
 * @property {boolean} [vitest=true] - Enable Vitest rules.
 * @property {boolean} [playwright=false] - Enable Playwright rules.
 */

/** @type {Record<Exclude<keyof ESLintConfigOptions, 'style' | 'vitest' | 'playwright'>, any>} */
const configFiles = {
	core,
	javascript,
	typescript,
	react,
	quality,
};

/** @type {ESLintConfigOptions} */
const DEFAULT_OPTIONS = {
	core: true,
	javascript: true,
	typescript: false,
	style: true,
	react: false,
	quality: true,
	vitest: true,
	playwright: false,
};

/**
 * Returns an ESLint config based on enabled modules.
 * @param {Partial<ESLintConfigOptions>} options - An object with booleans indicating which configs to include.
 * @returns {import('eslint').Linter.Config[]} The combined ESLint configuration.
 */
export function getConfig(options = {}) {
	const mergedOptions = { ...DEFAULT_OPTIONS, ...options };

	const configs = Object.entries(configFiles)
		.filter(([key]) => mergedOptions[key])
		.flatMap(([, config]) => config);

	if (mergedOptions.style) {
		configs.push(...getStyleConfig({ react: mergedOptions.react }));
	}

	configs.push(
		...getTestingConfig({
			react: mergedOptions.react,
			vitest: mergedOptions.vitest,
			playwright: mergedOptions.playwright,
		}),
	);

	return configs;
}
