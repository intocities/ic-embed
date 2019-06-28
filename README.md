# ic-embed

This script allows you to communicate with your embedded IntoCities Virtual Tour
from your website.

It allows you to

- react to scene changes the user triggers.
- programatically change the current scene and view.

If you just want to embed your Virtual Tour, you do not need this script.

## Usage

1. add the `iframe` HTML code to your page which we provided to you
2. Load this script on your website:  
    ```html
    <script src="dist/ic-embed.min.js" type="text/javascript"></script>
    ```
3. initialize `ICEmbed`  
    ```javascript
    var iframe = document.querySelector('iframe'),
    var icEmbed = new ICEmbed(iframe)
    ```

## Advanced usage

In conjunction with [Turbolinks](https://github.com/turbolinks/turbolinks) you can keep the instance of the Virtual Tour but change the content on your site.

Be aware of the problem of [keeping an `<iframe>` active during navigation](https://stackoverflow.com/questions/8318264/how-to-move-an-iframe-in-the-dom-without-losing-its-state#answer-8318401).

Use [this Turbolink version until the PR get's merged](https://github.com/turbolinks/turbolinks/pull/457) to work around that.

## Browser compatibility

This script relies on [Window.postMessage](https://developer.mozilla.org/en-US/docs/Web/API/Window/postMessage) which is [widely supported](https://caniuse.com/#feat=x-doc-messaging).

For compatibility with IE11 you need to [polyfill the CustomEvent](https://github.com/krambuhl/custom-event-polyfill).

## Events

Events communicate from the Virtual Tour TO your website.

```
[Your Website] <------------ [Virtual Tour]
```

After initialization, the `iframe` element will receive events when the Virtual Tour does something.

```javascript
var iframe = document.querySelector('iframe')

iframe.addEventListener('ic.sceneChanged', function (event) {
  var details = event.detail
  var sceneId = details.sceneId

  console.log('ic.sceneChanged', details)
})
```

## API Doc

When you want the Virtual Tour to change, you can use the API to do so.

```
[Your Website] ------------> [Virtual Tour]
```

A API call can lead to an event. Make sure not to end in a loop.

### `changeScene(sceneId, ath, atv)`

| Parameter | Type   | Required? | Description                   |
|-----------|--------|-----------|-------------------------------|
| `sceneId` | String | **yes**   | Name of the scene to display. |
| `ath`     | Float  | no        | horizontal view direction     |
| `atv`     | Float  | no        | vertical view direction       |

## Development

As of now, this script is plain vanilla JS without any complex build setup.
