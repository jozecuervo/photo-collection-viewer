(function (window) {
  'use strict';

  /**
   * @constructor
   * @param {string} apiKey - api key to use for flickr requests
   */
  var Flickr  = function (apiKey) {
    this.apiKey = apiKey;
  };

  /** @constant {number} */
  Flickr.PER_PAGE = 48;

  /**
   * @param {string} keyword
   * @param {string} page
   * @param {function(Object)} callback
   */
  Flickr.prototype.photosSearch = function (keyword, page, callback) {
    var url =  'https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=' + this.apiKey + '&tags=' + keyword + '&format=json&nojsoncallback=1&per_page=' + Flickr.PER_PAGE + '&page=' + page;
    var request = new XMLHttpRequest();
    var self = this;
    var photoData = {};
    request.open('GET', url, true);
    request.onload = function() {
      if (request.status >= 200 && request.status < 400) {
        var responseData = JSON.parse(request.responseText);
        if (responseData['photos']){
          photoData = self._parseImageData(responseData['photos']);
        }
      }
      callback(photoData);
    };
    request.onerror = function () {
      callback(photoData);
    };
    request.send();
  };

  /** https://farm{farm-id}.staticflickr.com/{server-id}/{id}_{secret}_[mstzb].jpg
   * @private
   * @param {Number} farmId
   * @param {Number} serverId
   * @param {Number} id
   * @param {string} secret
   * @returns {string} url
   */
  Flickr.prototype._genImgThumbURL = function (farmId, serverId, id, secret) {
    var url = 'https://farm' + farmId + '.staticflickr.com/' + serverId + '/' + id + '_' + secret + '_s.jpg';
    return url;
  };

  /**  https://farm{farm-id}.staticflickr.com/{server-id}/{id}_{secret}.jpg
   * @private
   * @param {Number} farmId
   * @param {Number} serverId
   * @param {Number} id
   * @param {string} secret
   * @returns {string} url
   */
  Flickr.prototype._genImgURL = function (farmId, serverId, id, secret) {
    var url = 'https://farm' + farmId + '.staticflickr.com/' + serverId + '/' + id + '_' + secret + '.jpg';
    return url;
  };

  /**
   * @private
   * @param {Object} photos - response photos object from flickr
   * @returns {Object}
   */
  Flickr.prototype._parseImageData = function (photos) {
    var photoIds = [];
    var photoData = {};
    var page = 0;
    var pages = 0;
    if (photos['photo']) {
      page = photos['page'];
      pages = photos['pages'];
      var self = this;
      photos['photo'].forEach(function(photo) {
        var farm = photo['farm'];
        var server = photo['server'];
        var id = photo['id'];
        var secret = photo['secret'];
        if (farm &&  server && id && secret) {
          photoIds.push(id);
          var thumbURL = self._genImgThumbURL(farm, server, id, secret);
          var photoURL = self._genImgURL(farm, server, id, secret);
          photoData[id] = {
            id: id,
            thumbURL: thumbURL,
            photoURL: photoURL,
            title: photo['title']
          };
        }
      });
    }
    return {
      photoIds: photoIds,
      photoData: photoData,
      page: page,
      pages: pages
    };
  };
  window.app = window.app || {};
  window.app.Flickr = Flickr;
})(window);
