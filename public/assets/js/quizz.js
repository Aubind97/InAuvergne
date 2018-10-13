/*
* Création de la classe Quizz qui s'occupera
* de controler le quizz
*/

class Quizz{

    constructor(root,quizzData)
    {
        this.goodAnswer = 0;
        this.totalAnswer = 0;
        this.init = false;
        this.quizzData = quizzData;
        this.currentQuestion = 0;
        this.createQuizz(root);
        console.log(this.quizzData[0].responses[0].reponse)

        this.quizz_button_ready.addEventListener('click',this.goToReponse.bind(this));
    }

    /* On passe à la réponse
    * On enlève l'image et on affiche les réponses
    */
    goToReponse(){
        console.log("test");
        this.setVisibility(this.quizz_button_ready,"hide"); /* on cache le bouton "je suis pret" */

        this.setVisibility(this.quizz_see_support,"show"); /* on fait apparaitre le petit oeil */
        this.setVisibility(this.support_question,"hide");
        this.setVisibility(this.quizz__container,"show");

        if(this.init == false)
        {
        for(let i=0; i < this.quizzData[this.currentQuestion].responses.length;i++){

            this.div_reponses[i].addEventListener('click', (evt) => {
                this.clickOnResponse(evt.target.innerText);
            });
        }

        this.quizz_see_support.addEventListener('click',(this.displaySupport.bind(this)));
        this.init = true;
        }

    }

    clickOnResponse(reponse)
    {
        if(reponse == this.quizzData[this.currentQuestion].correct_response)
        {
            this.goodAnswer++;
            console.log("Bien joué !");
        }
        else
        {
            console.log("Dommage, mauvaise réponse !");
        }
        this.totalAnswer++;

        this.nextQuestion();
    }

    nextQuestion()
    {
        /* il reste des questions */
        if(this.currentQuestion + 1 < this.quizzData.length)
        {
            this.currentQuestion += 1;

            for(let i=0; i < this.quizzData[this.currentQuestion].responses.length;i++)
            {
                this.texts[i].innerText = this.quizzData[this.currentQuestion].responses[i].reponse;
            }


            this.setVisibility(this.quizz_button_ready,"show"); /* on cache le bouton "je suis pret" */
            this.setVisibility(this.quizz_see_support,"hide"); /* on fait apparaitre le petit oiel */
            this.setVisibility(this.support_question,"show");
            this.setVisibility(this.quizz__container,"hide");
        }
        else{
            console.log("fin du quizz");
            this.setVisibility(this.quizz_button_ready,"hide"); /* on cache le bouton "je suis pret" */
            this.setVisibility(this.quizz_see_support,"hide"); /* on fait apparaitre le petit oiel */
            this.setVisibility(this.support_question,"hide");
            this.setVisibility(this.quizz__container,"hide");

            let quizz_resultat = this.createDivWithClass("quizz_resultat");
            let quizz_text_resultat = document.createElement("span");
            quizz_text_resultat.innerText = "Félicitation vous avez répondu à " + this.goodAnswer + "/" + this.totalAnswer + " questions.";
            quizz_resultat.appendChild(quizz_text_resultat);

            this.container.appendChild(quizz_resultat);

        }
    }
    displaySupport(){
        this.setVisibility(this.support_question,"show");
        this.setVisibility(this.quizz_see_support,"hide");
    }

    setVisibility(element, visibility)
    {
        element.className = visibility;
    }

