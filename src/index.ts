import core from '@/configs/core';
import typescript from '@/configs/typescript';
import javascript from '@/configs/javascript';
import { getConfig as getStyleConfig } from '@/configs/style';
import react from '@/configs/react';
import quality from '@/configs/quality';
import { getConfig as getTestingConfig } from '@/configs/testing';
import { Linter } from 'eslint';

type ESLintConfigOptions = {
	core: boolean;
	javascript: boolean;
	typescript: boolean;
	style: boolean;
	react: boolean;
	quality: boolean;
	vitest: boolean;
	playwright: boolean;
};

const configFiles: Record<Exclude<keyof ESLintConfigOptions, 'style' | 'vitest' | 'playwright'>, any> = {
	core,
	javascript,
	typescript,
	react,
	quality,
};

const DEFAULT_OPTIONS = {
	core: true,
	javascript: true,
	typescript: false,
	style: true,
	react: false,
	quality: true,
	vitest: true,
	playwright: false,
} as const satisfies ESLintConfigOptions;

export function getConfig(options: Partial<ESLintConfigOptions>): Linter.Config[] {
	const mergedOptions: ESLintConfigOptions = { ...DEFAULT_OPTIONS, ...options };

	const configs = Object.entries(configFiles)
		.filter(([key]) => mergedOptions[key as keyof ESLintConfigOptions])
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
