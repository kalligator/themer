const { mapValues, capitalize } = require('lodash');
const xml = require('xml');
const Color = require('color');

const formatColors = (colors) =>
  mapValues(colors, (hex) => {
    const [r, g, b] = Color(hex)
      .rgb()
      .array()
      .map((c) => c / 255);
    return `rgba(${r}, ${g}, ${b}, 1.00)`;
  });

const renderTheme = (colorSet) =>
  Promise.resolve({
    name: `Themer ${capitalize(colorSet.name)}.bbColorScheme`,
    contents: Buffer.from(
      `
        <?xml version="1.0" encoding="UTF-8"?>
        <!DOCTYPE plist PUBLIC "-//Apple//DTD PLIST 1.0//EN" "http://www.apple.com/DTDs/PropertyList-1.0.dtd">
        ${xml(
          {
            plist: [
              { _attr: { version: '1.0' } },
              {
                dict: [
                  { key: 'BackgroundColor' },
                  { string: colorSet.colors.shade0 },
                  { key: 'DifferenceHighlightColor' },
                  { string: colorSet.colors.accent2 },
                  { key: 'InsertionPointLineHighlightColor' },
                  { string: colorSet.colors.shade1 },
                  { key: 'InvisibleOthersColor' },
                  { string: colorSet.colors.accent7 },
                  { key: 'InvisibleSpacesColor' },
                  { string: colorSet.colors.shade2 },
                  { key: 'PrimaryHighlightColor' },
                  { string: colorSet.colors.shade1 },
                  { key: 'SecondaryHighlightColor' },
                  { string: colorSet.colors.shade2 },
                  { key: 'SpellingColor' },
                  { string: colorSet.colors.accent0 },
                  { key: 'com.barebones.bblm.JavaScript.error' },
                  { string: colorSet.colors.accent0 },
                  { key: 'com.barebones.bblm.JavaScript.regexp' },
                  { string: colorSet.colors.accent7 },
                  { key: 'com.barebones.bblm.Pyth.decorator' },
                  { string: colorSet.colors.accent4 },
                  { key: 'com.barebones.bblm.Pyth.triple-string' },
                  { string: colorSet.colors.accent3 },
                  { key: 'com.barebones.bblm.TeX.math-string' },
                  { string: colorSet.colors.accent3 },
                  { key: 'com.barebones.bblm.TeX.param-content' },
                  { string: colorSet.colors.accent5 },
                  { key: 'com.barebones.bblm.TeX.verbatim' },
                  { string: colorSet.colors.accent2 },
                  { key: 'com.barebones.bblm.code' },
                  { string: colorSet.colors.shade7 },
                  { key: 'com.barebones.bblm.comment' },
                  { string: colorSet.colors.shade2 },
                  { key: 'com.barebones.bblm.css.color-spec' },
                  { string: colorSet.colors.shade7 },
                  { key: 'com.barebones.bblm.file-include' },
                  { string: colorSet.colors.accent6 },
                  { key: 'com.barebones.bblm.grep.charclass' },
                  { string: colorSet.colors.accent5 },
                  { key: 'com.barebones.bblm.grep.escape-sequence' },
                  { string: colorSet.colors.accent7 },
                  { key: 'com.barebones.bblm.grep.metachar' },
                  { string: colorSet.colors.accent4 },
                  { key: 'com.barebones.bblm.grep.metasequence' },
                  { string: colorSet.colors.accent3 },
                  { key: 'com.barebones.bblm.grep.posix-name' },
                  { string: colorSet.colors.accent2 },
                  { key: 'com.barebones.bblm.grep.repeat' },
                  { string: colorSet.colors.accent2 },
                  { key: 'com.barebones.bblm.grep.repeat-data' },
                  { string: colorSet.colors.accent2 },
                  { key: 'com.barebones.bblm.heredoc-string' },
                  { string: colorSet.colors.shade7 },
                  { key: 'com.barebones.bblm.html.anchor' },
                  { string: colorSet.colors.accent5 },
                  { key: 'com.barebones.bblm.html.attribute-name' },
                  { string: colorSet.colors.accent5 },
                  { key: 'com.barebones.bblm.html.attribute-value' },
                  { string: colorSet.colors.accent3 },
                  { key: 'com.barebones.bblm.html.image' },
                  { string: colorSet.colors.accent6 },
                  { key: 'com.barebones.bblm.indexed-symbol' },
                  { string: colorSet.colors.accent2 },
                  { key: 'com.barebones.bblm.keyword' },
                  { string: colorSet.colors.accent0 },
                  { key: 'com.barebones.bblm.markdown.Emph' },
                  { string: colorSet.colors.accent1 },
                  { key: 'com.barebones.bblm.markdown.HorizontalRule' },
                  { string: colorSet.colors.shade4 },
                  { key: 'com.barebones.bblm.markdown.ImageAltText' },
                  { string: colorSet.colors.accent6 },
                  { key: 'com.barebones.bblm.markdown.ImageId' },
                  { string: colorSet.colors.shade5 },
                  { key: 'com.barebones.bblm.markdown.InlineCode' },
                  { string: colorSet.colors.accent0 },
                  { key: 'com.barebones.bblm.markdown.InlineLinkText' },
                  { string: colorSet.colors.accent5 },
                  { key: 'com.barebones.bblm.markdown.Keyword' },
                  { string: colorSet.colors.accent2 },
                  { key: 'com.barebones.bblm.markdown.LinkDefId' },
                  { string: colorSet.colors.accent5 },
                  { key: 'com.barebones.bblm.markdown.LinkDefTitle' },
                  { string: colorSet.colors.accent5 },
                  { key: 'com.barebones.bblm.markdown.LinkDefUrl' },
                  { string: colorSet.colors.accent5 },
                  { key: 'com.barebones.bblm.markdown.ListItemMarker' },
                  { string: colorSet.colors.accent5 },
                  { key: 'com.barebones.bblm.markdown.Pre' },
                  { string: colorSet.colors.accent0 },
                  { key: 'com.barebones.bblm.markdown.QuoteMarker' },
                  { string: colorSet.colors.accent7 },
                  { key: 'com.barebones.bblm.markdown.QuotedContent' },
                  { string: colorSet.colors.shade7 },
                  { key: 'com.barebones.bblm.number' },
                  { string: colorSet.colors.accent5 },
                  { key: 'com.barebones.bblm.perl.generic-string' },
                  { string: colorSet.colors.accent3 },
                  { key: 'com.barebones.bblm.perl.outer-pod' },
                  { string: colorSet.colors.accent7 },
                  { key: 'com.barebones.bblm.perl.pre-generic-string' },
                  { string: colorSet.colors.accent3 },
                  { key: 'com.barebones.bblm.predefined-symbol' },
                  { string: colorSet.colors.accent2 },
                  { key: 'com.barebones.bblm.preprocessor' },
                  { string: colorSet.colors.accent2 },
                  { key: 'com.barebones.bblm.ruby.regexp' },
                  { string: colorSet.colors.accent7 },
                  { key: 'com.barebones.bblm.ruby.symbol' },
                  { string: colorSet.colors.accent2 },
                  { key: 'com.barebones.bblm.sgml-cdata' },
                  { string: colorSet.colors.shade7 },
                  { key: 'com.barebones.bblm.sgml-decl' },
                  { string: colorSet.colors.accent7 },
                  { key: 'com.barebones.bblm.sgml-entity' },
                  { string: colorSet.colors.accent5 },
                  { key: 'com.barebones.bblm.sgml-tag' },
                  { string: colorSet.colors.accent5 },
                  { key: 'com.barebones.bblm.string' },
                  { string: colorSet.colors.accent3 },
                  { key: 'com.barebones.bblm.variable' },
                  { string: colorSet.colors.accent7 },
                  { key: 'com.barebones.bblm.verilog-hdl.comment-1' },
                  { string: colorSet.colors.shade2 },
                  { key: 'com.barebones.bblm.verilog-hdl.comment-2' },
                  { string: colorSet.colors.shade3 },
                  { key: 'com.barebones.bblm.verilog-hdl.comment-3' },
                  { string: colorSet.colors.shade4 },
                  { key: 'com.barebones.bblm.verilog-hdl.input-type' },
                  { string: colorSet.colors.accent4 },
                  { key: 'com.barebones.bblm.verilog-hdl.output-type' },
                  { string: colorSet.colors.accent6 },
                  { key: 'com.barebones.bblm.verilog-hdl.register-type' },
                  { string: colorSet.colors.accent2 },
                  { key: 'com.barebones.bblm.verilog-hdl.wire-type' },
                  { string: colorSet.colors.accent1 },
                  { key: 'com.barebones.bblm.vhdl.comment-1' },
                  { string: colorSet.colors.shade2 },
                  { key: 'com.barebones.bblm.vhdl.comment-2' },
                  { string: colorSet.colors.shade3 },
                  { key: 'com.barebones.bblm.vhdl.comment-3' },
                  { string: colorSet.colors.shade4 },
                  { key: 'com.barebones.bblm.xml-empty' },
                  { string: colorSet.colors.accent0 },
                  { key: 'com.barebones.bblm.xml-pi' },
                  { string: colorSet.colors.accent0 },
                ],
              },
            ],
          },
          { indent: '  ' },
        )}
      `,
      'utf8',
    ),
  });

const render = (colors) =>
  Object.keys(colors)
    .map((name) => ({
      name,
      colors: formatColors(colors[name]),
    }))
    .map((colorSet) => renderTheme(colorSet));

const destination = '~/Library/Application Support/BBEdit/Color Schemes/';

const renderInstructions = (paths) => `
Copy (or symlink) the files to \`${destination}\`:

${paths.map((p) => `    cp '${p}' '${destination}'`).join('\n')}
`;

module.exports = { render, renderInstructions };
