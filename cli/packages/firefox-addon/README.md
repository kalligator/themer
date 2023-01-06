# @themerdev/firefox-addon

A Firefox theme generator for [themer](https://github.com/themerdev/themer).

## Installation & usage

Install this module wherever you have `themer` installed:

    npm install @themerdev/firefox-addon

Then pass `@themerdev/firefox-addon` as a `-t` (`--template`) arg to `themer`:

    themer -c my-colors.js -t @themerdev/firefox-addon -o gen

Installation instructions for the generated theme(s) will be included in `<output dir>/README.md`.
