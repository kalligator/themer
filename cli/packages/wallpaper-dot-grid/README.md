# @themerdev/wallpaper-dot-grid

A wallpaper template for [themer](https://github.com/themerdev/themer). Here is a preview rendered with [themer's default color set](https://github.com/themerdev/themer/tree/main/cli/packages/colors-default):

![desktop dark](https://cdn.jsdelivr.net/gh/themerdev/themer@6ff5f39dc25e23036f8d1f0b30f85a124abe743e/cli/packages/wallpaper-dot-grid/assets/themer-wallpaper-dot-grid-dark-2880x1800-2.png)

![desktop light](https://cdn.jsdelivr.net/gh/themerdev/themer@6ff5f39dc25e23036f8d1f0b30f85a124abe743e/cli/packages/wallpaper-dot-grid/assets/themer-wallpaper-dot-grid-light-2880x1800-1.png)

## Installation & usage

Install this module wherever you have `themer` installed:

    npm install @themerdev/wallpaper-dot-grid

Then pass `@themerdev/wallpaper-dot-grid` as a `-t` (`--template`) arg to `themer`:

    themer -c my-colors.js -t @themerdev/wallpaper-dot-grid -o gen

`@themerdev/wallpaper-dot-grid` will generate PNG wallpapers to the output directory (`gen/` in this example).

### Default resolutions

By default, `@themerdev/wallpaper-dot-grid` will output wallpapers at the following sizes:

- 2880 by 1800 (desktop)
- 750 by 1334 (device)

### Custom resolutions

`@themerdev/wallpaper-dot-grid` adds the following argument to `themer`:

    --themer-wallpaper-dot-grid-size

to which you would pass `<width>x<height>`. For example, to forego the default resolutions and generate two wallpapers, one 1024 by 768 and one 320 by 960:

    themer -c my-colors.js -t @themerdev/wallpaper-dot-grid --themer-wallpaper-dot-grid-size 1024x768 --themer-wallpaper-dot-grid-size 320x960 -o gen
