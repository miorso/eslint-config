# `@miorso/eslint-config`

A shared and customizable ESLint configuration for consistent code quality and style across projects.

> ⚠️ **Requires ESLint 9 or later**

## Install

```sh
npm install --save-dev @miorso/eslint-config
```

## Configuration

The following table lists the available configuration options:

| Option       | Default | Description                                       |
| ------------ | ------- | ------------------------------------------------- |
| `core`       | `true`  | Enables core ESLint rules.                        |
| `javascript` | `true`  | Enables JavaScript-specific rules.                |
| `typescript` | `false` | Enables TypeScript support.                       |
| `style`      | `true`  | Enables code styling rules.                       |
| `react`      | `false` | Enables React-specific rules.                     |
| `quality`    | `true`  | Enables additional quality rules.                 |
| `vitest`     | `true`  | Enables support for the Vitest testing framework. |
| `playwright` | `false` | Enables support for the Playwright framework.     |

## Usage

Create an eslint.config.js file in your project and import the configuration:

### Basic Configuration

```javascript
import { getConfig } from '@miorso/eslint-config';

export default getConfig({});
```

### Custom Configuration

You can customize the configuration by passing an options object:

```javascript
import { getConfig } from '@miorso/eslint-config';

export default getConfig({
	core: true,
	javascript: true,
	typescript: true,
	style: true,
	react: true,
	quality: true,
	vitest: true,
	playwright: false,
});
```

### Extending the Configuration

If you need to modify specific ESLint rules while still using the shared base configuration, you can extend it
programmatically:

```javascript
import { getConfig } from '@miorso/eslint-config';

/** @type {import("eslint").Linter.Config[]} */
const config = [
	...getConfig({ typescript: true, react: true }),
	{
		rules: {
			'no-console': 'off',
		},
	},
];

export default config;
```

> 💡 For more details on ESLint rules and configuration,
> visit [ESLint's official documentation](https://eslint.org/docs/latest/).
