let toggle = document.querySelector('.toggle');
let sidebar = document.querySelector('.app-sidebar');
let projects = document.querySelectorAll('.project');
const body = document.body; // Define body globally to use in functions
const icon_light = document.getElementById('icon-light'); // Make sure to correctly reference your icons
const icon_dark = document.getElementById('icon-dark');
let app_sidebar = document.querySelector('.app-sidebar');
let sizeAppSidebar = app_sidebar.offsetWidth;
let activeProject = null;
let toggled = false;
let toggle_menus = document.querySelectorAll('.toggle-menu');
let show_menu = false;

let show_content = document.querySelector('.app-content__body-inner')


        document.querySelectorAll('.my-profile').forEach((relaoder)=>{
            relaoder.addEventListener('click', ()=>{
              window.location.reload();
            });
        });

        const links = document.querySelectorAll('.social a');

        links.forEach((link) => {
          link.addEventListener('click', (e) => {
            e.preventDefault();
            const iframe = document.querySelector('iframe');
            iframe.srcdoc = `<html><body><a href="${link.href}">${link.href}</a></body></html>`;
          });
        });

        let my_Pic = 'profile.jpg'
        let timerInterval;
        Swal.fire({
        title: `<img src=${my_Pic} style='border-radius: 50%; border:2px solid green;'><br>Hello !!! I hope you're fine`,
        html: "<span>Welcome on my Final Project</span> <br> <b></b>",
        timer: 5000,
        timerProgressBar: true,
        didOpen: () => {
            Swal.showLoading();
            const timer = Swal.getPopup().querySelector("b");
            timerInterval = setInterval(() => {
            timer.textContent = `${Swal.getTimerLeft()}`;
            }, 100);
        },
        willClose: () => {
            clearInterval(timerInterval);
        }
        }).then((result) => {
            /* Read more about handling dismissals below */
            if (result.dismiss === Swal.DismissReason.timer) {
                console.log("I was closed by the timer");
            }
        });


toggle_menus.forEach((toggle_menu)=>{
    toggle_menu.addEventListener('click', ()=>{
        show_menu = !show_menu;
        if(show_menu){
            document.querySelector('.app-main').classList.toggle('show-menu');
        }else{
            document.querySelector('.app-main').classList.remove('show-menu');
        } 
        
    })
})


toggle.addEventListener('click', () => {
    toggled = !toggled
    if (toggled) {
        toggle.style.transform = 'rotate(180deg)';
        sidebar.classList.toggle('collapsed');
        document.querySelector('.logo img').src = '/pkf2.jpg';
        sizeAppSidebar = 80;
    } else {
        toggle.style.transform = 'rotate(0deg)';
        sidebar.classList.remove('collapsed');
        document.querySelector('.logo img').src = '/pkfImg.png';
        sizeAppSidebar = 230;
    }
})


let previousLinkClass = null;

projects.forEach((project) => {
  project.addEventListener('click', () => {
    let link = project.getAttribute('data-url');
    document.querySelector('.my-info').style.display = 'none';

    // Remove active class from previously active project
    if (activeProject !== null) {
      activeProject.classList.remove('active');
    }

    // Remove previous link class from show_content
    if (previousLinkClass !== null) {
      show_content.classList.remove(previousLinkClass);
    }
    Swal.fire({
        title: ``,
        html: "<span>Loading Project ... </span> <b></b>",
        timer: 1000,
        timerProgressBar: true,
        didOpen: () => {
            Swal.showLoading();
            const timer = Swal.getPopup().querySelector("b");
            timerInterval = setInterval(() => {
            timer.textContent = `${Swal.getTimerLeft()}`;
            }, 100);
        },
        willClose: () => {
            clearInterval(timerInterval);
        }
        }).then((result) => {
            /* Read more about handling dismissals below */
            if (result.dismiss === Swal.DismissReason.timer) {
                 // Add active class to newly clicked project
                    show_content.classList.add(link);
            }
        });

   

    // Update previous link class
    previousLinkClass = link;

    project.classList.add('active');
    document.querySelector('.dock').innerText = project.getAttribute('id');
    document.querySelector('.app-content__heading-title').innerText = project.getAttribute('id');
    // Update activeProject
    activeProject = project;
    if (show_menu) {
      document.querySelector('.app-main').classList.remove('show-menu');
      show_menu = false;
    }
  });
});


