/* globals app*/
(function (window) {
  'use strict';
  /**
   * @constructor
   */
  function PhotoApp () {
    var photoCollection = new window.app.PhotoCollection();
    var gridView = new window.app.GridView(photoCollection);
    var LightBoxView = new window.app.LightBoxView(photoCollection);
    this.controller = new window.app.Controller(photoCollection, gridView, LightBoxView);
  }
  PhotoApp.prototype.init = function(){
    this.controller.initialize();
  };
  var photoApp = new PhotoApp();

  window.addEventListener('load', function init() {
    photoApp.init();
  });

})(window);
