const container = document.querySelector(".photo-container");

let count = 30;
let imageCount = 0;
let totalImage = 0
let ready = false;
const apiKey = "gcQmaJO17TJM9Oh-jV0wnbRUpYhJKgAu9lL7b4PHixA";
const apiUrl = `https://api.unsplash.com/photos/random?client_id=${apiKey}&count=${count}`;

function imageLoaded() {
  imageCount++;
  if(imageCount === totalImage){
    ready = true;
  }
}

// set attributes and values to elements

function setAttributes(element, attributes) {
  for(const key in attributes) {
    element.setAttribute(key, attributes[key])
  }
}

function displayPhoto(photosArray) {
  imageCount = 0;
  totalImage = photosArray.length;
  photosArray.forEach((element) => {
    // creat <a> element and give attributes to it
    const item = document.createElement('a');
    setAttributes(item, {
      href: element.links.html,
      target: "_blank"
    });
    // create <img> element and give attributes to it
    const image = document.createElement('img');
    setAttributes(image, {
      src: element.urls.regular,
      alt: element.description,
      title: element.description
    });
    // check if each image is loaded
    image.addEventListener("load", imageLoaded);
    // insert <img> in <a>
    item.appendChild(image);
    // insert <a> in the container
    container.appendChild(item);
  })
}

async function getPhotosFromApi() {
  try {
  const response = await fetch(apiUrl);
  const photosArray = await response.json();
  displayPhoto(photosArray);
  } catch(error) {

  }
  
}

window.addEventListener("scroll",() => {
  if(window.scrollY + window.innerHeight >= document.body.offsetHeight - 1000 && ready) {
    getPhotosFromApi();
    ready = false
  }
})

getPhotosFromApi();