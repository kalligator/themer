const path = require('path');
const { capitalize, mapValues } = require('lodash');
const Color = require('color');
const { version } = require('../package.json');

const rgbColorSet = (colors) =>
  mapValues(colors, (hex) => Color(hex).rgb().array());

const hslColorSet = (colors) =>
  mapValues(colors, (hex) => Color(hex).hsl().array());

const themeName = (colorSet) => `Themer ${colorSet.name}`;
const themeDirectory = themeName;

const renderManifest = (colorSet) => {
  return Promise.resolve({
    name: path.join(themeDirectory(colorSet), 'manifest.json'),
    contents: Buffer.from(
      JSON.stringify(
        {
          version,
          manifest_version: 2,
          name: themeName(colorSet),
          theme: {
            colors: {
              bookmark_text: colorSet.rgbColors.shade7,
              frame: colorSet.isDark
                ? colorSet.rgbColors.shade0
                : colorSet.rgbColors.shade1,
              frame_inactive: colorSet.isDark
                ? colorSet.rgbColors.shade1
                : colorSet.rgbColors.shade0,
              icons_attention: colorSet.rgbColors.shade7,
              icons: colorSet.rgbColors.shade7,
              ntp_background: colorSet.isDark
                ? colorSet.rgbColors.shade1
                : colorSet.rgbColors.shade0,
              ntp_text: colorSet.rgbColors.shade7,
              popup_highlight_text: colorSet.rgbColors.shade2,
              popup_highlight: colorSet.rgbColors.shade6,
              toolbar_field_highlight_text: colorSet.rgbColors.shade2,
              popup_border: colorSet.isDark
                ? colorSet.rgbColors.shade1
                : colorSet.rgbColors.shade0,
              popup_text: colorSet.rgbColors.shade7,
              popup: colorSet.isDark
                ? colorSet.rgbColors.shade1
                : colorSet.rgbColors.shade0,
              sidebar_border: colorSet.isDark
                ? colorSet.rgbColors.shade1
                : colorSet.rgbColors.shade0,
              sidebar_highlight_text: colorSet.rgbColors.shade6,
              sidebar_highlight: colorSet.rgbColors.shade2,
              sidebar_text: colorSet.rgbColors.shade6,
              sidebar: colorSet.isDark
                ? colorSet.rgbColors.shade1
                : colorSet.rgbColors.shade0,
              tab_background_text: colorSet.rgbColors.shade7,
              tab_loading: colorSet.rgbColors.shade7,
              tab_text: colorSet.rgbColors.shade7,
              toolbar_bottom_separator: colorSet.isDark
                ? colorSet.rgbColors.shade1
                : colorSet.rgbColors.shade0,
              toolbar_field_border: colorSet.isDark
                ? colorSet.rgbColors.shade1
                : colorSet.rgbColors.shade0,
              toolbar_field_separator: colorSet.isDark
                ? colorSet.rgbColors.shade1
                : colorSet.rgbColors.shade0,
              toolbar_field_text_focus: colorSet.rgbColors.shade7,
              toolbar_field_text: colorSet.rgbColors.shade7,
              toolbar_field: colorSet.isDark
                ? colorSet.rgbColors.shade1
                : colorSet.rgbColors.shade0,
              toolbar_field_border_focus: colorSet.rgbColors.shade2,
              toolbar: colorSet.isDark
                ? colorSet.rgbColors.shade1
                : colorSet.rgbColors.shade0,
            },
          },
        },
        null,
        2,
      ),
      'utf8',
    ),
  });
};

const render = (colors) => {
  const colorSets = Object.keys(colors).map((key) => ({
    name: capitalize(key),
    rgbColors: rgbColorSet(colors[key]),
    hslColors: hslColorSet(colors[key]),
    isDark: key === 'dark',
  }));
  return colorSets.map((colorSet) => renderManifest(colorSet));
};

const renderInstructions = (paths) => {
  const directories = new Set(paths.map(path.dirname));
  return `
To use the generated extension package, the code will need to be packaged up and signed by Mozilla.

To package the code in preparation for submission, the \`web-ext\` tool can be used:

    npx web-ext build --source-dir ${[...directories]
      .map((dir) => `'${dir}'`)
      .join(' # or ')}

Then the package can be submitted to Mozilla for review in the [Add-on Developer Hub](https://addons.mozilla.org/en-US/developers/addon/submit/distribution).

Learn more about Firefox themes from [extensionworkshop.com](https://extensionworkshop.com/documentation/themes/)

To theme Firefox without the need to create a developer account and go through the extension review process, see themer's integration with [Firefox Color](https://color.firefox.com).
  `;
};

module.exports = { render, renderInstructions };
