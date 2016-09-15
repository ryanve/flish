!function(root, name, make) {
  typeof module != 'undefined' && module.exports ? module.exports = make() : root[name] = make()
}(this, 'flish', function() {

  function flish() {
    var instance = this instanceof flish ? this : new flish
    instance.length = 0
    instance._handler = noop
    return instance
  }

  function noop() {}

  var model = flish.prototype = []

  model.use = function(handler) {
    this._handler = handler
    return this
  }

  model.add = function(flash) {
    this.push(flash)
    return this
  }

  model.send = function() {
    this._handler(this.splice(0, 1/0))
    return this
  }

  return flish
});
