(function (window) {
  'use strict';

  /**
   * @constructor
   * @param {Object} collection - instance
   * @param {Object} gridView - instance
   * @param {Object} lightBoxView - instance
   */
  var Controller = function (collection, gridView, lightBoxView) {
    this.collection = collection;
    this.gridView = gridView;
    this.lightBoxView = lightBoxView;
  };

  Controller.prototype.initialize = function () {
    var self = this;
    this.gridView.bind('thumbClicked', function (id) {
      self.lightBoxView.showLightbox(id);
    });
    this.lightBoxView.bind('prevClicked', function () {
      self._loadPrevious();
    });
    this.lightBoxView.bind('nextClicked', function () {
      self._loadNext();
    });
    this._loadThumbnails(function(){
      // console.log('controller initialized');
    });
  };

  /**
   * @param {function(Object)} callback
   */
  Controller.prototype._loadThumbnails = function (callback) {
    var self = this;
    this.collection.loadPhotos(function(photoIds) {
      self.gridView.generateThumbnailElements(photoIds);
      callback({});
    });
  };

  Controller.prototype._loadPrevious = function () {
    var index = this.collection.getIndexOfPhoto(this.lightBoxView.currentPhotoId);
    if (index > 0) {
      index--;
      var photo = this.collection.getPhotoAtIndex(index);
      this.lightBoxView.showLightbox(photo.id);
    }
  };

  Controller.prototype._loadNext = function () {
    var index = this.collection.getIndexOfPhoto(this.lightBoxView.currentPhotoId);
    if (index < this.collection.getSize() - 1) {
      index++;
      var photo = this.collection.getPhotoAtIndex(index);
      this.lightBoxView.showLightbox(photo.id);
    } else {
      var self = this;
      this._loadThumbnails(function(){
        self._loadNext();
      });
    }
  };

  // Export to window
  window.app = window.app || {};
  window.app.Controller = Controller;
})(window);
