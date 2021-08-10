class App {
    init () {
      this.render ()
    }
    render () {
      let games = [
        { id: 1, title: 'Legend of Zelda Breath of the Wild', },
        { id: 2, title: 'Spiderman Miles Morales'},
        { id: 3, title: 'Elder Scrolls Skyrim'}
      ]
      let el = document.getElementById('app')
      let fragment = document.createDocumentFragment()
      for (let meal of meals) {
        let elMeal = document.createElement('div')
        elMeal.innerHTML = `<span>${meal.title}</span>`
        fragment.appendChild(elMeal)
      }
      el.appendChild(fragment)
    }
  }
  
  let app = new App()
  app.init()