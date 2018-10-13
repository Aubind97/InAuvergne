class Login
{
    constructor(config){
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
        this.submitButton.addEventListener('click', (evt) => {
            evt.preventDefault()
            if (this.usernameInput !== '' && this.passwordInput !== '') {
                axios.post('http://localhost:8000/api/login', {
                    username: this.usernameInput.value,
                    password: this.passwordInput.value
                })
                .then((res) => {
                    if (res !== []) {
                        sessionStorage.setItem('username', res.data.username)
                        window.location = '/' // On redirige vers le dashboard
                    }
                })
            }
        })
    }

}
