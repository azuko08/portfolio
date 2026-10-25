const form = document.querySelector(".contact-form");

const nameInput = document.querySelector("#name-input");
const emailInput = document.querySelector("#email-input");
const messageInput = document.querySelector("#message-input");

const nameEmpty = document.querySelector(".nameempty");
const emailEmpty = document.querySelector(".emailempty");
const messageEmpty = document.querySelector(".messageempty");

const formSuccess = document.querySelector(".formSuccess");
const formSuccessContainer = document.querySelector(".formSuccessContainer");

form.addEventListener("submit", (event) => {
    event.preventDefault();

        [nameEmpty, emailEmpty, messageEmpty, formSuccess].forEach((el) => {
        el.classList.add("hidden");
    });

    //test

    const name = nameInput.value.trim();
    const email = emailInput.value.trim();
    const message = messageInput.value.trim();


    let isValid = true;


    if (name === "") {
        nameEmpty.classList.remove("hidden");
        isValid = false;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
// ^ --> debut du texte, signifie sauf dans les crochets
//[^\s@]+ --> partie avant le @ ([...] = ensemble des caractères, \s --> espace ou
// meme tabulation ..., "+" signifie un ou plusieurs caractères )

//[^\s@]+ --> nom de domaine (au moins un caractères apres l'@ sans espace et sans second @)
// \. --> il faut un point (point tout seul signifie tout les caractères donc on rajoute \)
//[^\s@]+ --> idem ici, il faut un caractères minimum apres le point (touours pas de point
// , d'espace ou d'@)

//$ pour indiquer la fin du texte


    if (
        email === "" ||
        /\s/.test(email) ||
        !emailRegex.test(email)
    ) {
        emailEmpty.classList.remove("hidden");
        isValid = false;
    }

    if (message === "") {
        messageEmpty.classList.remove("hidden");
        isValid = false;
    }

    if (isValid) {
        formSuccess.classList.remove("hidden");
        form.reset();   
    }

    if (isValid) {
        formSuccessContainer.classList.remove("hidden");
        formSuccess.classList.remove("hidden");
        form.reset();
    }

});



const container = document.getElementById("cursor-container");

const blobs = new Array();
const numBlobs = 6;

let mouseX = window.innerWidth / 1;
let mouseY = window.innerHeight / 1 ;

window.addEventListener("mousemove", function(e) {
  mouseX = e.clientX;
  mouseY = e.clientY;
});

// ici on rajoute les blobs qui "traine" derriere le pointeur (chacun des blobs a un 
// parent), le parent est le précedent blob crée 
for (let i = 0; i < numBlobs; i++) {
  const el = document.createElement("div");
  el.className = "blob";
  container.appendChild(el);
  
  //ici on crée les blobs en prenant compte des coordonnées de la souris 
  const blobObj = new Object();
  blobObj.el = el;
  blobObj.x = mouseX;
  blobObj.y = mouseY;
  
  //on reduit la taille et a chaque fois on applique au prochain blob
  const size = 35 - (i * 7);
  el.style.width = size + "px";
  el.style.height = size + "px";
  
  blobs.push(blobObj);
}

// Pour que les blobs bougent avec la souris
function animateGoo() {
  let targetX = mouseX;
  let targetY = mouseY;
  
  blobs.forEach(function(blobObj) {
    // Fait en sorte que les blobs suivant soit un peu en retard 
    blobObj.x += (targetX - blobObj.x) * 0.3;
    blobObj.y += (targetY - blobObj.y) * 0.3;
    
    blobObj.el.style.left = blobObj.x + "px";
    blobObj.el.style.top = blobObj.y + "px";
    
    targetX = blobObj.x;
    targetY = blobObj.y;
  });
  
  window.requestAnimationFrame(animateGoo);
}




animateGoo();