icon_light.addEventListener('click', () => {
    body.classList.remove('dark-mode'); // Remove dark-mode class
    icon_light.classList.toggle('active'); // Toggle active class for icon_light
    icon_dark.classList.remove('active'); // Remove active class for icon_dark
    icon_light.style.color = '#000'; // Change icon_light color (optional)
    saveThemePreference(body.classList.contains('dark-mode')); // Save theme preference
});

icon_dark.addEventListener('click', () => {
    body.classList.add('dark-mode'); // Add dark-mode class
    icon_light.classList.remove('active'); // Ensure icon_light does not have active class
    icon_dark.classList.add('active'); // Ensure icon_dark has active class
    icon_light.style.color = '#fff'; // Change icon_light color (optional)
    saveThemePreference(body.classList.contains('dark-mode')); // Save theme preference
});

function saveThemePreference(isDarkMode) {
      localStorage.setItem('dark-mode', isDarkMode);
}

  // Function to load the saved theme
function loadTheme() {
      const isDarkMode = localStorage.getItem('dark-mode') === 'true';
      
      if (isDarkMode) {
          body.classList.add('dark-mode'); // Apply dark-mode
          icon_dark.classList.add('active'); // Ensure icon_dark is active
          icon_light.classList.remove('active'); // Ensure icon_light does not have active class
          icon_light.style.color = '#fff'; // Optional styling for light mode icon
      } else {
          body.classList.add('light-mode'); // Apply light-mode
          icon_light.classList.add('active'); // Ensure icon_light is active
          icon_dark.classList.remove('active'); // Ensure icon_dark does not have active class
          icon_light.style.color = '#000'; // Optional styling for light mode icon
      }
}

  // Load the theme on initial load
loadTheme();



setInterval(() => {

    if(sizeAppSidebar === 80 && !body.classList.contains('dark-mode')){
      icon_light.style.display = 'none';
      icon_light.style.color = '#000';
      icon_dark.style.display = 'flex';
    }else if(sizeAppSidebar === 80 && body.classList.contains('dark-mode')){
      icon_light.style.display = 'flex';
      icon_dark.style.display = 'none';
    } else{
      icon_light.style.display = 'flex';
      icon_dark.style.display = 'flex';
    }
}, 1);


const chronoDisplay = document.querySelector('.chrono__display__inner__value');
const startButton = document.querySelector('.chrono__controls__inner__button--start');
const stopButton = document.querySelector('.chrono__controls__inner__button--stop');
const resetButton = document.querySelector('.chrono__controls__inner__button--reset');

let intervalId;
let startTime;
let elapsedTime = 0;

startButton.addEventListener('click', () => {
  startTime = Date.now() - elapsedTime;
  intervalId = setInterval(() => {
    const currentTime = Date.now();
    elapsedTime = currentTime - startTime;
    const hours = Math.floor(elapsedTime / 3600000);
    const minutes = Math.floor((elapsedTime % 3600000) / 60000);
    const seconds = Math.floor((elapsedTime % 60000) / 1000);
    const milliseconds = elapsedTime % 1000;
    chronoDisplay.textContent = `${padZero(hours)}:${padZero(minutes)}:${padZero(seconds)}:${padZero(milliseconds, 3)}`;
  }, 1);
});

stopButton.addEventListener('click', () => {
  clearInterval(intervalId);
});

resetButton.addEventListener('click', () => {
  clearInterval(intervalId);
  elapsedTime = 0;
  chronoDisplay.textContent = '00:00:00:000';
});

function padZero(value, length = 2) {
  return String(value).padStart(length, '0');
}


// To do List
// JavaScript
const todoInput = document.getElementById('todo-input');
const addTodoBtn = document.getElementById('add-todo-btn');
const todoListUl = document.getElementById('todo-list-ul');

