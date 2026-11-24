# Supported icon and image formats

This article describes which image formats the Remote supports for icons and background images, the exact sizes
and file size limits, how many images you can upload, and how to prepare your images so they look their best.

It applies to images that you upload in the web-configurator (Resources) or that an integration driver provides.

## At a glance

| Image type       | Formats       | Size                                                | Maximum file size | Maximum number of images |
|------------------|---------------|-----------------------------------------------------|-------------------|--------------------------|
| Icon             | PNG, JPG, SVG | PNG and JPG: exactly 90 x 90 pixels. SVG: see below | 32 KB             | 1000                     |
| TV channel icon  | PNG, JPG, SVG | PNG and JPG: exactly 90 x 90 pixels. SVG: see below | 32 KB             | 1000                     |
| Background image | PNG, JPG      | exactly 480 x 275, 480 x 800 or 480 x 854 pixels    | 1 MB              | 100                      |

> 💡 SVG icons are supported from beta firmware 2.13.0.

- Icons and TV channel icons are counted separately: you can upload 1000 of each.
- SVG icons have no pixel size. They scale to any size without losing sharpness. See [SVG icons](#svg-icons) below.

## PNG and JPG icons

- The image must be exactly **90 x 90 pixels**. Images with another size are rejected.
- The file extension must be `.png`, `.jpg` or `.jpeg`.
- The Remote lists a maximum file size of **32 KB**. A 90 x 90 pixel image is normally far smaller than that. Note
  that the 32 KB limit is only enforced for SVG files. For PNG and JPG files, the Remote rejects files larger than 1 MB.
- Use PNG for graphics with sharp edges or transparency, for example logos. Use JPG for photos.
- PNG and JPG icons are square. On a larger or wider button the icon keeps its square shape.

## Background images

- The image must have exactly one of these sizes, in PNG or JPG format:

  | Size             | Used for                                                      |
  |------------------|---------------------------------------------------------------|
  | 480 x 275 pixels | The header of a profile page                                  |
  | 480 x 800 pixels | The full screen of an activity or remote page on a Remote 3   |
  | 480 x 854 pixels | The full screen of an activity or remote page on a Remote Two |

- The file must not be larger than **1 MB**. You can upload up to **100** background images.
- SVG is not supported for background images.
- A profile page shows the top 480 x 275 part of a taller image.

### Background of activity and remote pages

> 💡 Background images in activity and remote pages are supported from beta firmware 2.14.0.

Each page of an activity or a remote can have its own background image. It covers the whole screen behind the buttons
of the page. Use the same image on several pages if the whole activity should have one background. For each page you
can set:

- **Scale**: the image always keeps its aspect ratio.
  - *Fill* (default): the image covers the whole screen. Parts outside the screen are cut off.
  - *Fit*: the whole image is visible. The remaining area is black.
  - *None*: the image is shown in its original size. Parts outside the screen are cut off, a remaining area is black.
- **Alignment**: top, center (default) or bottom. Decides which part of the image is kept when it's cut off, or where a
  black area remains.
- **Dimming**: from 0 % to 80 %, default 40 %. Darkens the image so that the buttons stay readable. Use a higher value
  for bright images.

An image made for the other model also works: for example, a 480 x 854 image on a Remote 3 with *Fill* loses 27 pixels
at the top and at the bottom.

> 💡 The web-configurator shows the background in its page preview, but the preview is only an approximation. The
> Remote can show the image a little differently, for example slightly brighter or darker, or with a slightly
> different part cut off. Check the result on your Remote.

## Scaling and cropping in the web-configurator

If you upload a PNG or JPG image with a different size, the web-configurator opens an editor to scale and crop the
image to the required size.

**We recommend preparing the image in a graphic tool instead and uploading an image with the exact size.** Automatic
scaling and cropping can make an image blurry or cut off parts of it. With a graphic tool you control the result:

1. Create a new image with the exact size from the table above, for example 90 x 90 pixels for an icon, or 480 x 800
   pixels for a full-screen background on a Remote 3.
2. Place and scale your artwork inside the image.
3. Export it as PNG or JPG.
4. Upload the exported image. If the size matches, no scaling or cropping is necessary.

> 💡 If your icon is a logo or a drawing, consider using an SVG icon instead. It is sharp on every button size.

## SVG icons

SVG is a vector format: the icon is drawn from shapes instead of pixels, so it stays sharp on small and large buttons.
SVG is supported for icons and TV channel icons, from beta firmware 2.13.0.

### Requirements

- Plain SVG file with the `.svg` extension. Compressed SVG files (`.svgz`) are not supported.
- The file must not be larger than **32 KB**.
- The SVG must define a **`viewBox`**. SVG files without a `viewBox` are rejected.
- The aspect ratio of the `viewBox` (width : height) can be anything **from 1:4 up to 4:1**. Square, wide and tall
  icons are all possible, for example a 2:1 flag or a 4:1 logo. Icons that are wider than 4:1 or taller than 1:4 are
  rejected.
- The SVG can contain at most **500 elements**. The root `svg` element counts as one element.
- Elements can be nested at most **16 levels** deep. The root `svg` element is the first level.
- If the root `svg` element has a `width` or `height`, it must be a positive number without a unit or with one of
  the units `px`, `pt`, `mm`, `cm`, `in`, `%`, `em` or `ex`. A fixed size (not `%`, `em` or `ex`) must not be larger
  than 1024 pixels (1 inch = 96 pixels).
- The SVG must be self-contained: it cannot link to other files or web addresses. Only references to elements of
  the same file, like `#gradient1`, are allowed.

### Icon shape on buttons

An SVG icon always keeps its own aspect ratio. It is never stretched or squashed.

- On a button page of an activity or remote, a wide icon fills the whole button width if the button is wide enough,
  for example a 2:1 flag on a 2 x 1 button.
- A square SVG icon on a wide button stays square and is centered.
- On entity tiles and in lists the icon is shown inside a square box. A wide icon is fitted to the width of the box.

The aspect ratio is taken from the `viewBox`. The `width` and `height` attributes of the SVG are not used for the
shape of the icon.

### Supported SVG features

The Remote draws SVG with a basic renderer. These features work well:

- Basic shapes and paths: rectangles, circles, ellipses, lines, polygons and paths
- Fill and stroke colors, opacity, dashed lines
- Linear and radial gradients
- Groups, transformations (move, rotate, scale), and reusing shapes (`use`)
- Simple styles, either in `style` attributes or in a `<style>` element with simple class, id and element selectors

### Features that are not supported

Some SVG features are rejected when you upload the file, because the Remote cannot draw them correctly or because
they are not safe. The web-configurator shows the reason.

- Text: convert text to outlines or paths in your graphic tool
- Embedded or linked images
- Masks, patterns and symbols
- Animations
- Scripts, and links to other files or web addresses
- Complex CSS in a `<style>` element: at-rules like `@media` or `@import`, selectors with `:` (like `:hover`) or `[`
  (attribute selectors), `!important`, `var()`, and backslash escape sequences

### Features that are accepted, but ignored

Some features are accepted, but the Remote does not draw them. The icon is shown without the effect, so it might look
different than in the web-configurator preview:

- Filter effects such as blur and drop shadows
- Clipping paths: the icon is shown without clipping
- Markers on lines, for example arrowheads: the line is drawn without them

Clipping paths and markers must be defined inside the `defs` section of the SVG, which graphic tools do by default.

If the SVG uses a `switch` element, the Remote shows the first alternative that matches. When an alternative
depends on the language, the result can depend on the language set on the Remote.

> [!NOTE]
> The icon preview in the web-configurator is drawn by your web browser, which supports all SVG features.
> The Remote supports fewer features, so the icon might look different on the Remote. Simple shapes, paths, gradients
> and basic styles work best. Always check your icon on the Remote after uploading it.

### Tips for exporting SVG files

- Convert text to outlines or paths before exporting.
- Use a simple export, this is sometimes called *Plain SVG*. Remove hidden layers, unused definitions and embedded images.
- Do not use effects like shadows or blur. Draw the effect with shapes and gradients instead.
- Keep the file small: simplify paths and reduce the number of points.

## Troubleshooting

| Message or problem                                                   | What to do                                                                       |
|----------------------------------------------------------------------|----------------------------------------------------------------------------------|
| "Invalid image size! Expected 90x90 ..."                             | Resize the PNG or JPG icon to exactly 90 x 90 pixels, or use the editor.         |
| "Invalid image size! Expected 480x275, 480x800 or 480x854 ..."       | Resize the background image to one of these sizes, or use the editor.            |
| "File too large ..."                                                 | Reduce the file size. The general limit is 1 MB, SVG icons are limited to 32 KB. |
| "Maximum number of ... resources reached"                            | Delete icons or background images you no longer use. See the limits above.       |
| "Insufficient storage to upload file!"                               | The Remote is low on free storage. Delete unused resources and try again.        |
| The upload fails because the resource already exists                 | A resource with the same file name exists. Rename the file or delete the old one. |
| "Compressed SVG files (.svgz) are not supported"                     | Save the icon as a plain `.svg` file.                                            |
| "This SVG ... has no viewBox"                                        | Add a `viewBox` in your graphic tool, or export the SVG again.                   |
| "This SVG ... its aspect ratio ... is outside 1:4 to 4:1"            | Change the drawing area so it is at most 4 times wider or taller.                |
| "The Remote rejected this SVG: ..."                                  | The reason names the element or feature that is not supported. Remove it and export again. |
| The icon looks different on the Remote than in the web-configurator  | The SVG uses a feature that is ignored by the Remote. Simplify it, see above.    |
| The icon is blurry                                                   | Use an SVG icon, or prepare the PNG with exactly 90 x 90 pixels yourself.        |
