!function() {
  var flish = typeof require == 'function' ? require('./') : this.flish

  function ok(actual, correct) {
    if (actual !== correct) throw new Error(actual + ' should be ' + correct)
  }

  !function(flash) {
    ok(flash instanceof flish, true)
    ok(flash instanceof Array, true)
    ok(flash.hasOwnProperty('length'), true)
    ok(flash.length, 0)
    ok(flash.hasOwnProperty('_handler'), true)
    ok(typeof(flash._handler), 'function')
    ok(flash._handler.name, 'noop')
    console.log('constructor tests passed')
  }(flish());

  !function(flash) {
    function f() { return arguments }
    ok(flash.use(f), flash)
    ok(flash._handler, f)
    console.log('.use tests passed')
  }(flish());

  !function(flash) {
    ok(flash.add(33), flash)
    ok(flash[0], 33)
    ok(flash.length, 1)
    flash.add(99)
    ok(flash[1], 99)
    ok(flash.length, 2)
    console.log('.add tests passed')
  }(flish());

  !function(flash) {
    flash.add(33)
    flash.add(99)
    ok(flash.send(), flash)
    ok(flash.length, 0)
    console.log('.send tests passed')
  }(flish());

  console.log('All tests passed =)')
}();
