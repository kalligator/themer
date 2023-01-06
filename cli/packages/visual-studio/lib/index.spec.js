const { render, renderInstructions } = require('./index');
const { colors } = require('../../colors-default');

describe('themer visual-studio theme generator', () => {
  it('should render valid theme files', async () => {
    const files = await Promise.all(render(colors));
    expect(files.length).toBe(2);
    files.forEach((file) => {
      expect(file.contents.toString('utf8')).toMatchSnapshot();
    });
  });
});

describe('renderInstructions', () => {
  it('should provide installation instructions', async () => {
    const files = await Promise.all(render(colors));
    const instructions = renderInstructions(files.map(({ name }) => name));
    expect(instructions).toMatchSnapshot();
  });
});
