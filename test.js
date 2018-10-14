var test = require('tape')
var Mean = require('online-mean')
var Group = require('./')

var values = [[2, 3], [4, 6], [3, 3]]

test('Simple test', (_) => {
  var group = Group(Mean(), Mean())
  values.forEach(v => { group(v[0], v[1]) })
  _.deepEqual(group.values, [3, 4])
  _.end()
})
