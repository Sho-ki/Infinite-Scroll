const imageContainer = document.getElementById('img-container');
const loader = document.getElementById('loader');
let folder = document.getElementById('folderButton');
let folderCheck = false
let bar = document.getElementById('bar')

let ready = false;
let imagesLoaded = 0;
let totalImages = 0;
let photoArray = [];

// GET API 
const num = 10;
const apiKey = 'kpBeS-NfQwb64vsdM0KzviiVNbcyiqxE7onyxUMSvU8';
const apiUrl = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${num}`

// Check if all images were loaded
function imageLoaded() {
    imagesLoaded++;
    
    if (imagesLoaded === totalImages) {
      ready = true;
      loader.hidden = true;
    }
  }
  
  // Helper Function to Set Attributes on DOM Elements
  function setAttributes(element, attributes) {
    for (let key in attributes) {
      element.setAttribute(key, attributes[key]);
    }
  }
  
  // Create Elements For Links & Photos, Add to DOM
function displayPhotos() {
    imagesLoaded = 0;
    totalImages = photosArray.length;
    // Run function for each object in photosArray
    photosArray.forEach((photo) => {
        // Create parant div tag
        let itemDiv = document.createElement('div');
        setAttributes(itemDiv, {
            class: "imageParent",
            id: "imageParent"
        })
        // Create star
      let star = document.createElement('i');
      setAttributes(star, {
          class: 'far fa-star star icon-d',
          onclick: 'stared(this)'
      })
      // Create <a> to link to full photo
      const item = document.createElement('a');
      setAttributes(item, {
        href: photo.links.html,
        target: '_blank',
      });
      // Create <img> for photo
      const img = document.createElement('img');
      setAttributes(img, {
        src: photo.urls.regular,
        alt: photo.alt_description,
        title: photo.alt_description,
      });
      
      // Event Listener, check when each is finished loading
      img.addEventListener('load', imageLoaded);
      // Put <img> inside <a>, then put both inside imageContainer Element
      imageContainer.appendChild(itemDiv)
      itemDiv.appendChild(star);
      item.appendChild(img);
      itemDiv.appendChild(item);
    });
  }

  // Get photos from Unsplash API
  async function getPhotos() {
    try {
      const response = await fetch(apiUrl);
      photosArray = await response.json();
      displayPhotos();
    } catch (error) {
      // Catch Error Here
    }
  }
  
  // Check to see if scrolling near bottom of page, Load More Photos
  // window.scrollY = Distance from top of page user has scrolled
// window.innerHeight = total height of browser window
  window.addEventListener('scroll', () => {
    if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 1000 && ready && folderCheck == false) {
      ready = false;
      getPhotos();
    } 
  });
  
  // On Load
  getPhotos();

// Change Background Color
function changeToLight(light){
    let body = document.getElementsByTagName('body');
    let currentColor = body[0].classList
    if(!currentColor.value){
        currentColor.add(light)
    } else {
        currentColor.remove(light)
    }
}

function stared(clicked){
        let stared = clicked.classList;
        let staredParent = clicked.parentNode;
        let fav = staredParent.classList
        if(stared.value.indexOf('far') >=0){
            stared.remove('far')
            stared.add('fas');
            fav.add('fav')   
        } else {
            stared.remove('fas')
            stared.add('far')
            fav.remove('fav')  
        } 
    }
    
    let htmlArray = [];
    // // Open Folder
        folder.addEventListener('click', ()=>{
        let displayPhotos = document.getElementsByClassName('fav')
        let imageParent = document.getElementsByClassName('imageParent')
            if(displayPhotos.length >0){
            for(let i = 0; i<imageParent.length; i++){
                    imageParent[i].style.display = 'none'
            }
                for(let i = 0; i<displayPhotos.length; i++){
                    displayPhotos[i].style.display = 'block'
            }
            let close = document.createElement('li');
            close.setAttribute('class', 'folderButton')
            close.innerHTML = '<button class="fav-button"><i class="fas fa-times-circle close" id="close"></i></button>'
            bar.replaceChild(close, folder)
            scrollTo(0,0);
            folderCheck = true;

            // Close Folder
                close.addEventListener('click', ()=>{
                    getPhotos();
                    folderCheck = false
                    bar.replaceChild(folder, close)
                })
        } else {
            alert('There is no pictures you put a star')
        }
        });
        
   