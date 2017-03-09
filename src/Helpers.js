/* Helpers borrowed from http://todomvc.com/examples/vanillajs/ */
/*global NodeList */
(function (window) {
  'use strict';

  // Find the element's parent with the given tag name:
  // $parent(qs('a'), 'div');
  window.$parent = function (element, tagName) {
    if (!element.parentNode) {
      return;
    }
    if (element.parentNode.tagName.toLowerCase() === tagName.toLowerCase()) {
      return element.parentNode;
    }
    return window.$parent(element.parentNode, tagName);
  };

})(window);
