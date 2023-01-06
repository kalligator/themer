const path = require('path'),
  { version } = require('../package.json');

const getPackageName = (theme) => `themer-${theme}-syntax`;
const getFilePath = (theme, filename) =>
  path.join(getPackageName(theme), filename);

const toColorSets = (colors) =>
  Object.entries(colors).map(([theme, colors]) => ({
    theme: theme,
    colors: colors,
  }));

const render = (colors) => {
  const colorSets = toColorSets(colors);
  return [
    ...renderPackageJsonFiles(colorSets),
    ...renderColorVariablesFiles(colorSets),
    ...renderSyntaxVariablesFiles(colorSets),
    ...renderIndexFiles(colorSets),
  ];
};

const renderPackageJsonFiles = (colorSets) =>
  colorSets.map((colorSet) =>
    Promise.resolve({
      name: getFilePath(colorSet.theme, 'package.json'),
      contents: Buffer.from(
        JSON.stringify(
          {
            name: getPackageName(colorSet.theme),
            theme: 'syntax',
            version: version,
            description: `${colorSet.theme} syntax theme, generated by themer`,
            keywords: ['themer', colorSet.theme, 'syntax', 'theme'],
            engines: {
              atom: '>=1.0.0 <2.0.0',
            },
          },
          null,
          2,
        ),
      ),
    }),
  );

const renderColorVariablesFiles = (colorSets) => {
  const getContents = (colors) =>
    Buffer.from(
      Object.entries(colors)
        .map(([name, value]) => `@${name}: ${value};`)
        .join('\n'),
    );
  return colorSets.map((colorSet) =>
    Promise.resolve({
      name: getFilePath(colorSet.theme, 'colors.less'),
      contents: getContents(colorSet.colors),
    }),
  );
};

const renderSyntaxVariablesFiles = (colorSets) =>
  colorSets.map((colorSet) =>
    Promise.resolve({
      name: getFilePath(colorSet.theme, 'syntax-variables.less'),
      contents: Buffer.from(`
        @import "colors";

        // General colors
        @syntax-text-color: @shade6;
        @syntax-cursor-color: @accent6;
        @syntax-selection-color: @shade1;
        @syntax-background-color: @shade0;

        // Guide colors
        @syntax-wrap-guide-color: @shade1;
        @syntax-indent-guide-color: @shade4;
        @syntax-invisible-character-color: @shade3;

        // For find and replace markers
        @syntax-result-marker-color: @shade5;
        @syntax-result-marker-color-selected: @accent2;

        // Gutter colors
        @syntax-gutter-text-color: @shade2;
        @syntax-gutter-text-color-selected: @syntax-gutter-text-color;
        @syntax-gutter-background-color: @shade0;
        @syntax-gutter-background-color-selected: @shade1;

        // For git diff info. i.e. in the gutter
        @syntax-color-renamed: @accent5;
        @syntax-color-added: @accent3;
        @syntax-color-modified: @accent2;
        @syntax-color-removed: @accent0;
      `),
    }),
  );

