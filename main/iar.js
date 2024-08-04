function showForm() {
  var formPopup = document.getElementById("form-popup");
  formPopup.style.display = "block";
}

function closeForm() {
  var formPopup = document.getElementById("form-popup");
  formPopup.style.display = "none";
}

function addCountryCode() {
var phoneNumberInput = document.getElementById("phone-number");
if (!phoneNumberInput.value.startsWith("+7")) {
    phoneNumberInput.value = "+7";
}
}


function allowOnlyNumbers(event) {
  var keyCode = event.keyCode || event.which;
  var key = String.fromCharCode(keyCode);
  var regex = /[0-9]/;
  if (!regex.test(key)) {
      event.returnValue = false;
      if(event.preventDefault) event.preventDefault();
  }
}
function limitPhoneNumberLength(event) {
  var phoneNumberInput = document.getElementById("phone-number");
  if (phoneNumberInput.value.startsWith("+7")) {
      if (phoneNumberInput.value.length >= 4 + 11) {
          event.preventDefault();
      }
  }
}
function submitForm(event) {
  event.preventDefault();
  var phoneNumber = document.getElementById("phone-number").value;
  
  var successMessage = document.getElementById("success-message");
  successMessage.style.display = "block";

  setTimeout(function () {
      var formPopup = document.getElementById("form-popup");
      formPopup.style.display = "none";
      successMessage.style.display = "none";
  }, 2000); 
}

var slideIndex = 1;
showSlides(slideIndex);

function plusSlides(n) {
  showSlides(slideIndex += n);
}

function currentSlide(n) {
  showSlides(slideIndex = n);
}

function showSlides(n) {
  var i;
  var slides = document.getElementsByClassName("mySlides");
  var dots = document.getElementsByClassName("dot");
  if (n > slides.length) {slideIndex = 1}    
  if (n < 1) {slideIndex = slides.length}
  for (i = 0; i < slides.length; i++) {
      slides[i].style.display = "none";  
  }
  for (i = 0; i < dots.length; i++) {
      dots[i].className = dots[i].className.replace(" active", "");
  }
  slides[slideIndex-1].style.display = "block";  
  dots[slideIndex-1].className += " active";
};
class Carousel {
    constructor(element, options) {
      this.element = element;
      this.showcaseImage = element.querySelector('.js-showcase-image');
      this.container = element.querySelector('.js-item-container');
      this.prev = element.querySelector('.js-prev');
      this.next = element.querySelector('.js-next');
      this.images = element.querySelectorAll('.js-item-image');
      
      this.items = [
        '/img/boxing.png',
        '/img/bas.png',
        '/img/zal.png',
        
      ];
      
      this.count = options.count;
      this.position = 0;
      
      if (!this.element) {
        throw new Error('Something is missing! Check the layout!');
      }
      
      this.init();
    }
    
    init() {
      window.addEventListener('keydown', this.catchKeyDown.bind(this));
      window.addEventListener('keyup', this.catchKeyUp.bind(this));
      this.prev.addEventListener('click', this.moveBack.bind(this));
      this.next.addEventListener('click', this.moveForward.bind(this));
      this.container.addEventListener('click', this.catchClick.bind(this));
      
      this.setup();
    }
    
    
    setup() {
      this.showcaseImage.setAttribute('src', this.items[0]);
      
      let index = 0;
      this.setImages(this.items);
    }
    
    
     
    catchKeyDown(event) {
      if (event.keyCode === 37) {
        this.lightOn(this.prev);
        this.moveBack();
      } else if (event.keyCode == 39) {
        this.lightOn(this.next);
        this.moveForward();
      }
    }
    
   
    lightOn(element) {
      element.querySelector('i').setAttribute('style', 'color: #F44336;');
    }
   
    moveBack() {
      const links = this.getLinks('back');
      this.setImages(links);  
    }
    
    
    getLinks(direction) {
      const src = [];
      if (direction === 'back') {
        switch(this.position) {
          case 0:
            src.push(this.items[this.count-1]);
            src.push(this.items[0]);
            src.push(this.items[1]);
            this.position = this.count - 1;
            break;
  
          case this.count-1:
            src.push(this.items[this.count-2]);
            src.push(this.items[this.count-1]);
            src.push(this.items[0]);
            --this.position;
            break;
  
          default:
            src.push(this.items[this.position-1]);
            src.push(this.items[this.position]);
            src.push(this.items[this.position+1]);
            --this.position;
        }
        
        return src;
      } else if (direction === 'forward') {
        switch(this.position) {
          case this.count-1:
            src.push(this.items[0]);
            src.push(this.items[1]);
            src.push(this.items[2]);
            this.position = 0;
            break;
            
          case this.count-2:
            src.push(this.items[this.count-1]);
            src.push(this.items[0]);
            src.push(this.items[1]);
            this.position++;
            break;
  
          case this.count-3:
            src.push(this.items[this.count-2]);
            src.push(this.items[this.count-1]);
            src.push(this.items[0]);
            this.position++;
            break;
  
          default:
            src.push(this.items[this.position+1]);
            src.push(this.items[this.position+2]);
            src.push(this.items[this.position+3]);
            this.position++;
        }
        
        return src;
      }
    }
    
    
    setImages(links) {
      let index = 0;
      Array.prototype.forEach.call(this.images, image => {
        image.setAttribute('src', '');
        image.setAttribute('src', links[index]);
        index++;
      });
    }
    
    
    moveForward() {
      const links = this.getLinks('forward');
      this.setImages(links);
    }
    
    
    catchKeyUp(event) {
      if (event.keyCode === 37) {
        this.lightOff(this.prev);
      } else if (event.keyCode == 39) {
        this.lightOff(this.next);
      }
    }
    
    
    lightOff(element) {
      element.querySelector('i').setAttribute('style', '');
    }
    
    
    catchClick(event) {
      const link = event.target.closest('.js-carousel-link');
      if (link) this.show(link);
    }
    
    
    show(element) {
      const src = element.querySelector('.js-item-image').getAttribute('src');
      this.showcaseImage.setAttribute('src', src);
    }
  }
    
  
  function initCarousel() {
    const carousel = [];
    Array.prototype.forEach.call(document.querySelectorAll('.js-carousel'), (item) => {
      carousel.push(new Carousel(item, {
        count: 11,
      }));
    });
  }
  
  initCarousel();
  Vue.filter('price', function(value) {
    value = parseInt(value);
    value = value.toFixed(2) + '₽';
    return value;
});

let menuitems = [
    {
        name: "Молочный белковый коктейль Ягодный",
        price: 190,
        active: false
    },
    {
        name: "Молочный белковый коктейль Шоколадный",
        price: 190,
        active: false
    },
    {
        name: "Молочный белковый коктейль Протеиновый",
        price: 150,
        active: false
    },
    {
        name: "Смузи Ягодный микс",
        price: 200,
        active: false
    },
    {
        name: "Смузи Фруктовый микс",
        price: 200,
        active: false
    },
    {
        name: "Батончик Just Bar",
        price: 120,
        active: false
    },
    {
        name: "Батончик Bombbar",
        price: 140,
        active: false
    }
];

new Vue ({
    el: "#menu",
    data: {
        menuitems: menuitems
    },
    methods: {
        switchActive: function(item) {
            item.active = !item.active;
            console.log(item.active);
        },
        total: function() {
            let totalPrice = 0;
            this.menuitems.forEach(function(item){
                if (item.active) {
                    totalPrice += item.price
                }
            });
            return totalPrice; 
        }
    }
});

