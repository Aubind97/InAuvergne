class QuizzBuilder {

    constructor(config) {
        this.container = document.getElementById(config.container)
        this.quizz = {}
        this.questions = []

        this.numberOfQuestions = 0;

        this.initForm()
    }

    initForm() {
        let title = document.createElement('h1')
        title.innerText = "Création d'un Quizz"

        let titleLabel = document.createElement('label')
        let titleSpan = document.createElement('span')
        titleSpan.innerText = 'Titre du quizz'
        titleLabel.appendChild(titleSpan)

        let titleInput = document.createElement('input')
        titleLabel.appendChild(titleInput)

        let descriptionLabel = document.createElement('label')
        descriptionLabel.classList.add('textarea')
        let descriptionSpan = document.createElement('span')
        descriptionSpan.innerText = 'Description du quizz'
        descriptionLabel.appendChild(descriptionSpan)

        let descriptionInput = document.createElement('textarea')
        descriptionLabel.appendChild(descriptionInput)

        let questionLabel = document.createElement('label')
        questionLabel.classList.add('textarea')
        let questionSpan = document.createElement('span')
        questionSpan.innerText = 'Nombre de questions'
        questionLabel.appendChild(questionSpan)

        let questionNumber = document.createElement('span')
        questionNumber.innerText = this.numberOfQuestions
        questionLabel.appendChild(questionNumber)

        // Container de question
        let questionContainer = document.createElement('div')

        // Bouton Ajout question
        let addQuestionButton = document.createElement('button')
        addQuestionButton.innerHTML = `Ajouter une question <i class="fas fa-plus"></i>`
        addQuestionButton.classList.add('addButton')

        addQuestionButton.addEventListener('click', () => {
            this.createQuestionContainer(questionContainer, questionNumber)
            this.numberOfQuestions++
            questionNumber.innerText = this.numberOfQuestions
        })

        let button = document.createElement('button')
        button.innerText = 'Finaliser le Quizz'
        button.classList.add('quizzButton')

        button.addEventListener('click', () => {
            window.location = '/public/pages/dashboard.html'
        })

        this.container.appendChild(title)
        this.container.appendChild(titleLabel)
        this.container.appendChild(descriptionLabel)
        this.container.appendChild(questionLabel)
        this.container.appendChild(questionContainer)
        this.container.appendChild(addQuestionButton)
        this.container.appendChild(button)
    }

    createQuestionContainer(questionContainer, numberContainer) {
        let container = document.createElement('div')
        container.classList.add('questionContainer')

        let deleteButton = document.createElement('button')
        deleteButton.classList.add('deleteButton')
        deleteButton.innerHTML = `<i class="fas fa-trash"></i>`

        deleteButton.addEventListener('click', () => {
            this.numberOfQuestions--
            numberContainer.innerText = this.numberOfQuestions
            container.remove()
        })

        let headerLesson = document.createElement('h3')
        headerLesson.innerText = "Source d'apprentissage"

        // SOURCE VISUEL
        let srcLabelV = document.createElement('label')
        let srcSpanV = document.createElement('span')
        srcSpanV.innerHTML = `Ajouter une source visuel <i class="fas fa-eye"></i>`
        srcLabelV.appendChild(srcSpanV)
        let srcInputV = document.createElement('input')
        srcInputV.type = 'file'
        srcLabelV.appendChild(srcInputV)

        // SOURCE AUDIO
        let srcLabelA = document.createElement('label')
        let srcSpanA = document.createElement('span')
        srcSpanA.innerHTML = `Ajouter une source audio <i class="fas fa-music"></i>`
        srcLabelA.appendChild(srcSpanA)
        let srcInputA = document.createElement('input')
        srcInputA.type = 'file'
        srcLabelA.appendChild(srcInputA)

        // SOURCE TEXTE
        let srcLabelT = document.createElement('label')
        let srcSpanT = document.createElement('span')
        srcSpanT.innerHTML = `Ajouter une source texte <i class="fas fa-edit"></i>`
        srcLabelT.appendChild(srcSpanT)
        let srcInputT = document.createElement('input')
        srcInputT.type = 'file'
        srcLabelT.appendChild(srcInputT)

        let questionLabels = document.createElement('label')
        let questionSpan = document.createElement('span')
        questionSpan.innerText = 'Question'
        questionLabels.appendChild(questionSpan)
        let questionInput = document.createElement('input')
        questionLabels.appendChild(questionInput)

        let headerResponses = document.createElement('h3')
        headerResponses.innerText = "Réponses possible"

        container.appendChild(headerLesson)
        container.appendChild(deleteButton)
        container.appendChild(srcLabelV)
        container.appendChild(srcLabelA)
        container.appendChild(srcLabelT)
        container.appendChild(headerResponses)
        container.appendChild(questionLabels)

        // Réponses possible
        for (let i = 0; i < 4; i++) {
            let label = document.createElement('label')
            label.classList.add('textarea')
            let span = document.createElement('span')
            span.innerText = 'Réponse ' + (i + 1)
            label.appendChild(span)

            let input = document.createElement('input')
            label.appendChild(input)

            container.appendChild(label)
        }

        questionContainer.appendChild(container)
    }

}