const renderIndexFiles = (colorSets) =>
  colorSets.map((colorSet) =>
    Promise.resolve({
      name: getFilePath(colorSet.theme, 'index.less'),
      contents: Buffer.from(`
        @import "syntax-variables";

        atom-text-editor {
          background-color: @syntax-background-color;
          color: @syntax-text-color;

          .wrap-guide {
            background-color: @syntax-wrap-guide-color;
          }

          .indent-guide {
            color: @syntax-indent-guide-color;
          }

          .invisible-character {
            color: @syntax-invisible-character-color;
          }

          .gutter {
            background-color: @syntax-gutter-background-color;
            color: @syntax-gutter-text-color;

            .line-number {
              &.cursor-line {
                background-color: @syntax-gutter-background-color-selected;
                color: @syntax-gutter-text-color-selected;
              }

              &.cursor-line-no-selection {
                color: @syntax-gutter-text-color-selected;
              }
            }
          }

          .gutter .line-number.folded,
          .gutter .line-number:after,
          .fold-marker:after {
            color: @shade6;
          }

          .invisible {
            color: @syntax-text-color;
          }

          .cursor {
            color: @syntax-cursor-color;
          }

          .selection .region {
            background-color: @syntax-selection-color;
          }
        }

        atom-text-editor .search-results .syntax--marker .region {
          background-color: transparent;
          border: 1px solid @syntax-result-marker-color;
        }

        atom-text-editor .search-results .syntax--marker.current-result .region {
          border: 1px solid @syntax-result-marker-color-selected;
        }

        // Syntax styles

        .syntax--comment {
          color: @shade2;
        }

        .syntax--keyword {
          color: @accent2;

          &.syntax--control {
            color: @accent5;
          }

          &.syntax--operator {
            color: @syntax-text-color;
          }

          &.syntax--other.syntax--special-method {
            color: @accent4;
          }

          &.syntax--other.syntax--unit {
            color: @accent3;
          }
        }

        .syntax--storage {
          color: @accent7;
        }

        .syntax--constant {
          color: @shade6;

          &.syntax--character.syntax--escape {
            color: @accent4;
          }

          &.syntax--numeric {
            color: @accent3;
          }

          &.syntax--other.syntax--color {
            color: @accent4;
          }

          &.syntax--other.syntax--symbol {
            color: @accent5;
          }
        }

        .syntax--variable {
          color: @shade6;

          &.syntax--interpolation {
            color: @accent1;
          }

          &.syntax--parameter.syntax--function {
            color: @syntax-text-color;
          }
        }

        .syntax--invalid.syntax--illegal {
          background-color: @accent0;
          color: @syntax-background-color;
        }

        .syntax--string {
          color: @accent3;

          &.syntax--regexp {
            color: @accent3;

            .syntax--source.syntax--ruby.syntax--embedded {
              color: @accent1;
            }
          }

          &.syntax--other.syntax--link {
            color: @accent5;
          }
        }

        .syntax--punctuation {
          &.syntax--definition {
            &.syntax--comment {
              color: @shade2;
            }

            &.syntax--string {
              color: @accent3;
            }

            &.syntax--variable,
            &.syntax--parameters,
            &.syntax--array {
              color: @syntax-text-color;
            }

            &.syntax--heading,
            &.syntax--identity {
              color: @accent5;
            }

            &.syntax--bold {
              color: @shade7;
              font-weight: bold;
            }

            &.syntax--italic {
              color: @accent7;
              font-style: italic;
            }
          }

          &.syntax--section.syntax--embedded {
            color: @accent0;
          }

        }

        .syntax--support {
          &.syntax--class {
            color: @accent1;
          }

          &.syntax--function  {
            color: @accent4;

            &.syntax--any-method {
              color: @accent5;
            }
          }
        }

        .syntax--entity {
          &.syntax--name.syntax--function {
            color: @accent5;
          }
          &.syntax--name.syntax--type {
            color: @accent1;
          }

          &.syntax--other.syntax--inherited-class {
            color: @accent4;
          }
          &.syntax--name.syntax--class, &.syntax--name.syntax--type.syntax--class {
            color: @accent1;
          }

          &.syntax--name.syntax--section {
            color: @accent5;
          }

          &.syntax--name.syntax--tag {
            color: @accent0;
          }

          &.syntax--other.syntax--attribute-name {
            color: @accent1;

            &.syntax--id {
              color: @accent5;
            }
          }
        }

        .syntax--meta {
          &.syntax--class {
            color: @accent1;
          }

          &.syntax--link {
            color: @accent5;
          }

          &.syntax--require {
            color: @accent6;
          }

          &.syntax--selector {
            color: @accent6;
          }

          &.syntax--separator {
            background-color: @shade4;
            color: @syntax-text-color;
          }
        }

        .syntax--none {
          color: @syntax-text-color;
        }

        .syntax--markup {
          &.syntax--bold {
            color: @shade7;
            font-weight: bold;
          }

          &.syntax--changed {
            color: @accent2;
          }

          &.syntax--deleted {
            color: @accent0;
          }

          &.syntax--italic {
            color: @accent7;
            font-style: italic;
          }

          &.syntax--heading .syntax--punctuation.syntax--definition.syntax--heading {
            color: @accent5;
          }

          &.syntax--inserted {
            color: @accent3;
          }

          &.syntax--list {
            color: @accent4;
          }

          &.syntax--quote {
            color: @accent1;
          }

          &.syntax--raw.syntax--inline {
            color: @accent1;
          }
        }

        .syntax--source.syntax--gfm .syntax--markup {
          -webkit-font-smoothing: auto;
          &.syntax--heading {
            color: @accent5;
          }
        }

        // Mini editor

        atom-text-editor[mini] .scroll-view {
          padding-left: 1px;
        }
      `),
    }),
  );

const renderInstructions = (paths) => {
  const packages = new Set(paths.map(path.dirname));
  return `
Use the \`apm link\` command to install the generated theme ${
    packages.size > 1 ? 'packages' : 'package'
  } to Atom:

${[...packages].map((pkg) => `    apm link '${pkg}'`).join('\n')}

Then open/reload Atom and select the desired theme in the list of available syntax themes.
  `;
};

module.exports = {
  render,
  renderInstructions,
};
