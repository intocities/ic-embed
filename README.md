# ic-embed

This script allows communication with your embedded IntoCities Virtual Tour
from your website. If you just want to embed your Virtual Tour, you do not need this script.

Features:

- react to scene changes
- change the current scene and view from your website.

## Usage

1. add the `<iframe>` HTML code to your page which we provided to you
2. Load the script on your website:
   `yarn add git+https://git@github.com/intocities/ic-embed.git`

   ```html
   <script src="dist/ic-embed.min.js" type="text/javascript"></script>
   ```

3. initialize `ICEmbed`
   ```javascript
   var iframe = document.querySelector('iframe')
   var icEmbed = new ICEmbed(iframe)
   ```

## Browser compatibility

For compatibility with IE11 you need to [polyfill `CustomEvent`](https://github.com/kumarharsh/custom-event-polyfill) and [`Object.assign`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/assign).

This script relies on [Window.postMessage](https://developer.mozilla.org/en-US/docs/Web/API/Window/postMessage) which is [widely supported](https://caniuse.com/#feat=x-doc-messaging).

## Events

Events communicate from the Virtual Tour **to** your website. It's up to you to handle them.

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

You can also synchronously request information from the Virtual Tour.

```
                    get
[Your Website] ------------> [Virtual Tour]
[Your Website] <------------ [Virtual Tour]
```

A API call can lead to an event. Make sure not to end in a loop.

### `changeScene(sceneId, ath, atv)`

| Parameter | Type   | Required? | Description                   |
| --------- | ------ | --------- | ----------------------------- |
| `sceneId` | String | **yes**   | Name of the scene to display. |
| `ath`     | Float  | no        | horizontal view direction     |
| `atv`     | Float  | no        | vertical view direction       |

### `params`

Returns an object containing the current URL parameters of the tour.

## Advanced usage

In conjunction with [Turbolinks](https://github.com/turbolinks/turbolinks) you can keep the instance of the Virtual Tour but change the content on your site<sup>\*</sup>.

<sup>\*</sup>Be aware of the problem of [keeping an `<iframe>` active during navigation](https://stackoverflow.com/questions/8318264/how-to-move-an-iframe-in-the-dom-without-losing-its-state#answer-8318401). Use [this Turbolinks version until the PR gets merged](https://github.com/turbolinks/turbolinks/pull/457) to work around that.

## Development

## TODO

### P1

- [ ] specs: add for apicredentials
- [x] specs: keep tests for JS public api (embed, preview, ...)
- [x] ApiCredentials: verify key + id upon creation
- [x] index.embed: change signature to use ApiCredentials
- [x] add styles via class names (append style element to head)

- [ ] host minified script on intocities.com to allow inclusion via <script>.
- [ ] docs: update README
- [ ] docs: create demo pages
- [ ] docs: adjust embedding instructions
- [ ] docs: describe how to adjust button colors

### P2

- [ ] chore: setup CI/CD for linter and test runs
- [ ] Preview+Embed: support setting of start scene and initial view direction
- [ ] Embed: make communication (sendmessage) optional (default: disabled)
- [ ] Embed: hide event-binding logic, provide ability to setup callback function (Embed#dispatchEvent)
- [ ] Preview: add button hover styles

### P3

- [ ] Preview: when container comes into the view, add preloads for tour
- [ ] Embed: are more preloads needed?
- [ ] ApiCredentials: rename? this contains URLs already ... should hold tour picture url etc, too, after verify
