/**
 * Static Library to work with element's style, dimension, basic animation
 *
 * @author Evgeniy Dubskiy
 *
 */
(function(exports, undefined) {
    var Utils = exports.Utils || {};
    Utils.css = {
        getStyle: function(elem, name) {
            if (elem.style[name]) {
                return elem.style[name];
            } else if (elem.currentStyle) { // Try get IE property
                return elem.currentStyle[name];
            } else if (document.defaultView && document.defaultView.getComputedStyle) { // W3C's method
                // It uses traditional text-align rules instead textAlign
                name = name.replace(/([A-Z])/g, "-$1");
                name = name.toLowerCase();

                // Get the style object and get prop value
                var s = document.defaultView.getComputedStyle(elem, ''); // FF 3.6 compatibility
                return s && s.getPropertyValue(name);
            }
            // some kind of UFO happened :(
            return null;
        },

        /**
         * Finds the Left position of an element
         * to the entire document
         *
         * @param elem
         * @returns {Number}
         */
        pageX: function(elem) {
            return elem.offsetParent ?

                // If we can go up, add the current offset and do the recurse
                elem.offsetLeft + Utils.css.pageX(elem.offsetParent) :

                // Otherwise, return current offset
                elem.offsetLeft;
        },

        /**
         * Finds the Top position of an element
         * to the entire document
         *
         * @param elem
         * @returns {Number}
         */
        pageY: function(elem) {
            return elem.offsetParent ?

                // If we can go up, add the current offset and do the recurse
                elem.offsetTop + Utils.css.pageX(elem.offsetParent) :

                // Otherwise, return current offset
                elem.offsetTop;
        },

        /**
         * Finds the Horizontal position of an element within its parent
         *
         * @param elem
         * @returns {Number}
         */
        parentX: function(elem) {
            return elem.offsetParent === elem.parentNode ?

                elem.offsetLeft :

                // Otherwise, find the positions relative to the document
                // for both element and its parent
                Utils.css.pageX(elem) - Utils.css.pageX(elem.parentNode);
        },

        /**
         * Finds the Vertical position of an element within its parent
         *
         * @param elem
         * @returns {Number}
         */
        parentY: function(elem) {
            return elem.offsetParent === elem.parentNode ?

                elem.offsetTop :

                // Otherwise, find the positions relative to the document
                // for both element and its parent
                Utils.css.pageY(elem) - Utils.css.pageY(elem.parentNode);
        },

        /**
         * Find out 'X' position of an element relative to its CSS container
         * (element can be contained within one element but be positioned relative the other element)
         *
         * @param elem
         * @returns {Number|NaN}
         */
        posX: function(elem) {
            return elem && parseInt(Utils.css.getStyle(elem, 'left'), 10);
        },

        /**
         * Find out 'Y' position of an element relative to its CSS container
         * (element can be contained within one element but be positioned relative the other element)
         *
         * @param elem
         * @returns {Number|NaN}
         */
        posY: function(elem) {
            return elem && parseInt(Utils.css.getStyle(elem, 'top'), 10);
        },

        /**
         * Sets element's horizontal postion
         *
         * @param elem
         * @param pos
         */
        setX: function(elem, pos) {
            elem.style.left = parseInt(pos, 10) + 'px';
        },

        /**
         * Sets element's vertical postion
         *
         * @param elem
         * @param pos
         */
        setY: function(elem, pos) {
            elem.style.top = parseInt(pos, 10) + 'px';
        },

        /**
         * Get the current height of the element using computed styles
         * Note: element can have predefined height or can be hidden.
         * In this case this function won't work
         *
         * @param elem
         * @returns {Number|NaN}
         */
        getHeight: function(elem) {
            return parseInt(Utils.css.getStyle(elem, 'height'), 10);
        },

        /**
         * Get the current width of the element using computed styles
         * Note: element can have predefined width or can be hidden.
         * In this case this function won't work
         *
         * @param elem
         * @returns {Number|NaN}
         */
        getWidth: function(elem) {
            return parseInt(Utils.css.getStyle(elem, 'width'), 10);
        },

        /**
         * Reset styles with given, remember old ones and return them
         * @param elem
         * @param {Object} props
         * @returns {Object}
         */
        resetCss: function(elem, props) {
            var old = {};
            for (var prop in props) {
                if (props.hasOwnProperty(prop)) {
                    // Remember old styles
                    old[prop] = elem.style[prop];

                    // Set new styles
                    elem.style[prop] = props[prop];
                }
            }
            return old;
        },

        /**
         * Restores element's styles with given
         *
         * @param elem
         * @param {Object} props
         */
        restoreCss: function(elem, props) {
            for (var prop in props) {
                // Restoring styles
                elem.style[prop] = props[prop];
            }
        },

        /**
         * Gets the full possible height of the element
         * (even if it is non displayed)
         *
         * @param elem
         * @returns {Number|NaN}
         */
        getFullHeight: function(elem) {
            // if the element is displayed offsetHeight will probably work
            // otherwise we can get computed height and will be fine
            if (Utils.css.getStyle(elem, 'style') !== 'none') {
                return elem.offsetHeight || Utils.css.getHeight(elem);
            }

            // Otherwise display is set to none and we have to reset css to get height
            var oldCss = Utils.css.resetCss(elem, {
                display: '',
                visibility: 'hidden',
                position: 'absolute'
            });

            // Now get the full height of the element using clientHeight or getHeight
            var elemHeight = elem.clientHeight || Utils.css.getHeight(elem);

            // Finally - restore css
            Utils.css.restoreCss(elem, oldCss);

            return elemHeight;
        },

        /**
         * Gets the full possible width of the element
         * (even if it is non displayed)
         *
         * @param elem
         * @returns {Number|NaN}
         */
        getFullWidth: function(elem) {
            // if the element is displayed offsetWidth will probably work
            // otherwise we can get computed Width and will be fine
            if (Utils.css.getStyle(elem, 'style') !== 'none') {
                return elem.offsetWidth || Utils.css.getWidth(elem);
            }

            // Otherwise display is set to none and we have to reset css to get Width
            var oldCss = Utils.css.resetCss(elem, {
                display: '',
                visibility: 'hidden',
                position: 'absolute'
            });

            // Now get the full Width of the element using clientWidth or getWidth
            var elemWidth = elem.clientWidth || Utils.css.getWidth(elem);

            // Finally - restore css
            Utils.css.restoreCss(elem, oldCss);

            return elemWidth;
        },

        /**
         * Hides and element, remembers previous display property
         *
         * @param elem
         */
        hide: function(elem) {
            // get the current display value
            var prevDisplay = Utils.css.getStyle(elem, 'display');
            if (prevDisplay !== 'none') {
                // remember the previous display property
                elem.prevDisplay = prevDisplay;
                // set the new one
                elem.style.display = 'none';
            }
        },

        /**
         * Shows and element, remembers previous display property
         *
         * @param elem
         */
        show: function(elem) {
            // get the current display value
            var prevDisplay = Utils.css.getStyle(elem, 'display');
            if (prevDisplay === 'none') {
                // remember the previous display property
                elem.prevDisplay = prevDisplay;
                // set the new one
                elem.style.display = '';
            }
        },

        /**
         * Sets the opacity for given element
         *
         * @param elem
         * @param {int} level range (0 .. 100)
         */
        setOpacity: function(elem, level) {
            // If property filters exist then we are dealing with IE
            // and simply set alpha opacity
            if (elem.filters) {
                elem.style.filters = 'alpha(opacity=' + level + ')';
            }
            // Otherwise use W3C opacity property
            else {
                elem.style.opacity = level / 100;
            }
        },

        /**
         * Slides In element from height of 0px to full element's height
         *
         * @param elem
         */
        slideIn: function(elem) {
            // Start slide down at 0px
            elem.style.height = '0px';

            Utils.css.show(elem);

            var elemHeight = Utils.css.getFullHeight(elem);

            // We are doing 20 frames animation with delay over one second
            for (var i = 0; i < 100; i += 5) {
                (function(frameId) {
                    setTimeout(function() {
                       elem.style.height = ((frameId / 100) * elemHeight) + 'px';
                    }, (frameId + 1) * 10);
                }(i));
            }
        },

        /**
         * Fades In element from completely transparent to fully opaque
         *
         * @param elem
         */
        fadeIn: function(elem) {
            // Set elem opacity to 0
            Utils.css.setOpacity(elem , 0);

            Utils.css.show(elem);

            // We are doing 20 frames animation with delay over one second
            for (var i = 0; i < 100; i += 5) {
                (function(frameId) {
                    setTimeout(function() {
                        Utils.css.setOpacity(elem, frameId);
                    }, (frameId + 1) * 10);
                }(i));
            }
        },

        /**
         * Get 'X' position of cursor relative to entire webpage
         *
         * @param {object} e Event
         * @returns {number}
         */
        getCursorX: function(e) {
            // Normalize event object
            e = e || window.event;

            // Check for non-IE position, then the IE position
            return e.pageX || e.clientX + document.body.scrollLeft;
        },

        /**
         * Get 'Y' position of cursor relative to entire webpage
         *
         * @param {object} e Event
         * @returns {number}
         */
        getCursorY: function(e) {
            // Normalize event object
            e = e || window.event;

            // Check for non-IE position, then the IE position
            return e.pageY || e.clientY + document.body.scrollTop;
        },

        /**
         * Get the 'X' position of the mouse relative to current target element
         * in event object
         *
         * @param {object} e Event
         * @returns {number}
         */
        getCursorXWithinCurrentElement: function(e) {
            // Find  the elemnt offset
            return (e && e.layerX) || window.event.offsetX;
        },

        /**
         * Get the 'Y' position of the mouse relative to current target element
         * in event object
         *
         * @param {object} e Event
         * @returns {number}
         */
        getCursorYWithinCurrentElement: function(e) {
            // Find  the elemnt offset
            return (e && e.layerY) || window.event.offsetY;
        }
    };

    exports.Utils.css = Utils.css;

}(this));