class Login {
    constructor(config) {
        this.form = document.getElementById(config.form)
        this.getInput()
        this.initSubmitButton();
    }

    getInput() {
        // CHANGER AVEC FORM
        this.usernameInput = document.getElementById('username')
        this.passwordInput = document.getElementById('password')
        this.submitButton = document.getElementById('submitButton')
    }

    initSubmitButton() {
        sessionStorage.removeItem('username')
        sessionStorage.removeItem('token')

        this.submitButton.addEventListener('click', (evt) => {
            evt.preventDefault()
            if (this.usernameInput !== '' && this.passwordInput !== '') {
                axios.post('http://localhost:8000/api/login', {
                        username: this.usernameInput.value,
                        password: this.passwordInput.value
                    })
                    .then((res) => {
                        // C'est un objet... (pas fou)
                        if (res.data.length === undefined) {
                            sessionStorage.setItem('username', res.data.username)
                            sessionStorage.setItem('token', res.data.token)
                            window.location = '/public/pages/dashboard.html' // On redirige vers le dashboard
                        }
                    })
            }
        })
    }

    static initLogoutButton() {
        // Supprimer le token de la BDD...
        let button = document.getElementById('logoutButton')
        if (button) {
            button.addEventListener('click', () => {
                sessionStorage.removeItem('user')
                sessionStorage.removeItem('token')
                window.location = '/'
            })
        }
    }

    static isLoggedIn() {
        // Checker si c'est le meme que en BDD
        if (sessionStorage.getItem('token') === null) {
            sessionStorage.removeItem('user')
            sessionStorage.removeItem('token')
            window.location = '/'
        }
    }


}
