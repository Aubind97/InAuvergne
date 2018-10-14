/*
* Création de la classe Quizz qui s'occupera
* de controler le quizz
*/

class Quizz{

    constructor(root,quizzData,haveSupportQuestion)
    {
        this.profile = [0,0,0]; /* kinesthésique, visuel, auditif */

        this.haveSupportQuestion = haveSupportQuestion;


        this.goodAnswer = 0;
        this.totalAnswer = 0;
        this.init = false;
        this.quizzData = quizzData;
        this.currentQuestion = 0;

        // axios.get('/api/quizz/id')
        //.then((res) => {
        // this.quizzData  = res.data
        //})
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

        if(this.haveSupportQuestion == true)
        {
            this.quizz_see_support.style.display = "flex"; /* on fait apparaitre le petit oeil */
        }
        else{
            this.quizz_see_support.style.display = "none";
        }
        this.setVisibility(this.quizz__question,"show");

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
        if(this.haveSupportQuestion == false) /* c'est un test psychotechnique */
        {

            for(let i=0;i < this.quizzData[this.currentQuestion].responses.length;i++)
            {
                if(reponse == this.quizzData[this.currentQuestion].responses[i].reponse)
                {
                    this.profile[i] += 1;
                }
            }
        }
        else /* C'est un quizz */
        {
            if(reponse == this.quizzData[this.currentQuestion].correct_response)
            {
                this.goodAnswer++;
            }
        }

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
            /* on update la question */
            this.quizz__question_text.innerText = this.quizzData[this.currentQuestion].question;



        }
        else{
            console.log("fin du quizz");
            this.setVisibility(this.quizz_button_ready,"hide"); /* on cache le bouton "je suis pret" */
            this.setVisibility(this.quizz_see_support,"hide"); /* on fait apparaitre le petit oiel */
            this.quizz_see_support.style.display = "none";
            this.setVisibility(this.support_question,"hide");
            this.setVisibility(this.quizz__container,"hide");
            this.setVisibility(this.quizz__question,"hide");

            let quizz_resultat = this.createDivWithClass("quizz_resultat");
            let quizz_text_resultat = document.createElement("span");

            /* Calcul des pourcentages */


            this.pourcentage_auditif = (this.profile[0] / this.quizzData.length* 100) + "%";
            this.pourcentage_visuel = this.profile[1] / this.quizzData.length * 100 + "%";
            this.pourcentage_kine = this.profile[2] / this.quizzData.length * 100 + "%";

            quizz_text_resultat.innerText = "Félicitation voici votre profil : auditif: " + this.pourcentage_auditif + ", visuelle: " + this.pourcentage_visuel + ", kinesthésique: " + this.pourcentage_kine;
            quizz_resultat.appendChild(quizz_text_resultat);

            this.container.appendChild(quizz_resultat);

        }
    }
    displaySupport(){
        this.setVisibility(this.support_question,"show");
        this.setVisibility(this.quizz_see_support,"hide");
        this.quizz_see_support.style.display = "none";
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
            let support_question_text = document.createElement("span");
            support_question_text.innerText = this.quizzData[this.currentQuestion].text;

            this.support_question.appendChild(support_question_text);
        }



        this.container.appendChild(this.support_question);

        this.quizz_see_support = this.createDivWithClass("hide","quizz_see_support");
        let eye = document.createElement("i");
        eye.setAttribute("class","fas fa-eye");
        this.quizz_see_support.style.display = "none";
        this.quizz_see_support.appendChild(eye);

        this.container.appendChild(this.quizz_see_support);
        this.texts = [];
        this.div_reponses = [];

        this.quizz__container = this.createDivWithClass("hide","quizz_response_container");

        /* Affichage de la question */
        this.quizz__question = this.createDivWithClass("hide","quizz_question");
        this.quizz__question_text = document.createElement("span");
        this.quizz__question_text.innerText = this.quizzData[this.currentQuestion].question;
        this.quizz__question.appendChild(this.quizz__question_text);

        this.container.appendChild(this.quizz__question)

        /* Affichage des réponses */
        for(let i=0;i < this.quizzData[this.currentQuestion].responses.length;i++)
        {
            let reponse = this.createDivWithClass("hide","quizz_reponse");
            this.div_reponses.push(reponse);
            let circle = this.createDivWithClass("quizz_reponse_circle");
            let text_circle = document.createElement("span");
            text_circle.innerText = i+1;
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
        nom_quizz: "Test Psychotechnique",
        id_question: 1,
        question: "Imaginez que vous avez très envie de manger une pomme, vous vous la représentez",
        url_img: "",
        text: "",
        lien_video: "",
        responses : [
            {reponse: "Croquante sous la dent"},
            {reponse: "Brillante, d'une belle couleur"},
            {reponse: "D'une jolie forme ronde, agréable dans la main"}],
        correct_response: ""
    },
    {
        nom_quizz: "Test Psychotechnique",
        id_question: 2,
        question: "Le terme \"pompiers\" vous évoque en priorité",
        url_img: "",
        text: "",
        lien_video: "",
        responses : [
            {reponse: "La sirène"},
            {reponse: "Le camion rouge avec tout le matériel : la lance, les tuyaux, l'échelle, etc."},
            {reponse: "Le feu, l'incendie, le brûlé"}],
        correct_response: ""
    },
    {
        nom_quizz: "Test Psychotechnique",
        id_question: 3,
        question: "Ce que vous appréciez le plus, lorsque vous prenez votre petit-déjeuner dans un café, c'est",
        url_img: "",
        text: "",
        lien_video: "",
        responses : [
            {reponse: "L'ambiance des gens qui discutent"},
            {reponse: "Le cadre, le décor"},
            {reponse: "L'odeur du café"}],
        correct_response: ""
    },
    {
        nom_quizz: "Test Psychotechnique",
        id_question: 3,
        question: "Chez un bébé, le plus \"délicieux\", c'est",
        url_img: "",
        text: "",
        lien_video: "",
        responses : [
            {reponse: "Ses gazouillis"},
            {reponse: "Sa douceur"},
            {reponse: "Son sourire"}],
        correct_response: ""
    },
    {
        nom_quizz: "Test Psychotechnique",
        id_question: 3,
        question: "Lorsque vous pensez à la mer, qu'est -ce qui est le plus évocateur pour vous ?",
        url_img: "",
        text: "",
        lien_video: "",
        responses : [
            {reponse: "Le bruit des vagues"},
            {reponse: "Le vent, l'iode"},
            {reponse: "Le contact de l'eau sur votre corps"}],
        correct_response: ""
    },
    {
        nom_quizz: "Test Psychotechnique",
        id_question: 3,
        question: "Lorsque vous évoquez la campagne au printemps, vous pensez surtout",
        url_img: "",
        text: "",
        lien_video: "",
        responses : [
            {reponse: "Au chant des oiseaux"},
            {reponse: "À la végétation, aux arbres en fleurs"},
            {reponse: "Aux grandes balades à pied et à la saine fatigue physique"}],
        correct_response: ""
    },
    {
        nom_quizz: "Test Psychotechnique",
        id_question: 3,
        question: "Lorsque vous flânez dans une librairie, le plus agréable :",
        url_img: "",
        text: "",
        lien_video: "",
        responses : [
            {reponse: "Écouter les conversations, discuter avec le libraire"},
            {reponse: "Lire quelques lignes, regarder les couvertures"},
            {reponse: "Feuilleter les livres, les prendre dans vos mains"}],
        correct_response: ""
    },
    {
        nom_quizz: "Test Psychotechnique",
        id_question: 3,
        question: "Lorsque vous êtes d'humeur mélancolique, qu'est-ce qui vous tire le plus facilement une larme?",
        url_img: "",
        text: "",
        lien_video: "",
        responses : [
            {reponse: "Écouter de la musique classique"},
            {reponse: "Regarder de vieilles photos"},
            {reponse: "Vous promener sous la pluie"}],
        correct_response: ""
    },
    {
        nom_quizz: "Test Psychotechnique",
        id_question: 3,
        question: "Parmi ces critères, lequel est prioritaire dans le choix d'un nouvel appartement",
        url_img: "",
        text: "",
        lien_video: "",
        responses : [
            {reponse: "Un endroit silencieux, un environnement agréable"},
            {reponse: "Une cuisine spacieuse, pratique 4"},
            {reponse: "Une vue imprenable"}],
        correct_response: ""
    },
    {
        nom_quizz: "Votre gâteau préféré, lorsque vous y pensez",
        id_question: 3,
        question: "Lorsque vous flânez dans une librairie, le plus agréable :",
        url_img: "",
        text: "",
        lien_video: "",
        responses : [
            {reponse: "Vous en sentez la texture"},
            {reponse: "Vous le visualisez"},
            {reponse: "Vous voyez déjà votre cuillère plongée à l'intérieur…"}],
        correct_response: ""
    }];


    // Creation d'une classe pour le quizz
    new Quizz(document.getElementsByClassName("quizz")[0],quizzData,false);
    console.log("coucou");
})

