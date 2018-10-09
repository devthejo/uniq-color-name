#! /usr/bin/env node
const oneColor = require('onecolor')
const chalk = require('chalk')
const nearestColor = require('nearest-color')
const colorNameList = require('color-name-list')
const latinize = require('latinize')

const uniqColorName = require('./uniqColorName')

const namedColors = colorNameList.reduce((o, { name, hex }) => Object.assign(o, { [name]: hex }), {})
const nearestNamedColor = nearestColor.from(namedColors)

const colorArg = process.argv[2]
const colorHex = oneColor(colorArg).hex()

function normalizeName(name){
  name = latinize(name)
  name = name.replace(/\'/g, '')
  name = name.replace(/^[^A-Za-z0-9]*|[^A-Za-z0-9]*$/g, '')
    .replace(/([a-z])([A-Z])/g, (m, a, b) => a + '-' + b.toLowerCase())
    .replace(/[^A-Za-z0-9]+|_+/g, '-')
    .toLowerCase()
  return name
}

const name = uniqColorName(colorArg)

console.log(chalk.cyan(colorArg) + ' unique name is ' + chalk.cyan(name))

const namedColorsByHex = colorNameList.reduce((o, { name, hex }) => Object.assign(o, { [hex]: name }), {})

const namedColor = namedColorsByHex[colorHex]
if(namedColor){
  console.log(chalk.magenta(colorArg) + ' name is also exactly ' + chalk.magenta(normalizeName(namedColor)) )
}
else{
  const { name: nearNamedColor } = nearestNamedColor(colorHex)
  console.log(chalk.magenta(colorArg) + ' name is near (not unique) ' + chalk.magenta(normalizeName(nearNamedColor)) )
}
