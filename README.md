# photo-collection-viewer
A code challenge for Slack

## The Prompt
This exercise is meant to demonstrate your ability to:

- Access a public API and successfully retrieve data from it;
- Display that data on a page;
- Update the UI of a page without refreshing;
- Build a polished user experience you'd be proud to ship; and
- Do all of the above using only native JavaScript (no libraries such as jQuery, although CSS preprocessors are fine).

We'd like you to create a web page that shows a grid of photo thumbnails; when a thumbnail is clicked, the photo should be displayed in a lightbox view, with the ability to move to the next / previous photos and display the photo title. You can use any public API that returns photos; here are some ideas:

Flickr: https://www.flickr.com/services/api/flickr.photosets.getPhotos.html
Google Image Search: https://developers.google.com/custom-search/json-api/v1/overview
You can take up to a week to get this back to us, and feel free to use that entire time if needed.

This exercise is very important in assessing your technical fit, so make sure you're happy with the result and that it reflects your skills. Your submission should be something you would be proud to submit on the job. It should run without errors in the latest versions of Chrome, Safari, Firefox and IE.

When you’re finished, please send us:

A URL where the working lightbox can be seen
Your source code as a zipped Git repository (create a local repo for your code and commit your files as you normally would; when the exercise is complete, zip your main directory, including the .git directory, and send it to us).

If you have any notes or instructions about the exercise, please include them in a README.md file in your repo. We go to great lengths to ensure the technical exercise is graded as blindly as possible. Where reasonable, we ask that you do not include your name anywhere in the URL, code, or documentation.

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

## Design Considerations
 - Initial MVP: In order to get a feel for the requirements I mocked up a quick and dirty prototype, see `mvp/index.html`   
   - This could be called "throw away" code, but it gave me a feel for working with the data and interactions and helped me think about how NOT to build the final product. I like to draw an initial sketch before I build.

 - MVC: I decided to stick to a familiar pattern and implement a classic MVC. I had recently worked with todomvc to compare frameworks and noticed their vanillajs project was about as excellent an example of an MVC in raw js as I would ever find. I needed an acceptable way for views to talk to the controller and decided to borrow the todomvc pattern for event binding, a tested solution.

 - Flickr: I decided on flickr since they have slightly easier documentation and higher quality content than google. In any case I came up with an API module that handles parsing internally and abstracts away anything I don't need. This could be swapped out later for google or any other photos API.

 - Pagination: Initially I had intended to only deal with a finite number of images in a single album but this seemed like an unworthy demonstration. I used flickr's search endpoint to get some larger paged results. Since the spec did not mention infinite scrolling or a displayed pagination index, I decided to implement a very minimal solution where I only load more images if the user attempts to click next from within the lightbox view on the last loaded image. I stored the page count and index on the model, so it would be straightforward to implement any representation in the UI or trigger updates in a different manner.

 - Grid system:  I started thinking about all the elegant grid layout systems I've seen in the last few years, and decided to keep it simple for the demo and just use inline-block divs. My thoughts on grid systems are that they are generally more maintenance than convenience. For a production app I might use something like neat grid or gridle, but these have more overhead than the rest of my app combined so I decided to keep the demo simple, since implementing someones grid system just proves I can install software. I avoided issues with aspect ratio variations and just used flickr's square thumbnails, since that's what they're there for.

 - Build: I've worked with Google closure in the past so this was a quick decision. It offers code minification, obfuscation, validation and static type checking, which are all highly desirable goals. I made a nice easy build task that drops all the needed assets into

 - Code quality and testing: My first line of defense is eslint, I use it while developing to ensure indentation and basic syntactical correctness. Next, Google Closure's static typing allows me to be sure there are no compile time errors or warnings. The one downside of closure is that it's obfuscation can cause errors of you don't use string literals to describe keys in foreign objects. The upside is that it forces you to validate anything questionable and check for every property you attempt to access. Flickr could change the API and though my app might not function, it won't error. I tested manually to ensure this. Unit tests were a bonus so included the basic jasmine framework and wrote tests for the controller. If I were to keep working on this I would probably restructure the methods on my model and controller to improve testability.

 - Next steps: At this point in development, I would want to circle back with product and design on purpose, behavior, look and feel to determine how this is going to be integrated into an existing product or built out into a stand-alone app.

 Thank you!
