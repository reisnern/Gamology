const express = require('express')

const app = express()

app.use(express.static('public'))

app.listen(8080, () => {
  console.log('App listening on port 3001!')
})
render () 
{
    let el = document.getElementById('app')
    let div = document.createElement('div')
    div.textContent = 'Oh my!'
    el.appendChild(div)
  }