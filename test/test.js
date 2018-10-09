const assert = require('assert')
const uniqColorName = require('../uniqColorName')

const ProgressBar = require('ascii-progress')
const refreshRate = 10000

const totalColors = Math.pow(256, 3)-1

const debug = false
// const debug = true

describe('test there is a unique name for each of '+totalColors+' colors (this can take a while)', function() {
  it('each name should be unique', function() {
    this.timeout(1800000)
    
    var bar = new ProgressBar({ 
      schema: "  [:bar.green] :current/:total :percent.green :elapseds.green remaining: :etas",
      total : totalColors,
      fixedWidth: true,
    })

    const colorNameList = []
    const colorNameMap = {}
    let duplicate = false
    
    for(let i=0;i<=totalColors;i++){
      const hex = i.toString(16).padStart(6, '0').toUpperCase()
      const colorName = uniqColorName(hex)
      
      if(debug){
        if(!colorNameMap[colorName])
          colorNameMap[colorName] = []
        colorNameMap[colorName].push(hex)
      }
      
      if(colorNameList.includes(colorName)){
        duplicate = colorName
        break
      }
      colorNameList.push(colorName)
      
      // display progress all 10000 iterations
      if(i && i%refreshRate===0){
        bar.tick(refreshRate)
      }
    }
    
    if(!duplicate){
      bar.update(1)
    }
    
    if(debug && duplicate)
      console.log(colorNameMap[duplicate])
      
    assert.equal(duplicate, false)
    
  })
  
})
