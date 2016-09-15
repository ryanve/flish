# flish
Flash messages made simple

```sh
npm install flish --save
```

```js
var flish = require('flish')
```

## API
- flish methods are chainable
- flish is designed for flash messages or notifications, but it can be used for generic tasks too

### `flish()`
- Get a flish instance
- <b>@return</b> object

### `.use(handler)`
- Set the flash handler that gets invoked with the outgoing flashes array whenever `.send()` is called
- <b>@return</b> this

### `.add(flash)`
- Enqueue flash string, object, or function
- <b>@return</b> this

### `.send()`
- Flush and dispatch the flash queue
- <b>@return</b> this

## Examples

### Log flash messages
```js
var flish = require('flish')

// Create a flash instance and define its handler
var flash = flish().use(function(flashes) {
  flashes.forEach(function(text) {
    console.log(text)
  })
})

// Add some flashes and then send them
flash.add('You rock!')
flash.add('You roll!')
flash.send() // logs 'You rock!' and 'You roll!'
flash.add('You stole!')
flash.send() // logs 'You stole!'
flash.send() // logs nothing because no new flashes were added
```

### Flash message objects
```js
var flish = require('flish')

var flash = flish().use(function(flashes) {
  flashes.forEach(function(flash) {
    console[flash.level](flash.text)
  })
})

flash.add({
  text: 'You rock!',
  level: 'info'
}).add({
  text: 'You roll!',
  level: 'warn'
}).add({
  text: 'You stole!',
  level: 'error'
}).send()
```

### HTML flash messages
```html
<section id="flashes" role="status"></section>
```

```css
#flashes:empty {
  display: none;
}
```

```js
var flish = require('flish')

var flash = flish().use(function(flashes) {
  $('#flashes').html(flashes.map(function(flash) {
    var tag = flash.isError ? ['<p><strong>', '</strong></p>'] : ['<p>', '</p>']
    return tag.join(flash.message)
  }).join(''))
})

flash.add({
  message: 'You rock!'
}).add({
  message: 'You roll!'
}).add({
  message: 'You stole!',
  isError: true
}).send()
```

### Flish instances are like arrays
```js
var flish = require('flish')
var flash = flish()

if (flash.length) {
  flash.send()
}

if (flash.some(function(o) { return o.isError })) {
  flash.send()
}
```

## License
MIT
