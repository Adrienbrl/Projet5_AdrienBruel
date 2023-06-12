// Les variables pour les filtres de la galerie
const filtersGallery = document.querySelectorAll("#gallery ul li");
const imageGallery = document.querySelectorAll("#gallery .gallery img");
const all = document.querySelector(".all");


// Les variables pour la modale
const modalTriggers = document.querySelectorAll(".gallery img, .overlay");
const modalContainer = document.querySelector(".modal-container");
const modal = document.querySelector(".modal");
const imagesOfGallery = document.querySelectorAll(".gallery img");
const returnButton = document.querySelector(".return");
const nextButton = document.querySelector(".next");
let counter = 0;

// Les filtres 
for (let filter of filters) {
  filter.addEventListener("click", function () {
    for (let filter of filters) {
      filter.classList.remove("active-tag");
    }
    filter.classList.add("active-tag");
    for (let image of images) {
      if (
        filter.getAttribute("data-gallery-tag") ===
        image.getAttribute("data-gallery-tag") || filter === all
      ) {
        image.style.display = "block";
      } else {
        image.style.display = "none";
      }
    }
  });
}

//Pour l'ouverture et la fermeture de la modale 
for (let trigger of modalTriggers) {
  trigger.addEventListener("click", function () {
    if (modalContainer.classList.contains("active-modal")) {
      modalContainer.classList.remove("active-modal");
    } else {
      modalContainer.classList.add("active-modal");
    }
  });
}

//Pour afficher les images de la gallerie dans la modale
for (let image of imagesOfGallery) {
  const imageCloneInModal = image.cloneNode(true);
  modal.append(imageCloneInModal);
}

//Pour afficher l'image de la galerie au clik dans la modale 
const imagesCloneInModal = document.querySelectorAll(".modal img");
let x = 0;

for (let image of imagesCloneInModal) {
  image.setAttribute("image-id", x++);
}

for (let imageOfGallery of imagesOfGallery) {
  imageOfGallery.addEventListener("click", function () {
    for (let image of imagesCloneInModal) {
      if (image.src === imageOfGallery.src) {
        image.classList.add("image-active-in-modal");
        counter = image.getAttribute("image-id");
      } else {
        image.classList.remove("image-active-in-modal");
      }
    }
  });
}

//Pour afficher l'image précédente dans la modale
function returnImage() {
  for (let image of imagesCloneInModal) {
    image.classList.remove("image-active-in-modal");
  }
  if (counter > 0) {
    counter--;
  } else {
    counter = imagesCloneInModal.length - 1;
  }
  imagesCloneInModal[counter].classList.add("image-active-in-modal");
}
returnButton.addEventListener("click", returnImage);

//Pour afficher l'image suivante dans la modale
function nextImage() {
  for (let image of imagesCloneInModal) {
    image.classList.remove("image-active-in-modal");
  }

  if (counter < imagesCloneInModal.length - 1) {
    counter++;
  } else {
    counter = 0;
  }
  imagesCloneInModal[counter].classList.add("image-active-in-modal");
}
nextButton.addEventListener("click", nextImage);

