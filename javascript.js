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
    //le retard ajouté n'est pas linéaire, il augmente de + en + (bien qu'il soit légé)
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

//test
const myName = "Paul"

console.log("Mon nom est :");
console.log(myName); 






//intersect1 vid couleur bas
//la fonction suivante reduit la video en 1920x108 pour ne prendre que la partie basse,
//ensuite fais la moyenne des pixels pour la gauche, le millieu et la droite et ecrase 
//en 3x1 pixels --> sert ensuite a faire le degradé  

//prend les couleur de la video et les appliques a la classe intersect
const vid = document.getElementById("vid1");
const intersect = document.querySelector(".intersect1");

//on crée ici un canva invisible de 3x1 pixel --> il y en a un pour la gauche, le milieu et la droit
//(pas visible --> en memoire) 
const canvas = document.createElement("canvas");
canvas.width = 3;
canvas.height = 1;

//ctx = dessin pour le canva 
const ctx = canvas.getContext("2d", { willReadFrequently: true });
//willReadFrequently = permet de dire au site que l'information va regulierement changer 
//le canva est donc dans la memoire /= carte graphique --> plus rapide de getImageData
ctx.imageSmoothingQuality = "high";

//garde l'heure de la derniere maj
let lastUpdate = 0;

function updateColors(time) {
  // update 10 fois par seconde environ si la derniere maj date d'il y a plus de 100ms
  //permet de faire 10 calculs par seconde au lieu de 60
  if (time - lastUpdate > 100 && vid.videoWidth > 0) {
  //pour que la fonction ne se relance pas avant d'etre au minimum a 100ms
    lastUpdate = time;

    const stripHeight = vid.videoHeight * 0.1;   // prend le bas de la video == 108px
    //si le haut est jaune/ le bas blanc alors le bas sera blanc

    try {
      // ecrase les pixels en 3x1 (donc 1920x108 devient 3x1 
      // --> moyenne global des pixels dans leurs bandes respectives)
      ctx.drawImage(
        vid,
        0, vid.videoHeight - stripHeight, vid.videoWidth, stripHeight,
        0, 0, 3, 1
        //les pixels sont compris dans un tab de nombres (pour les couleurs)
        //rouge,vert,bleu,opacité --> pas besoin de l'opacité donc on saute ce dernier  
      );
      const d = ctx.getImageData(0, 0, 3, 1).data;

      const left   = `rgb(${d[0]}, ${d[1]}, ${d[2]})`;
      const center = `rgb(${d[4]}, ${d[5]}, ${d[6]})`;
      const right  = `rgb(${d[8]}, ${d[9]}, ${d[10]})`;
      //en fonction des valeurs de pixels recupérer on forme un autre couleur rvb en string
      //par exemple left = rgb(012) ...
      intersect.style.background =
        `linear-gradient(90deg, ${left}, ${center}, ${right})`;
        //ici on fait le degradé --> les valeurs présente dans le string remplace left/right/center

    } catch (e) {
      console.warn("Cannot read the video pixels:", e.message);
      return;   // renvoie un message d'erreur, le return permet de quitter la fonction pour ne pas renvoyer 60 fois l'erreur par secondes

    }
  }
  requestAnimationFrame(updateColors);
} //se prepare pour l'image suivante 

vid.addEventListener("playing", () => requestAnimationFrame(updateColors));

// la boucle se lance que lorque la video est lancé, sinon elle ne demarre pas








//Carousel*

(function () {
    // Utilisation de la directive "use strict" pour activer le mode strict en JavaScript
    // Cela implique une meilleure gestion des erreurs et une syntaxe plus stricte pour le code
    // Déclare la constante pour la durée de chaque slide
    const slideTimeout = 5000;
    // Récupère les boutons de navigation
    const prev = document.querySelector('#prev');
    const next = document.querySelector('#next');
    // Récupère tous les éléments de type "slide"
    const $slides = document.querySelectorAll('.slide');
    // Initialisation de la variable pour les "dots"
    let $dots;
    // Initialisation de la variable pour l'intervalle d'affichage des slides
    let intervalId;
    // Initialisation du slide courant à 1
    let currentSlide = 1;
    // Fonction pour afficher un slide spécifique en utilisant un index
    function slideTo(index) {
        // Vérifie si l'index est valide (compris entre 0 et le nombre de slides - 1)
        currentSlide = index >= $slides.length || index < 1 ? 0 : index;
        // Boucle sur tous les éléments de type "slide" pour les déplacer
        $slides.forEach($elt => $elt.style.transform = `translateX(-${currentSlide * 100}%)`);
        // Boucle sur tous les "dots" pour mettre à jour la couleur par la classe "active" ou "inactive"
        $dots.forEach(($elt, key) => $elt.classList = `dot ${key === currentSlide? 'active': 'inactive'}`);
    }
    // Fonction pour afficher le prochain slide
    function showSlide() {
        slideTo(currentSlide);
        currentSlide++;
    }
    // Boucle pour créer les "dots" en fonction du nombre de slides
    for (let i = 1; i <= $slides.length; i++) {
        let dotClass = i == currentSlide ? 'active' : 'inactive';
        let $dot = `<span data-slidId="${i}" class="dot ${dotClass}"></span>`;
        document.querySelector('.carousel-dots').innerHTML += $dot;
    }
    // Récupère tous les "dots"
    $dots = document.querySelectorAll('.dot');
    // Boucle pour ajouter des écouteurs d'événement "click" sur chaque "dot"
    $dots.forEach(($elt, key) => $elt.addEventListener('click', () => slideTo(key)));
    // Ajout d'un écouteur d'événement "click" sur le bouton "prev" pour afficher le slide précédent
    prev.addEventListener('click', () => slideTo(--currentSlide))
    // Ajout d'un écouteur d'événement "click" sur le bouton "next" pour afficher le slide suivant
    next.addEventListener('click', () => slideTo(++currentSlide))
    // Initialisation de l'intervalle pour afficher les slides
    intervalId = setInterval(showSlide, slideTimeout)
    // Boucle sur tous les éléments de type "slide" pour ajouter des écouteurs d'événement pour les interactions avec la souris et le toucher
    $slides.forEach($elt => {
        let startX;
        let endX;
        // Efface l'intervalle d'affichage des slides lorsque la souris passe sur un slide
        $elt.addEventListener('mouseover', () => {
            clearInterval(intervalId);
        }, false)
        // Réinitialise l'intervalle d'affichage des slides lorsque la souris sort d'un slide
        $elt.addEventListener('mouseout', () => {
            intervalId = setInterval(showSlide, slideTimeout);
        }, false);
        // Enregistre la position initiale du toucher lorsque l'utilisateur touche un slide
        $elt.addEventListener('touchstart', (event) => {
            startX = event.touches[0].clientX;
        });
        // Enregistre la position finale du toucher lorsque l'utilisateur relâche son doigt
        $elt.addEventListener('touchend', (event) => {
            endX = event.changedTouches[0].clientX;
            // Si la position initiale est plus grande que la position finale, affiche le prochain slide
            if (startX > endX) {
                slideTo(currentSlide + 1);
                // Si la position initiale est plus petite que la position finale, affiche le slide précédent
            } else if (startX < endX) {
                slideTo(currentSlide - 1);
            }
        });
    })
})()


form.addEventListener("submit", () => {
  event.preventDefault();
  console.log("Le Formulaire a été envoyé !");

})