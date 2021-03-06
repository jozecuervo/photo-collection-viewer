(function (window) {
  'use strict';

  /**
   * @constructor
   * @param {Object} collection - data model
   */
  var LightBoxView = function (collection) {
    this.collection = collection;
    this.currentPhotoId = null;
    this.lightboxEl = document.getElementById('lightbox');
    this.lightboximgEl = document.getElementById('lightboximg');
    this.lightboxtitleEl = document.getElementById('lightboxtitle');
    this.prevEl = document.getElementById('prev');
    this.nextEl = document.getElementById('next');
    var closeEl = document.getElementById('close');
    var self = this;
    closeEl.addEventListener('click', function () {
      self.hideLightbox();
    });
  };

  /**
   * @param {string} eventName
   * @param {Function} handler
   */
  LightBoxView.prototype.bind = function (eventName, handler) {
    var self = this;
    if (eventName === 'prevClicked') {
      self.prevEl.addEventListener('click', function () {
        handler();
      }, true);
    } else if (eventName === 'nextClicked'){
      self.nextEl.addEventListener('click', function () {
        handler();
      }, true);
    }
  };

  /**
   * showLightbox - shows lightbox dom element, updates content
   *
   * @param  {string} id - id of photo in collection
   */
  LightBoxView.prototype.showLightbox = function (id) {
    this.currentPhotoId = id;
    var photo = this.collection.getPhoto(id);
    this.lightboximgEl.setAttribute('src', photo.photoURL);
    this.lightboxtitleEl.innerHTML = photo.title;
    this.lightboxEl.style.display = '';
  };

  /**
   * hideLightbox - hides element
   */
  LightBoxView.prototype.hideLightbox = function () {
    this.lightboxEl.style.display = 'none';
  };

  window.app = window.app || {};
  window.app.LightBoxView = LightBoxView;
}(window));
