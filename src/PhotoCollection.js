(function (window) {
  'use strict';

  /**
   * @constructor
   */
  var PhotoCollection = function () {
    /* Ordered list of photo ids */
    this.photoIds = [];
    /* Metadata lookup */
    this.photoData = {};
    /* Current page in source */
    this.page = null;
    this.requestInProgress = false;
    /* Data source is Flickr, but could be swapped out with some other API source */
    this.flickr = new window.app.Flickr('3a8d51ed5ffae3db7993378f81f9aeef');
  };

   /**
    * Attempts to load more photos from flickr
    * Blocks simultaneous requests
    * @param {Function} callback
    */
  PhotoCollection.prototype.loadPhotos = function (callback) {
    if (this.requestInProgress) {
      return;
    }
    this.requestInProgress = true;
    if (this.page !== null) {
      this.page++;
    } else {
      // flickr treats page 0 and 1 the same
      this.page = 1;
    }
    var self = this;
    this.flickr.photosSearch('kitten', this.page, function(resp) {
      // console.log('photosSearch resp', resp)
      self.requestInProgress = false;
      var added = [];
      if (resp && resp.photoIds && resp.photoData) {
        resp.photoIds.forEach(function(id) {
          if (self.addPhoto(id, resp.photoData[id])) {
            added.push(id);
          }
        });
      }
      callback(added);
    });
  };

  /* Attempts to add a photo,
  returning true if it was added */
  PhotoCollection.prototype.addPhoto = function (id, data) {
    if (this.photoData[id]){
      return false;
    }
    this.photoIds.push(id);
    this.photoData[id] = data;
    return true;
  };

  PhotoCollection.prototype.getPhoto = function (id) {
    return this.photoData[id];
  };

  PhotoCollection.prototype.getPhotoAtIndex = function (index) {
    return this.photoData[this.photoIds[index]];
  };

  PhotoCollection.prototype.getSize = function () {
    return this.photoIds.length;
  };

  PhotoCollection.prototype.getIndexOfPhoto = function (id) {
    return this.photoIds.indexOf(id);
  };

  window.app = window.app || {};
  window.app.PhotoCollection = PhotoCollection;
})(window);
