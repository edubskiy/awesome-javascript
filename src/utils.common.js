/**
 * Useful common Cross Browser JavaScript functions
 *
 * @author Evgeniy Dubskiy
 * @example:
 * var Person = {
 *     name: 'John'
 * };
 * function walk() {
 *     console.log(this.name + ' walks');
 * }
 * var walkingPerson = Utils.common.bind(walk, Person);
 * walkingPerson // => 'John walks'
 */
(function(exports, undefined) {
    var Utils = window.Utils || {};

    Utils.common = {
        /**
         * Bind context for the given function
         *
         * @example:
         * var Person = {
         *     name: 'John'
         * };
         * function walk() {
         *     console.log(this.name + ' walks');
         * }
         * var walkingPerson = Utils.bind(walk, Person);
         * walkingPerson // => 'John walks'
         *
         * @param {function} fn
         * @param {object} context
         * @return {function}
         */
        bind: function(fn, context) {
            var slice = [].slice,
                // Save arguments
                args = slice.call(arguments, 2, arguments.length);
            return function() {
                // Execute fn in the given 'context' joining saved and just passed arguments
                return fn.apply(context, [].concat(args, slice.call(arguments)));
            };
        },


        /**
         * Add inherited properties for object
         *
         * @param {object} properties - inheritable properties
         * @param {object} obj - inheritable object
         */
        include: function(properties, obj) {
            var included = properties.included;
            for(var name in properties) {
                obj.prototype[name] = properties[name];
            }
            if (included) included(obj);
        },

        /**
         * Add static properties for object
         *
         * @param {object} properties - extendable properties
         * @param {object} obj - extended object
         */
        extend: function(properties, obj) {
            var extended = properties.extended;
            for(var name in properties) {
                obj[name] = properties[name];
            }
            if (extended) extended(obj);
        },

        /**
         * Check if elem contains within array
         *
         * @param array
         * @param elem checking value
         * @returns {int}
         */
        inArray: function(array, elem) {
            var indexOf = [].indexOf;
            if (indexOf) {
                return indexOf.call(array, elem);
            }
            for ( var i = 0, length = array.length; i < length; i++ ) {
                if ( elem === array[ i ] ) {
                    return i;
                }
            }
            return -1;
        },

        /**
         * Creates new object and sets its prototype with given
         *
         * @param o inherited object
         * @returns {object}
         */
        create: function(o) {
            if (Object.create) {
                return Object.create(o);
            }
            function F(){}
            F.prototype = o;
            return new F();
        }
    };

    exports.Utils = Utils;

}(window));