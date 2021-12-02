# ic-embed

`ic-embed` allows you to use your _[IntoCities](https://intocities.com/) Virtual Tour_ on your website.

In general, we recommend to use the _preview_ function to enrich your website with the tour.
When you use the preview function, only a nice teaser is displayed. When the user clicks or taps on the teaser, the fully interactive virtual tour loads. The preview function causes only a small network load, which is usually desirable.

Of course, you can also embed it directly so that the tour starts right away.

You can also use this script to programmatically interact with the embedded tour, for example to change the scene. It can also notify you when the user has navigated within the tour and triggered a scene change.

## Preview

1. add an empty div element at the position you'd like to show your virtual tour.
2. load the script on your website:
   <script src="/path/to/ic-embed.min.js"></script>
3. initialize in your Javascript
   ```javascript
   IC.preview(document.querySelector('div'), {
     id: 1, // change to your ID
     key: '...' // change to your key
   })
   ```

See example file: [`examples/preview.html`](examples/preview.html).

### Changing the appearance

The Preview function utilizes some CSS variables. Via this variables, you can change the appearance by overruling them. See `src/styles.ts` or investigate in the web developer console on your site using the _ic-embed Preview_.

## Embed

Similar to _Preview_ above, but call `IC.embed`:

1. add an empty div element at the position you'd like to show your virtual tour.
2. load the script on your website:
   <script src="/path/to/ic-embed.min.js"></script>
3. initialize in your Javascript
   ```javascript
   IC.embed(document.querySelector('div'), {
     id: 1, // change to your ID
     key: '...' // change to your key
   })
   ```

See example file: [`examples/embed.html`](examples/embed.html).

### React to events

After initialization, the `iframe` element will receive events when the Virtual Tour does something.

```javascript
const iframe = document.querySelector('iframe')

iframe.addEventListener('ic.sceneChanged', function (event) {
  const details = event.detail

  console.log('ic.sceneChanged', details)
})
```

### Using the embed API

A API call can lead to an event. Make sure not to end in a loop.

#### `changeScene(sceneId, ath, atv)`

| Parameter | Type          | Required? | Description                   |
| --------- | ------------- | --------- | ----------------------------- |
| `sceneId` | String        | **yes**   | Name of the scene to display. |
| `ath`     | Number/String | no        | horizontal view direction     |
| `atv`     | Number/String | no        | vertical view direction       |

#### `params`

Returns an object containing the current URL parameters of the tour, which can contain `sceneId`, `ath`, `atv` and `z` (= zoom).

## Advanced usage

There are many possibilities to build a great user experience with your tour. The virtual tour will help you tremendously to showcase your location.

### Flow when using the API

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

### Flow of events

Events communicate **from** the Virtual Tour **to** your website.

```
[Your Website] <------------ [Virtual Tour]
```

It's up to you _if_ and _how_ to handle them.

### Idea: keep the embedded tour while navigating on _your_ website

In conjunction with [Turbolinks](https://github.com/turbolinks/turbolinks) you can keep the instance of the Virtual Tour but change current page on your site<sup>\*</sup>.

<sup>\*</sup>Be aware of the problem of [keeping an `<iframe>` active during navigation](https://stackoverflow.com/questions/8318264/how-to-move-an-iframe-in-the-dom-without-losing-its-state#answer-8318401). Use [this Turbolinks version until the PR gets merged](https://github.com/turbolinks/turbolinks/pull/457) to work around that.

### Browser compatibility

This script relies on [Window.postMessage](https://developer.mozilla.org/en-US/docs/Web/API/Window/postMessage) which is [widely supported](https://caniuse.com/#feat=x-doc-messaging).

We do not recommend to support the IE11.

## Development

ic-embed is written in _Typescript_. The build is a bundled script (created with _browserify_) which is minified.
The generated JS is tested with _Jest_. The files are formatted with _prettier_.

1. Checkout the repo and `yarn install`.
2. To run the test: `yarn test` or build: `yarn build`.
3. See other `"scripts"` to run in `package.json`.

When developing, `yarn test --watch` watches for changes and runs the tests automatically.

## TODO

### P1

- [x] specs: add for apicredentials
- [x] specs: keep tests for JS public api (embed, preview, ...)
- [x] ApiCredentials: verify key + id upon creation
- [x] index.embed: change signature to use ApiCredentials
- [x] add styles via class names (append style element to head)

- [x] docs: update README
- [ ] docs: create demo pages
- [x] docs: adjust embedding instructions
- [x] docs: describe how to adjust button colors

### P2

- [ ] chore: setup CI/CD for linter and test runs
- [ ] Preview+Embed: support setting of start scene and initial view direction
- [ ] Embed: make communication (sendmessage) optional (default: disabled)
- [ ] Embed: hide event-binding logic, provide ability to setup callback function (Embed#dispatchEvent)
- [ ] Preview: add button hover styles
- [ ] host minified script with stable url on intocities.com to allow inclusion via <script>.

### P3

- [ ] Preview: when container comes into the view, add preloads for tour
- [ ] Embed: are more preloads needed?
- [ ] ApiCredentials: rename? this contains URLs already ... should hold tour picture url etc, too, after verify