    /* Lance la création de l'html du quizz
    * @PARAM {root} correspond au noeud où on rattache le quizz
    *
    */
    createQuizz(root)
    {
        this.container = this.createDivWithClass("quizz_container")

        // Nom du quizz
        let nom_question = this.createDivWithClass("quizz_nom");
        let nom_question_texte = document.createElement("span");
        nom_question_texte.innerText = this.quizzData[this.currentQuestion].nom_quizz;
        nom_question.appendChild(nom_question_texte); /* on ajoute les réponse dans le span */

        this.container.appendChild(nom_question);

        this.support_question = this.createDivWithClass("show","quizz_support_question");
        // Affichage du support de la question
        if(this.quizzData[this.currentQuestion].url_img != "")
        {
            let support_question_img = document.createElement("img");
            support_question_img.setAttribute("src","../assets/img/" + this.quizzData[this.currentQuestion].url_img);
            this.support_question.appendChild(support_question_img);
        }
        else if(this.quizzData[this.currentQuestion].lien_video != "")
        {
            let support_question_video = document.createElement("iframe");
            support_question_video.setAttribute("src",this.quizzData[this.currentQuestion].lien_video);
            support_question_video.setAttribute("width","100%");
            support_question_video.setAttribute("frameborder","0");

            this.support_question.appendChild(support_question_video);
        }
        else
        {
            /* faire l'implémentation du support texte */
        }
        this.container.appendChild(this.support_question);

        this.quizz_see_support = this.createDivWithClass("hide","quizz_see_support");
        let eye = document.createElement("i");
        eye.setAttribute("class","fas fa-eye");
        this.quizz_see_support.appendChild(eye);

        this.container.appendChild(this.quizz_see_support);
        this.texts = [];
        this.div_reponses = [];

        this.quizz__container = this.createDivWithClass("hide","quizz_response_container");

        for(let i=0;i < this.quizzData[this.currentQuestion].responses.length;i++)
        {
            let reponse = this.createDivWithClass("hide","quizz_reponse");
            this.div_reponses.push(reponse);
            let circle = this.createDivWithClass("quizz_reponse_circle");
            let text_circle = document.createElement("span");
            text_circle.innerText = i;
            circle.appendChild(text_circle);

            let texte = this.createDivWithClass("quizz_reponse_text");
            let innerText = document.createElement("span");
            innerText.innerText = this.quizzData[this.currentQuestion].responses[i].reponse;
            texte.appendChild(innerText); /* on ajoute les réponse dans le span */
            this.texts.push(innerText); /* on enregistre les textes */

            reponse.appendChild(circle);
            reponse.appendChild(texte);
            this.quizz__container.appendChild(reponse);

            this.container.appendChild(this.quizz__container);
        }

        this.quizz_button_ready = this.createDivWithClass("show","quizz_ready_button");
        let text_ready = document.createElement("span");
        text_ready.innerText = "Je suis prêt !";

        this.quizz_button_ready.appendChild(text_ready); /* on ajoute les réponses dans le span */
        this.container.appendChild(this.quizz_button_ready);

        root.appendChild(this.container);
    }

    createDivWithClass(className,idName = "")
    {
        var div = document.createElement('div');

        if(idName != "")
        {
            div.setAttribute('id',idName);
        }

        div.setAttribute('class',className);


        return div;
    }

    toggleElement(element)
    {
        if(element.className == "show")
        {
            element.className = "hide";
        }
        else
        {
            element.className = "show";
        }
    }
}

// On attend que la page soit chargée
document.addEventListener('DOMContentLoaded', function () {

    let quizzData = [{
        nom_quizz: "Quizz : Les capitales",
        id_question: 1,
        question: "Savez-vous quelle est la capitale de la France ?",
        url_img: "italie.jpg",
        text: "",
        lien_video: "",
        responses : [
            {reponse: "Paris"},
            {reponse: "Marseille"},
            {reponse: "Toulouse"},
            {reponse: "Cognac"}],
        correct_response: "Paris"
    },
    {
        nom_quizz: "Quizz : Les capitales",
        id_question: 2,
        question: "Savez-vous quelle est la capitale de l'Italie ?",
        url_img: "italie.jpg",
        text: "",
        lien_video: "",
        responses : [
            {reponse: "Rome"},
            {reponse: "Venise"},
            {reponse: "Turin"},
            {reponse: "Milan"}],
        correct_response: "Rome"
    },
    {
        nom_quizz: "Quizz : Les capitales",
        id_question: 3,
        question: "Savez-vous quelle est la capitale de l'Italie ?",
        url_img: "italie.jpg",
        text: "",
        lien_video: "",
        responses : [
            {reponse: "Rome"},
            {reponse: "Venise"},
            {reponse: "Turin"},
            {reponse: "Milan"}],
        correct_response: "Rome"
    }];


    // Creation d'une classe pour le quizz
    new Quizz(document.getElementsByClassName("quizz")[0],quizzData);
    console.log("coucou");
})

