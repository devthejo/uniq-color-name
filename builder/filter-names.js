#!/usr/bin/env node
const fs = require('fs')

const lines = fs.readFileSync(__dirname+'/first-names.txt').toString().split("\n")

const stack = []
const letters = {}
let newLines = lines.map((row)=>{
  return row.split(' ')[0].toLowerCase()
})

function shuffle(a) {
  for (let i = a.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1))
      [a[i], a[j]] = [a[j], a[i]]
  }
  return a
}

newLines = newLines.map(row=>{
  row = row
    .replace(/sh/g, 's*')
    .replace(/ch/g, 'c*')
    .replace(/ph/g, 'p*')
    .replace(/h/g, '')
    .replace(/s\*/g, 'sh')
    .replace(/c\*/g, 'ch')
    .replace(/p\*/g, 'ph')
    .replace(/ck/g, 'k')
    .replace(/qu/g, 'k')
    .replace(/kc/g, 'k')
    .replace(/q/g, 'k')
    .replace(/rd$/, 'r')
    .replace(/nt$/, 'n')
    .replace(/y$/, 'i')
    .replace(/ie$/, 'i')
    .replace(/yn$/, 'in')
    .replace(/yne$/, 'ine')
    .replace(/ca/g, 'ka')
    .replace(/co/g, 'ko')
    .replace(/cu/g, 'ku')
    .replace(/rs$/, 'r')
    .replace(/ph/g, 'f')
    .replace(/sh/g, 'ch')
  
  let l = ''
  for(let i=0;i<row.length;i++){
    if(row[i]!==l[l.length-1]){
      l += row[i]
    }
  }
  return l
})
shuffle(newLines)
newLines = newLines.filter(row=>{
    if(!row || !row.length || row.length<2 || stack.includes(row))
    return false
  stack.push(row)
  return true
})


console.log(newLines.length)

newLines = newLines.slice(0,8192).sort()

fs.writeFileSync(__dirname+'/first-names1.json',JSON.stringify(newLines.slice(0,4096), null, 2))
fs.writeFileSync(__dirname+'/first-names2.json',JSON.stringify(newLines.slice(4096), null, 2))
