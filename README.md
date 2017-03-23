# photo-collection-viewer
A code challenge to build a flickr photo viewer

- Access a public API and successfully retrieve data from it;
- Display that data on a page;
- Update the UI of a page without refreshing;
- Build a polished user experience you'd be proud to ship; and
- Do all of the above using only native JavaScript (no libraries such as jQuery, although CSS preprocessors are fine).

Create a web page that shows a grid of photo thumbnails; when a thumbnail is clicked, the photo should be displayed in a lightbox view, with the ability to move to the next / previous photos and display the photo title.

## Install
- `npm install`
- `which java` - make sure you have java runtime in your $PATH or export JAVA_HOME, closure requires java.

## Build
All assets will be compiled to `dist` directory
- `gulp js-compile` - to validate and minify using google closure compiler
- `gulp sass` - to preprocess sass and minify CSS
- `gulp template` - to transform and copy index template
- `gulp` - all of the above

## To run
 - Open the `index.html` in the `/dist` folder in some browser.

## Tests
 - Open `/test/SpecRunner.html`
