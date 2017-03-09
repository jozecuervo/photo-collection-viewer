  /*global app, jasmine, describe, it, beforeEach, expect */

describe('controller', function () {
  'use strict';

  var subject, collection, gridView, lightboxView;

  var setUpModel = function (photos, currentIndex) {
    collection.loadPhotos.and.callFake(function (query, callback) {
      callback = callback || query;
      callback(photos);
    });

    collection.getIndexOfPhoto.and.callFake(function (id) {
      return(currentIndex);
    });

    collection.getPhotoAtIndex.and.callFake(function (index) {
      return({});
    });

    collection.getSize.and.callFake(function (index) {
      return(0);
    });
  };

  var createGridViewStub = function () {
    var eventRegistry = {};
    return {
      generateThumbnailElements: jasmine.createSpy('generateThumbnailElements'),
      thumbClicked: jasmine.createSpy('thumbClicked'),
      bind: function (event, handler) {
        eventRegistry[event] = handler;
      }
    };
  };

  var createLightboxViewStub = function () {
    var eventRegistry = {};
    return {
      showLightbox: jasmine.createSpy('showLightbox'),
      hideLightbox: jasmine.createSpy('hideLightbox'),
      bind: function (event, handler) {
        eventRegistry[event] = handler;
      }
    };
  };

  beforeEach(function () {
    collection = jasmine.createSpyObj('collection', ['loadPhotos', 'getIndexOfPhoto', 'getPhotoAtIndex','getSize']);
    gridView = createGridViewStub();
    lightboxView = createLightboxViewStub();
    subject = new app.Controller(collection, gridView, lightboxView);
  });

  it('should show thumbnails on start-up', function () {
    setUpModel({},0);
    subject.initialize('');
    expect(gridView.generateThumbnailElements).toHaveBeenCalled();
  });

  it('load prev does not load images below index 0', function () {
    setUpModel({},0);
    subject.initialize('');
    expect(gridView.generateThumbnailElements).toHaveBeenCalled();
    subject._loadPrevious();
    expect(lightboxView.showLightbox).not.toHaveBeenCalled();
  });

});
