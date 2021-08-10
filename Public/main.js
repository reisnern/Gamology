class App {
    init () {
      this.render ()
    }
    render () {
      let games = [
        { id: 1, title: 'Legend of Zelda', calories: 150 },
        { id: 2, title: 'Turkey Sandwich', calories: 600 },
        { id: 3, title: 'Roasted Chicken', calories: 725 }
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