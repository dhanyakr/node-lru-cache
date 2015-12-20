var LRU = require('../')
var t = require('tap')

var c = new LRU(5)

// now the hacksy bitses
c._mru = Number.MAX_SAFE_INTEGER - 10

function test (c) {
  t.test('mru=' + c._mru + ', lru=' + c._lru, function (t) {
    t.equal(c.length, 5)
    t.equal(c._cache.get(0), undefined)
    t.equal(c._cache.get(1).value.value, 1)
    t.equal(c._cache.get(2).value.value, 2)
    t.equal(c._cache.get(3).value.value, 3)
    t.equal(c._cache.get(4).value.value, 4)
    t.equal(c._cache.get(5).value.value, 5)
    t.ok(c._mru < Number.MAX_SAFE_INTEGER, 'did not overflow')
    t.end()
  })
}

var i
for (i = 0; i < 6; i++) {
  c.set(i, i)
}

test(c)

for (i = 0; i < 6; i++) {
  c.set(i, i)
}

test(c)

for (i = 0; i < 6; i++) {
  c.set(i, i)
}

test(c)

for (i = 0; i < 6; i++) {
  c.set(i, i)
}

test(c)
