const oneColor = require('onecolor')
const nearestColor = require('nearest-color')
const fs = require('fs')
const path = require('path')

const baseColorList = [
  ['black',    '#000000',  [0,0,0] ],
  ['white',    '#FFFFFF',  [255,255,255] ],
  ['red',      '#FF0000',  [255,0,0] ],
  ['green',    '#00FF00',  [0,255,0] ],
  ['blue',     '#0000FF',  [0,0,255] ],
  ['yellow',   '#FFFF00',  [255,255,0] ],
  ['cyan',     '#00FFFF',  [0,255,255] ],
  ['magenta',  '#FF00FF',  [255,0,255] ],
]

const baseColors = baseColorList.reduce((o, [ name, hex ]) => Object.assign(o, { [name]: hex }), {})
const nearestBaseColor = nearestColor.from(baseColors)

const firstNames = fs.readFileSync(path.join(__dirname,'first-names.txt')).toString().split("\n")

function uniqColorName(colorArg){
  const colorHex = oneColor(colorArg).hex()
  const baseColor = nearestBaseColor(colorHex)
  const { name: baseColorName } = baseColor
  
  const name = [ baseColorName ]
  
  const colorDec = parseInt(colorHex.slice(1),16)
  
  const first = Math.floor(colorDec/firstNames.length)
  const second = colorDec%firstNames.length
  name.push( firstNames[first] )
  name.push( firstNames[second] )
  
  const nameStr = name.join('-')
  
  // console.log(nameStr)
  
  return nameStr
}

module.exports = uniqColorName
