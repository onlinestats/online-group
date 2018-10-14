const Group = require('./')
const Mean = require('online-mean')

const group = Group(Mean(), Mean())

;[[1, 3], [4, 6], [3, 5]].forEach(v => { group(v[0], v[1]) })

console.log(group.values)
