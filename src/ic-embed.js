/*!
 * ic-embed | https://github.com/intocities/ic-embed
 * Made by Into Cities | intocities.com
 * Released under the MIT License.
*/

(function () {
  'use strict'

  var ICEmbed = function (iframe) {
    // initialize BEGIN
    if (!iframe || !iframe.contentWindow) {
      throw Error('must give iframe!')
    }

    this.options = {
      iframe: iframe,
      origin: iframe.src.split('/').slice(0, 3).join('/')
    }

    var self = this

    window.addEventListener('message', receiveMessage, false)
    // initialize END

    // private functions BEGIN
    function assertAllowedOrigin (origin) {
      if (origin !== self.options.origin) {
        throw new Error('Discarding message; untrusted event origin.')
      }
    }

    function dispatchEvent (name, data) {
      self.options.iframe.dispatchEvent(
        new window.CustomEvent(name, { detail: data })
      )
    }

    function receiveMessage (event) {
      assertAllowedOrigin(event.origin)
      dispatchEvent(event.data.name, event.data)
    }

    function postMessage (data) {
      self.options.iframe.contentWindow.postMessage(data, self.options.origin)
    }
    // private functions END

    // public functions BEGIN
    this.params = function () {
      var parts = self.options.iframe.src.split('#')
      if (parts.length === 1) { return {} }

      var hash = parts[1]
      var pairs = hash.split('&')
      var returnObj = {}

      for (var i = 0; i < pairs.length; i++) {
        var pair = pairs[i].split('=')
        var key = decodeURIComponent(pair[0])
        var value = decodeURIComponent(pair[1])
        returnObj[key] = value
      }

      return returnObj
    }

    this.changeScene = function (sceneId, ath, atv) {
      var options = {
        name: 'changeScene',
        sceneId: sceneId
      }

      if (ath) { options.ath = parseFloat(ath, 10) }
      if (atv) { options.atv = parseFloat(atv, 10) }

      postMessage(options)
    }
    // public functions END
  }

  if (typeof exports !== 'undefined') {
    if (typeof module !== 'undefined' && module.exports) {
      exports = module.exports = ICEmbed
    }
    exports.ICEmbed = ICEmbed
  } else {
    this.ICEmbed = ICEmbed
  }
}).call(this)