let todos = [];

  // function to render todo list
  function renderTodoList() {
    todoListUl.innerHTML = '';
    todos.forEach((todo, index) => {
      const todoItem = document.createElement('li');
      todoItem.classList.add('todo-item');
      todoItem.innerHTML = `
        <span>${todo}</span>
        <button class="delete-btn" data-index="${index}">Delete</button>
      `;
      todoListUl.appendChild(todoItem);
    });
  }

  // function to add new todo
  function addTodo() {
    const newTodo = todoInput.value.trim();
    if (newTodo !== '') {
      todos.push(newTodo);
      todoInput.value = '';
      renderTodoList();
    }
  }

  // function to delete todo
  function deleteTodo(index) {
    todos.splice(index, 1);
    renderTodoList();
  }

  // add event listeners
    addTodoBtn.addEventListener('click', addTodo);
    todoListUl.addEventListener('click', (e) => {
      if (e.target.classList.contains('delete-btn')) {
        const index = e.target.dataset.index;
        deleteTodo(index);
      }
    });



    var perso = document.querySelector(".perso");
    var obstacles = document.querySelector(".obstacles");

    // fontion pour faire sautert la personne
    function Jump(){
    if(perso.classList != "animation"){
            perso.classList.add('animation');
    }
    setTimeout(function(){
            perso.classList.remove('animation');
    },500)
    }

    // verifier si l'obstacle touche le personnage
    var verification = setInterval(function(){
        var persoTop = parseInt(window.getComputedStyle(perso).getPropertyValue("top"));
        var obstaclesleft = parseInt(window.getComputedStyle(obstacles).getPropertyValue("left"));

        if(obstaclesleft<20 && obstaclesleft>0 && persoTop>= 130){
            obstacles.style.animation = "none";
            alert('vous avez perdu')
            obstacles.classList.remove('start')
        }
        // obstacles.style.animation = "initial";
    },1)

      // Start Jumping Game
      function startJumping(){
        // obstacles.style.animation = "initial";
        obstacles.classList.add('start')
    }


    document.querySelector('#Jump').addEventListener('click', Jump)
    document.querySelector('#startGame').addEventListener('click', startJumping);



     // fonction pour recommencer le jeu
     const contenantChoixOrdinateur = document.getElementById('choix-ordinateur');
     const contenantChoixUtilisateur = document.getElementById('choix-utilisateur');
     const contenantResultat = document.getElementById('resultat');
 
     const choixPossibles = document.querySelectorAll('.btn.spc');
 
     let choixUtilisateur
     let  resultat
     let choixOrdinateur
 
     // Evernement click sur les bouttons
     choixPossibles.forEach(choixPossible => choixPossible.addEventListener('click',(e)=>{
         // recuperation de l'id du boutton clique
         choixUtilisateur = e.target.id;
         // on ajoute l'image correspondant au choix
         contenantChoixUtilisateur.innerHTML = `<img src="${choixUtilisateur}.png">`
         generer_choix_ordinateur();
         verificationChoice();
     }))
 
 
     // fonction pour generer le choix de l'ordinateur
     function generer_choix_ordinateur(){
         random = Math.floor(Math.random() * 3) +1     // generer des nombres compris entre 1 et 3
             if(random ===1 ){
                 choixOrdinateur = "pierre"
             }
             if(random === 2){
                 choixOrdinateur = "papier"
             }
             if(random === 3){
                 choixOrdinateur = "ciseaux"
             }
             // on ajoute l'image correspondant au choix
             contenantChoixOrdinateur.innerHTML = `<img src="${choixOrdinateur}.png">`
     }
 
     // fonction pour verifier si le joueur a gagne ou pas
     function verificationChoice(){
        if(choixUtilisateur === choixOrdinateur){
            resultat = "Egalité!";
            contenantResultat.style.backgroundColor = 'yellow';
        }
        // les cas ou le joueur perd
        if(choixUtilisateur === "pierre" && choixOrdinateur == "papier"){
            resultat = "Perdu!";
            contenantResultat.style.backgroundColor = 'red';
        }
        if(choixUtilisateur === "papier" && choixOrdinateur == "ciseaux"){
            resultat = "Perdu!";
            contenantResultat.style.backgroundColor = 'red';
        }
        if(choixUtilisateur === "ciseaux" && choixOrdinateur == "pierre"){
            resultat = "Perdu!";
            contenantResultat.style.backgroundColor = 'red';
        }
        // les cas ou le joueur gagne
        if(choixUtilisateur === "pierre" && choixOrdinateur == "ciseaux"){
            resultat = "gagné!";
            contenantResultat.style.backgroundColor = 'green';
        }
        if(choixUtilisateur === "ciseaux" && choixOrdinateur == "papier"){
            resultat = "gagné!";
            contenantResultat.style.backgroundColor = 'green';
        }
        if(choixUtilisateur === "papier" && choixOrdinateur == "pierre"){
            resultat = "gagné!";
            contenantResultat.style.backgroundColor = 'green';
        }
       
        contenantResultat.innerHTML = resultat
    }


    // Password Verification Code Javascript
    var myInput = document.getElementById('psw');
    var letter = document.getElementById('letter');
    var capital = document.getElementById('capital');
    var number = document.getElementById('number');
    var length = document.getElementById('length');

    // lorque l'utilisateur clique sur le champ du mot de passe, affichez la boite de message
    myInput.onfocus = function(){
        document.getElementById("message").style.display = "flex"
    }
    // lorsque l'utilisateur clique en dehors du champ du mot de passe, masquer la boite de message
    myInput.onblur = function(){
        document.getElementById("message").style.display = "none"
    }
    // lorsque l'utilisateur commence a taper quelque chose dans le champ du mot de passe
    myInput.onkeyup = function(){
    //    valider les lettres en minuscule
        var lowerCaseLetters = /[a-z]/g
        if(myInput.value.match(lowerCaseLetters)){
            // si le mot de passe content une lettre minuscule, enlever la classe "invalid" et ajouter la classe "valid"
            letter.classList.remove('invalid');
            letter.classList.add('valid');
        }else{
            // si non , enveler la classe "valid" et ajouter la classe "invalid"
            letter.classList.remove('valid');
            letter.classList.add('invalid');
        }

        // valider les lettres en majuscule
        var upperCaseLetters = /[A-Z]/g
        if(myInput.value.match(upperCaseLetters)){
            // si le mot de passe content une lettre majuscule, enlever la classe "invalid" et ajouter la classe "valid"
            capital.classList.remove('invalid');
            capital.classList.add('valid');
        }else{
            // si non , enveler la classe "valid" et ajouter la classe "invalid"
            capital.classList.remove('valid');
            capital.classList.add('invalid');
        }

        // valider les nombres
        var numbers = /[0-9]/g
        if(myInput.value.match(numbers)){
            // si le mot de passe content un chiffre, enlever la classe "invalid" et ajouter la classe "valid"
            number.classList.remove('invalid');
            number.classList.add('valid');
        }else{
            // si non , enveler la classe "valid" et ajouter la classe "invalid"
            number.classList.remove('valid');
            number.classList.add('invalid');
        }
        // valider la longueur
        if(myInput.value.length >= 8){
            // si le mot de passe content uminimum 8 car, enlever la classe "invalid" et ajouter la classe "valid"
            length.classList.remove('invalid');
            length.classList.add('valid');
        }else{
            // si non , enveler la classe "valid" et ajouter la classe "invalid"
            length.classList.remove('valid');
            length.classList.add('invalid');
        }
    }


    // Code-Bar JS
    var button_code_bar = document.getElementById('button_code_bar');
    var text = document.getElementById('text');
    var box = document.getElementById('box');
    var pdf_box = document.getElementById('pdf_box');

    button_code_bar.onclick = function(){
        if(text.value.length > 0){
            if(text.value.length < 50){
                // generer le code barres
                box.innerHTML = "<svg id='barcode'></svg>";
                JsBarcode("#barcode", text.value);
                box.style.border = '1px solid #999';
                // inserer un bouton pour telecharger le code bar
                pdf_box.innerHTML = "<button id='button_pdf' onclick='genererPDF()'>Télécharger le code bar</button>"

                // styliser la boite du bouton pdf
                pdf_box.style.marginTop = "10px";
                pdf_box.style.display = "flex";

            }else{
                box.style.border = "0";
                box.innerHTML = "<p class= 'error'>Le text est trop long !</p>";
                pdf_box.style.display = "none";

                
            }
        }else{
            box.style.border = "0";
            box.innerHTML = "<p class= 'error'>Remplissez le champ !</p>";
            pdf_box.style.display = "none";
        }
    }
    // generer le pdf
    function genererPDF(){
        var opt = {
        margin:       1,
        filename:     `${text.value}.pdf`,
        image:        { type: 'jpeg', quality: 0.98 },
        html2canvas:  { scale: 2 },
        jsPDF:        { unit: 'in', format: 'a6', orientation: 'l' }
        };

        // New Promise-based usage:
        html2pdf().set(opt).from(box).save();

        // Old monolithic-style usage:
        html2pdf(box, opt);

    }


    // Calcalatrice JS
    var nb1 = document.querySelector('.nb1');
    var nb2 = document.querySelector('.nb2');
    var op = document.querySelector('.op');
    var message = document.querySelector('.message');
    var score = document.querySelector('.score');
    var link = document.querySelector('.link');
    var section = document.querySelector('section');
    var compteur = 0;

    document.querySelector('.recommencer').addEventListener('click', ()=>{
        // nombres aleantoires debut du jeu
        random1 = Math.random()*11 << 0; // pour genere des nombres entre 0 et 11
        random2 = Math.random()*11 << 0; // pour genere des nombres entre 0 et 11
        // inserer des nombres au hasard dans les variables nb1 et nb2
        nb1.innerHTML = random1;
        nb2.innerHTML = random2;
    });


    random1 = Math.random()*11 << 0; // pour genere des nombres entre 0 et 11
    random2 = Math.random()*11 << 0; // pour genere des nombres entre 0 et 11
    // inserer des nombres au hasard dans les variables nb1 et nb2
    nb1.innerHTML = random1;
    nb2.innerHTML = random2;


      // fonction de verification
      function verifier(){
        // recuperer le resultat enter par le joueur
        var res = document.querySelector('.res').value;
        if(random1 + random2 ==res){
            message.style.background = "green";
            message.innerHTML = "Correte."
            // creer d'autres nombres aleatoires

                // nombres aleantoires debut du jeu
                random1 = Math.random()*11 << 0; // pour genere des nombres entre 0 et 11
                random2 = Math.random()*11 << 0; // pour genere des nombres entre 0 et 11
                console.log(random1);
                console.log(random2);

                // inserer des nombres au hasard dans les variables nb1 et nb2
                nb1.innerHTML = random1;
                nb2.innerHTML = random2;
                compteur = compteur + 1
        }else{
                message.style.background = "red";
                message.innerHTML = "Vous avez perdu."
                section.innerHTML = "";
                score.innerHTML = `<span>${compteur}</span></br> Score`
                link.style.display = "block"
        }
    }



    // Password Generator
    var copyBtn = document.getElementById('copy');


    function getPassword(){
        var chars="0123456789abcdefghijklmnopqrstuvwxyz!@#$%^&*()ABCDEFGHIJKLMNOPQRSTUVWXYZ"
        var passwordLength =16;
        var password = "";

    //generer le mot de passe
        for(let i = 0; i < passwordLength ; i++){
            let randomNumber = Math.floor(Math.random() * chars.length)

            password += chars.substring(randomNumber , randomNumber + 1)

            // afficher le mot de passe
            document.getElementById('password').value = password;

            // changer le style du Bouton copier
            copyBtn.style.background= "#6c757d"
            copyBtn.style.color = "#fff"
        }
    }
    // copier le mot de passe
    function copyMdp(){
        var inputPassword = document.getElementById('password');

        // verifier la longueur du mot de passe
        if(inputPassword.value.length == 16){
            // copier le mot de passe
            inputPassword.select();
            document.execCommand("copy");
            

            // changer le style de bouton
            copyBtn.style.background = "transparent"
            copyBtn.style.color = "#000"

            // afficher une alert
            alert('mot de passe  copié !')
        }else{
            alert('veuillez générer un mot de passe')
        }
    }


     // Onglets Creator JS
     function openOnglet(evt , name){
        var i, tabcontent, tablinks;
        tabcontent = document.getElementsByClassName('tabcontent')
        for(i = 0; i <tabcontent.length ; i++){
            tabcontent[i].style.display = 'none';
        }
        tablinks = document.getElementsByClassName('tablinks');
        for(i = 0; i <tablinks.length ; i++){
            tablinks[i].className = tablinks[i].className.replace("active", "");
        }
        document.getElementById(name).style.display="block";
        // evt.currentTarget.className += "active";
    }

    openOnglet(event , 'Home');


    // Link Shortcut JS
    let error = document.querySelector('.error_message');
    let longLink = document.querySelector('.long_link');
    let short = document.querySelector('.result');

    function shortLinkFunct(){
        // verification input
        if(!longLink.value == ""){

            // vider l'error
            error.innerHTML = "";

            // connection API
            let url = `https://tinyurl.com/api-create.php?url=${encodeURIComponent(longLink.value)}`;// lien API en description
            fetch(url)
            .then(response => response.text())
            .then((data) => {
                if(data == "error"){
                    short.innerHTML = "lien invalide";
                }else{
                    short.innerHTML = data;
                }
            });

            // afficher le resultat
            short.style.display = "block";

            if(short.innerHTML.length == 0){
                short.innerHTML = "lien non valide !" 
            }
        }else{
            // error
            error.innerHTML = "Veuillez remplir le champ !";
            short.style.display = "none";
        }
    }


    // Get the calculator screen and buttons
