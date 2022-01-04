# ic-embed

`ic-embed` allows you to use your [**IntoCities** _Virtual Tour_](https://intocities.com/) on your website.

In general, we recommend to use the _preview_ function to include the tour on your website.
The preview function displays only a teaser with a 'Start Tour' button. When the user clicks or taps it, the fully interactive virtual tour loads. The preview function causes only a small network load, which is usually desirable. See chapter [Preview](#preview).

You can also embed it directly so that the virtual tour starts right away. See chapter [Embed](#embed).

This script also enables you to programmatically interact with the embedded tour, for example to change the scene. It also notifies you when the user has navigated within the tour and triggered a scene change. See information about [subscribing to events](#subscribing-to-events) and [using the Tour API](#using-the-tour-api) below.

## Preview

1. add an empty div element at the position you'd like to show your virtual tour.
2. load the script on your website:
   ```html
   <script src="/path/to/ic-embed.min.js"></script>
   ```
3. initialize in your Javascript
   ```javascript
   IC.preview(document.querySelector('div'), {
     id: 1, // change to your ID
     key: '...' // change to your key
   })
   ```

[See example](https://intocities.github.io/ic-embed/examples/preview.html).

### Changing the appearance

The Preview function utilizes some CSS variables. With the help of these variables, you can change the appearance: add a `.ic-preview` selector to your CSS and overrule them.

See `src/styles.ts` or investigate in the web developer console on your site which uses the _ic-embed Preview_.

## Embed

Similar to _Preview_ above, but call `IC.embed`:

1. add an empty div element at the position you'd like to show your virtual tour.
2. load the script on your website:
   ```html
   <script src="/path/to/ic-embed.min.js"></script>
   ```
3. initialize in your Javascript
   ```javascript
   IC.embed(document.querySelector('div'), {
     id: 1, // change to your ID
     key: '...' // change to your key
   })
   ```

[See example](https://intocities.github.io/ic-embed/examples/embed.html).

## Subscribing to events

After embedding, the `iframe` element will receive events when the Virtual Tour changed.

### List of available events

- `sceneChanged`

### Usage example

```javascript
const iframe = document.querySelector('iframe')

iframe.addEventListener('sceneChanged', (event) => {
  const details = event.detail

  console.log('sceneChanged', details)
})
```

## Using the Tour API

For the tour API to work, the iframe must have been loaded (e.g. the start button in Preview has been clicked or the virtual has been embedded via `IC.embed`).

If the tour has been embedded directly, you can get access to the api via the embed object with `embed.tour`.

If using the preview function and have just the reference to `preview`, access the tour API via: `preview.embed.tour`

Please note: an API call can lead to an event in return. Make sure not to end in a loop.

### API functions

#### `changeScene(sceneId, ath, atv)`

| Parameter | Type          | Required? | Description                   |
| --------- | ------------- | --------- | ----------------------------- |
| `sceneId` | String        | **yes**   | Name of the scene to display. |
| `ath`     | Number/String | no        | horizontal view direction     |
| `atv`     | Number/String | no        | vertical view direction       |

#### `params`

Returns an object containing the current URL parameters of the tour, which can contain `sceneId`, `ath`, `atv` and `z` (= zoom).

### Advanced usage

There are many possibilities to build a great user experience with your tour. The virtual tour will help you tremendously to showcase your location.

#### Data flow when using the API

When you want the Virtual Tour to change, you can use the API to do so.

```
[Your Website] ------------> [Virtual Tour]
```

#### Data flow of events

Events communicate **from** the Virtual Tour **to** your website.

```
[Your Website] <------------ [Virtual Tour]
```

It's up to you _if_ and _how_ to handle them.

#### Idea: keep the embedded tour while navigating on _your_ website

In conjunction with [Turbolinks](https://github.com/turbolinks/turbolinks) you can keep the instance of the Virtual Tour but change current page on your site<sup>\*</sup>.

<sup>\*</sup>Be aware of the problem of [keeping an `<iframe>` active during navigation](https://stackoverflow.com/questions/8318264/how-to-move-an-iframe-in-the-dom-without-losing-its-state#answer-8318401). Use [this Turbolinks version until the PR gets merged](https://github.com/turbolinks/turbolinks/pull/457) to work around that.

### Browser compatibility

This script relies on [Window.postMessage](https://developer.mozilla.org/en-US/docs/Web/API/Window/postMessage) which is [widely supported](https://caniuse.com/#feat=x-doc-messaging).

We do not support the IE11.

## Development

ic-embed is written in _Typescript_. The build is a bundled script (created with _browserify_) which is minified.
The generated JS is tested with _Jest_. The files are formatted with _prettier_.

1. Checkout the repo and `yarn install`.
2. To run the tests: `yarn test` or build and bundle: `yarn build`.
3. See other `"scripts"` to run in `package.json`.

When developing, `yarn test --watch` watches for changes and runs the tests automatically.
