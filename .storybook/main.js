const path = require('path')

module.exports = {
  core: {
    builder: 'webpack5',
  },
  stories: ['../src/**/__stories__/*.stories.mdx'],
  addons: [
    '@storybook/addon-docs',
    '@storybook/addon-links',
    '@storybook/addon-essentials',
  ],
  webpackFinal: config => {
    const cwd = process.cwd()

    // TODO: remove when storybook supports emotion 11
    config.resolve.alias = {
      ...config.resolve.alias,
      '@emotion/core': path.join(cwd, 'node_modules', '@emotion', 'react'),
      '@emotion/styled': path.join(cwd, 'node_modules', '@emotion', 'styled'),
      '@emotion/styled-base': path.join(
        cwd,
        'node_modules',
        '@emotion',
        'styled',
      ),
      'emotion-theming': path.join(cwd, 'node_modules', '@emotion', 'react'),
    }

    return config
  },
}
