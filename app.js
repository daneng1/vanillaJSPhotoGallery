'use strict';

// adding images to object for quick access to url when opening full size image
let images = {};

// event listener that loads images from Unsplash API when window loads
window.addEventListener('load', async function() {
  let API = 'https://api.unsplash.com/';
  let response = await fetch(`${API}photos?per_page=64&query=house&client_id=zFDlTRQqjJs1GfiHkIGGeGJYpE9QAW3J3H-z7uV50xk`)
  let data = await response.json();
  images = data;
  console.log(images);

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
let index = 0;

// full size image event listener
let gallery = document.getElementById('photo-gallery');
gallery.addEventListener('click', function (e) {
  // console.log('made it to event');
  if(open === true) {
    return;
  }
  let id = e.target.id;
  let imageContainer = document.getElementById('fullSizeImageContainer');
  images.map((item, idx) => {
      if(item.id === id) {
        open = true;
        index = idx;
        let container = document.createElement('div');
        let innerContainer = document.createElement('div');
        let image = document.createElement('img');
        let closeButton = document.createElement('button');
        let forward = document.createElement('p');
        let reverse = document.createElement('p');
        let caption = document.createElement('p');
        image.src = item.urls.regular;
        image.id = 'fullSizeImage';
        container.id = "container";
        innerContainer.id = "innerContainer";
        if (item.width >= item.height) {
          image.className = "horizontal";
        } else {
          image.className = "vertical";
        }
        closeButton.id = "closeButton";
        caption.id = "imageCaption";
        closeButton.innerText = 'Close';
        caption.innerText = `© ${item.user.username}, provided by Unslpash`;
        forward.id = 'forwardButton';
        reverse.id = 'reverseButton';
        forward.innerText = "»";
        reverse.innerText = "«";
        imageContainer.append(container);
        container.append(closeButton);
        container.append(innerContainer);
        innerContainer.append(reverse);
        innerContainer.append(image);
        innerContainer.append(caption);
        innerContainer.append(forward);

      }
      forward();
      reverse();
      close();
  })

})

// close image event listener, remove elements from DOM
function close () {
  if (open === true) {
    document.getElementById('closeButton').addEventListener('click', function (e) {
      e.preventDefault();
      document.getElementById("container").remove();
    })
    open = false;
  
  }
}

const forward = () => {
  if (open === true) {
    document.getElementById("forwardButton").addEventListener('click', function (e) {
      e.preventDefault();
      if (index === images.length) {
        document.getElementById("forwardButton").style.display('none');
      }
      for (let i = 0; i < images.length; i++) {
        const newItemIndex = index + 1;
        if (i === newItemIndex ) {
          // console.log(i, newItem);
          const item = images[i];
          let image = document.getElementById('fullSizeImage');
          image.src = item.urls.regular;
          if (item.width >= item.height) {
            image.className = "horizontal";
          } else {
            image.className = "vertical";
          }
          let caption = document.getElementById("imageCaption");
          caption.innerText = `© ${item.user.username}, provided by Unslpash`;
        }
      }
      index++;
    })
  } else {
    return;
  }
}

const reverse = () => {
  if (open === true) {
    document.getElementById("reverseButton").addEventListener('click', function (e) {
      e.preventDefault();
      console.log(index);
      if (index === 0) {
        document.getElementById("reverseButton").innerText('');
      }
      // console.log('initial index', index);
      for (let i = 0; i < images.length; i++) {
        const newItemIndex = index - 1;
        if (i === newItemIndex ) {
          const item = images[i];
          let image = document.getElementById('fullSizeImage');
          image.src = item.urls.regular;
          if (item.width >= item.height) {
            image.className = "horizontal";
          } else {
            image.className = "vertical";
          }
          let caption = document.getElementById("imageCaption");
          caption.innerText = `© ${item.user.username}, provided by Unslpash`;
        }
      }
      index--;
    })
  } else {
    return;
  }
}