const calculatorScreen = document.querySelector('.calculator-screen');
const calculatorKeys = document.querySelectorAll('.calculator-keys button');

// Define the calculator functions
const calculator = {
  displayValue: '',
  firstOperand: '',
  secondOperand: '',
  operator: '',
  result: '',

  // Function to handle button clicks
  handleButtonPress: (button) => {
    const { value } = button;

    // Handle number buttons
    if (!isNaN(value)) {
      calculator.displayValue += value;
      calculatorScreen.value = calculator.displayValue;
    }

    // Handle operator buttons
    if (['+', '-', '*', '/'].includes(value)) {
      calculator.operator = value;
      calculator.firstOperand = calculator.displayValue;
      calculator.displayValue = '';
    }

    // Handle equals button
    if (value === '=') {
      calculator.secondOperand = calculator.displayValue;
      calculator.calculateResult();
    }

    // Handle clear button
    if (value === 'all-clear') {
      calculator.clearCalculator();
    }

    // Handle delete button
    if (value === 'sup') {
      calculator.displayValue = calculator.displayValue.slice(0, -1);
      calculatorScreen.value = calculator.displayValue;
    }

    // Handle square root button
    if (value === 'v') {
      calculator.calculateSquareRoot();
    }

    // Handle factorial button
    if (value === '!') {
      calculator.calculateFactorial();
    }
  },

  // Function to calculate the result
  calculateResult: () => {
    const { firstOperand, secondOperand, operator } = calculator;
    let result;

    switch (operator) {
      case '+':
        result = parseFloat(firstOperand) + parseFloat(secondOperand);
        break;
      case '-':
        result = parseFloat(firstOperand) - parseFloat(secondOperand);
        break;
      case '*':
        result = parseFloat(firstOperand) * parseFloat(secondOperand);
        break;
      case '/':
        result = parseFloat(firstOperand) / parseFloat(secondOperand);
        break;
      default:
        result = '';
    }

    calculator.displayValue = result.toString();
    calculatorScreen.value = calculator.displayValue;
  },

  // Function to calculate the square root
  calculateSquareRoot: () => {
    const { displayValue } = calculator;
    const result = Math.sqrt(parseFloat(displayValue));

    calculator.displayValue = result.toString();
    calculatorScreen.value = calculator.displayValue;
  },

  // Function to calculate the factorial
  calculateFactorial: () => {
    const { displayValue } = calculator;
    let result = 1;

    for (let i = 1; i <= parseInt(displayValue); i++) {
      result *= i;
    }

    calculator.displayValue = result.toString();
    calculatorScreen.value = calculator.displayValue;
  },

  // Function to clear the calculator
  clearCalculator: () => {
    calculator.displayValue = '';
    calculator.firstOperand = '';
    calculator.secondOperand = '';
    calculator.operator = '';
    calculatorScreen.value = '';
  },
};

// Add event listeners to the buttons
calculatorKeys.forEach((button) => {
  button.addEventListener('click', () => {
    calculator.handleButtonPress(button);
  });
});
