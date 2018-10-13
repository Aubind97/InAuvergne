class QuizzLister {
    constructor(config) {
        this.container = document.getElementById(config.container)
        this.data = config.data
        this.done = config.done ? config.done : false

        this.fillContainer();
    }

    fillContainer() {
        this.data.forEach((item) => {
            this.container.appendChild(this.createQuizzItem(item))
        })
    }

    createQuizzItem(quizzData) {
        let item = document.createElement('div')
        item.classList.add('cardItem')

        let title = document.createElement('h1')
        title.innerText = quizzData.name
        title.classList.add('cardItem__title')

        item.appendChild(title)

        if (this.done) {
            let nbVisualQuestions = document.createElement('span')
            nbVisualQuestions.innerHTML = `${quizzData.nbVisualQuestions} <i class="fas fa-eye"></i>`
            nbVisualQuestions.classList.add('cardItem__nbQuestions', 'done')
            item.appendChild(nbVisualQuestions)

            let nbOralQuestions = document.createElement('span')
            nbOralQuestions.innerHTML = `${quizzData.nbOralQuestions} <i class="fas fa-music"></i>`
            nbOralQuestions.classList.add('cardItem__nbQuestions', 'done')
            item.appendChild(nbOralQuestions)
        } else {
            let nbQuestions = document.createElement('span')
            nbQuestions.innerHTML = `(${quizzData.nbQuestions} questions)`
            nbQuestions.classList.add('cardItem__nbQuestions')
            item.appendChild(nbQuestions)
        }

        let description = document.createElement('p')
        description.innerText = quizzData.description
        description.classList.add('cardItem__description')

        item.appendChild(description)

        return item
    }

}
