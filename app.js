'use strict';

// adding images to object for quick access to url when opening full size image
let images = {};

// event listener that loads images from Unsplash API when window loads
window.addEventListener('load', async function() {
  let API = 'https://api.unsplash.com/';
  let response = await fetch(`${API}photos?per_page=64&query=house&client_id=zFDlTRQqjJs1GfiHkIGGeGJYpE9QAW3J3H-z7uV50xk`)
  let data = await response.json();
  images = data;
  console.log(data[0]);

  let gallery = document.getElementById('photo-gallery');

  data.map((item) => {
    let listItem = document.createElement('li');
    let image = document.createElement('img');
    image.alt = item.alt_description;
    image.src = item.urls.small;
    image.id = item.id;
    if (item.width > item.height) {
      image.className = "horizontalImage";
    } else if (item.width === item.height) {
      image.className = "squareImage";
    } else {
      image.className = "verticalImage";
    }
    gallery.append(listItem);
    listItem.append(image);
  })

})

// Boolean that is used to determine if full size image is open
let open = false;

// full size image event listener
let imageContainer = document.getElementById('photo-gallery');
imageContainer.addEventListener('click', function (event) {
  if(open === true) {
    return;
  }
  let id = event.target.id;
  let imageContainer = document.getElementById('fullSizeImageContainer');
  images.map((item) => {
      if(item.id === id) {
        open = true;
        let container = document.createElement('div');
        let image = document.createElement('img');
        let button = document.createElement('button');
        let caption = document.createElement('p');
        image.src = item.urls.regular;
        container.id = "container";
        if (item.width >= item.height) {
          image.className = "horizontal";
        } else {
          image.className = "vertical";
        }
        button.id = "closeButton";
        caption.id = "imageCaption";
        button.innerText = 'Close';
        caption.innerText = `© ${item.user.username}, provided by Unslpash`;
        imageContainer.append(container);
        container.append(button);
        container.append(image);
        container.append(caption);

      }
      close();
  })

})

// close image event listener, remove elements from DOM
function close () {
  if(open === true) {
    document.getElementById('closeButton').addEventListener('click', function (e) {
      e.preventDefault();
      document.getElementById("container").remove();
    })
    open = false;
  
  }
}
