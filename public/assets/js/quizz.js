/*
* Création de la classe Quizz qui s'occupera
* de controler le quizz
*/

class Quizz{

    constructor(root,quizzData)
    {
        this.createQuizz(root,quizzData[0]);
        console.log(quizzData[0].responses[0].reponse)

        this.quizz_button_ready.addEventListener('click',this.goToReponse.bind(this));
    }

    /* On passe à la réponse
    * On enlève l'image et on affiche les réponses
    */
    goToReponse(){
        console.log("test");
        this.setVisibility(this.quizz_button_ready,"hide"); /* on cache le bouton "je suis pret" */

        this.setVisibility(this.quizz_see_support,"show"); /* on fait apparaitre le petit oiel */
        this.setVisibility(this.support_question,"hide");
        this.setVisibility(this.quizz__container,"show");

        document.getElementById(this.quizz_see_support).addEventListener('click',(this.displaySupport.bind(this)));
    }

    displaySupport(){
        this.toggleElement(this.support_question);
        this.setVisibility(this.quizz_see_support,"hide");
    }

    setVisibility(element, visibility)
    {
        element.className = visibility;
    }

    createQuizz(root,quizzData)
    {
        let container = this.createDivWithClass("quizz_container")

        // Nom du quizz
        let nom_question = this.createDivWithClass("quizz_nom");
        let nom_question_texte = document.createElement("span");
        nom_question_texte.innerText = quizzData.nom_quizz;
        nom_question.appendChild(nom_question_texte); /* on ajoute les réponse dans le span */

        container.appendChild(nom_question);

        this.support_question = this.createDivWithClass("quizz_support_question");
        // Affichage du support de la question
        if(quizzData.url_img != "")
        {
            let support_question_img = document.createElement("img");
            support_question_img.setAttribute("src","../assets/img/" + quizzData.url_img);
            this.support_question.appendChild(support_question_img);
        }
        else if(quizzData.lien_video != "")
        {
            let support_question_video = document.createElement("iframe");
            support_question_video.setAttribute("src",quizzData.lien_video);
            support_question_video.setAttribute("width","100%");
            support_question_video.setAttribute("frameborder","0");

            this.support_question.appendChild(support_question_video);
        }
        else
        {
            /* faire l'implémentation du support texte */
        }
        container.appendChild(this.support_question);

        this.quizz_see_support = this.createDivWithClass("hide","quizz_see_support");
        let eye = document.createElement("i");
        eye.setAttribute("class","fas fa-eye");
        this.quizz_see_support.appendChild(eye);

        container.appendChild(this.quizz_see_support);
        this.texts = [];

        this.quizz__container = this.createDivWithClass("hide","quizz_response_container");

        for(let i=0;i < 4;i++)
        {
            let reponse1 = this.createDivWithClass("hide","quizz_reponse");
            let circle = this.createDivWithClass("quizz_reponse_circle");
            let text_circle = document.createElement("span");
            text_circle.innerText = i;
            circle.appendChild(text_circle);

            let texte = this.createDivWithClass("quizz_reponse_text");
            let innerText = document.createElement("span");
            innerText.innerText = quizzData.responses[i].reponse;
            texte.appendChild(innerText); /* on ajoute les réponse dans le span */
            this.texts.push(texte); /* on enregistre les textes */

            reponse1.appendChild(circle);
            reponse1.appendChild(texte);
            this.quizz__container.appendChild(reponse1);

            container.appendChild(this.quizz__container);
        }

        this.quizz_button_ready = this.createDivWithClass("show","quizz_ready_button");
        let text_ready = document.createElement("span");
        text_ready.innerText = "Je suis prêt !";

        this.quizz_button_ready.appendChild(text_ready); /* on ajoute les réponses dans le span */
        container.appendChild(this.quizz_button_ready);

        root.appendChild(container);
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
        question: "Savez-vous quelle est la capitale de la France",
        url_img: "",
        text: "",
        lien_video: "https://www.youtube.com/embed/Wm2sGXv6Y0o",
        responses : [
            {reponse: "Paris"},
            {reponse: "Marseille"},
            {reponse: "Toulouse"},
            {reponse: "Cognac"}]
    }];

    console.log(quizzData[0].id_question);
    // Creation d'une classe pour le quizz
    new Quizz(document.getElementsByClassName("quizz")[0],quizzData);
    console.log("coucou");
})

