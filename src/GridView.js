(function (window) {
  'use strict';

  /**
   * @constructor
   * @param {Object} collection - data model
   */
  var GridView = function (collection) {
    this.collection = collection;
    this.gridEl = document.getElementById('grid');
    this.$thumbnail = window.qs('.thumbnail');
  };

  /**
   * @param {string} eventName
   * @param {Function} handler
   */
  GridView.prototype.bind = function (eventName, handler) {
    var self = this;
    if (eventName === 'thumbClicked') {
      window.$on(self.gridEl, 'click', function (evt) {
        self._handleClick(evt, handler);
      });
    }
  };

  /**
   * @param {Array} photoIds - photo ids to generate elements for in order
   */
  GridView.prototype.generateThumbnailElements = function (photoIds) {
    var self = this;
    photoIds.forEach(function(id) {
      var photo = self.collection.getPhoto(id);
      var thumb = self._generateThumbnailElement(id, photo.thumbURL);
      //TODO: reduce dom writes
      self.gridEl.appendChild(thumb);
    });
  };

  /**
   * @param {string} id - image id
   * @param {string} imgsrc - image source
   */
  GridView.prototype._generateThumbnailElement = function (id, imgsrc) {
    var thumb = document.createElement('div');
    thumb.setAttribute('class', 'thumb');
    thumb.setAttribute('id', id);
    var img = document.createElement('img');
    img.setAttribute('src', imgsrc);
    thumb.appendChild(img);
    return thumb;
  };

  /**
   * @param {Event} evt - captured click event
   * @param {Function} handler - handler to call
   */
  GridView.prototype._handleClick = function (evt, handler) {
    if (evt.target.tagName === 'IMG') {
      // traverse upward to thumb
      var thumb = window.$parent(evt.target, 'div');
      handler(thumb.getAttribute('id'));
    } //else if (evt.target.tagName === 'DIV'){
      // TODO handle click on thumb div
    //}
  };

  window.app = window.app || {};
  window.app.GridView = GridView;
}(window));
