"use strict";
var Embed = (function () {
    function Embed(iframe) {
        var _this = this;
        var _a;
        if (!iframe || !((_a = iframe === null || iframe === void 0 ? void 0 : iframe.contentWindow) === null || _a === void 0 ? void 0 : _a.postMessage)) {
            throw new TypeError('Parameter must be a HTMLIFrameElement!');
        }
        var options = {
            iframe: iframe,
            iframeOrigin: iframe.src.split('/').slice(0, 3).join('/')
        };
        this.options = options;
        console.log('ICEmbed initialized with options', this.options);
        window.addEventListener('message', function (event) { _this.receiveMessage(event); }, false);
    }
    Embed.prototype.assertAllowedOrigin = function (origin) {
        if (origin !== this.options.iframeOrigin) {
            throw new Error('Discarding incoming message; untrusted event origin.');
        }
    };
    Embed.prototype.dispatchEvent = function (name, data) {
        console.log('dispatchEvent', name, data);
        this.options.iframe.dispatchEvent(new window.CustomEvent(name, { detail: data }));
    };
    Embed.prototype.receiveMessage = function (event) {
        console.log('receiveMessage', event);
        this.assertAllowedOrigin(event.origin);
        this.dispatchEvent(event.data.name, event.data);
    };
    Embed.prototype.postMessage = function (data) {
        console.log('postMessage', data, this.options.iframeOrigin);
        this.options.iframe.contentWindow.postMessage(data, this.options.iframeOrigin);
    };
    Embed.prototype.params = function () {
        var parts = this.options.iframe.src.split('#');
        if (parts.length === 1) {
            return {};
        }
        var hash = parts[1];
        var pairs = hash.split('&');
        var returnObj = {};
        for (var i = 0; i < pairs.length; i++) {
            var pair = pairs[i].split('=');
            var key = decodeURIComponent(pair[0]);
            var value = decodeURIComponent(pair[1]);
            returnObj[key] = value;
        }
        return returnObj;
    };
    Embed.prototype.changeScene = function (sceneId, ath, atv) {
        if (typeof ath === 'string') {
            ath = parseFloat(ath);
        }
        else if (typeof ath !== 'number') {
            throw new TypeError('ath must be number or string');
        }
        if (typeof atv === 'string') {
            atv = parseFloat(atv);
        }
        else if (typeof atv !== 'number') {
            throw new TypeError('atv must be number or string');
        }
        var message = {
            name: 'changeScene',
            sceneId: sceneId,
            ath: ath,
            atv: atv
        };
        this.postMessage(message);
    };
    return Embed;
}());
module.exports = Embed;
