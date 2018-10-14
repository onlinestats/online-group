module.exports = function Group () {
  var stats
  var n = []
  var values = []
  var name = ''

  if (arguments.length > 1) {
    // Convert Array-like arguments to real array
    stats = Array.prototype.slice.call(arguments)
  } else if (arguments.length === 1) {
    // Only one argument provided - maybe array of objects?
    if (Array.isArray(arguments[0])) {
      stats = arguments[0]
    } else {
      stats = [arguments[0]]
    }
  } else {
    throw new Error('No function arguments')
  }

  // Guess group name
  stats.forEach(function (stat) {
    if (name === '') {
      name = stat.name
    } else if (name !== stat.name) {
      name = 'group'
    }
  })

  var group = function group () {
    // Check if arguments exist
    if (arguments.length) {
      // Values pushed to series object:
      var args = arguments
      // Iterate over all series functions
      stats.forEach(function (stat, i) {
        values[i] = stat(args[i])
        n[i] = stat.n
      })
    }
    return values
  }

  Object.defineProperty(group, 'name', {
    value: name
  })

  Object.defineProperty(group, 'values', {
    get: function () {
      return values
    }
  })

  Object.defineProperty(group, 'n', {
    get: function () {
      return n
    }
  })

  return group
}
