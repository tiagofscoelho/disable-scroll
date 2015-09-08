var disableScroll = {
    // spacebar: 32, pageup: 33, pagedown: 34, end: 35, home: 36
    // left: 37, up: 38, right: 39, down: 40
    options: {
        disableWheel: true,
        disableScrollbar: true,
        disableKeys: true,
        scrollEventKeys: [32, 33, 34, 35, 36, 37, 38, 39, 40]
    },
    element: document.body,
    lockToScrollPos: [0, 0],

    /**
     * Disable page Scroll
     * @external Node
     *
     * @param {external:Node} element - DOM Element, usually document.body
     * @param {object} options - Change the initial options
     */
    on: function (element, options) {
        this.element = element || document.body;
        this.options = this._extend(this.options, options);

        if (this.options.disableWheel) {
            document.addEventListener('mousewheel', this._handleWheel);
            document.addEventListener('DOMMouseScroll', this._handleWheel);
            document.addEventListener('touchmove', this._handleWheel);
        }

        if (this.options.disableScrollbar) {
            this.lockToScrollPos = [
                this.element.scrollLeft,
                this.element.scrollTop
            ];
            document.addEventListener('scroll', this._handleScrollbar.bind(this));
        }

        if (this.options.disableKeys) {
            document.addEventListener('keydown', this._handleKeydown.bind(this));
        }
    },

    /**
     * Re-enable page scroll
     */
    off: function () {
        document.removeEventListener('mousewheel', this._handleWheel);
        document.removeEventListener('DOMMouseScroll', this._handleWheel);
        document.removeEventListener('touchmove', this._handleWheel);
        document.removeEventListener('scroll', this._handleScrollbar.bind(this));
        document.removeEventListener('keydown', this._handleKeydown.bind(this));
    },

    _handleWheel: function (e) {
        e.preventDefault();
    },

    _handleScrollbar: function () {
        window.scrollTo(this.lockToScrollPos[0], this.lockToScrollPos[1]);
    },

    _handleKeydown: function (event) {
        for (var i = 0; i < this.options.scrollEventKeys.length; i++) {
            if (event.keyCode === this.options.scrollEventKeys[i]) {
                event.preventDefault();
                return false;
            }
        }
    },

    _extend: function (obj) {
        Object.keys(Array.prototype.slice(arguments, 1)).forEach(function (source) {
            for (var prop in source) {
                obj[prop] = source[prop];
            }
        });
        return obj;
    }
};

module.exports = disableScroll;