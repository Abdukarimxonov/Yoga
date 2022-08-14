function toggler(x) {
   x.classList.toggle("active");
   document.querySelector(".header__menu-list").classList.toggle("active");
}
"use strict";
function DynamicAdapt(type) {
   this.type = type;
}
DynamicAdapt.prototype.init = function () {
   const _this = this;
   this.оbjects = [];
   this.daClassname = "_dynamic_adapt_";
   this.nodes = document.querySelectorAll("[data-da]");
   for (let i = 0; i < this.nodes.length; i++) {
      const node = this.nodes[i];
      const data = node.dataset.da.trim();
      const dataArray = data.split(",");
      const оbject = {};
      оbject.element = node;
      оbject.parent = node.parentNode;
      оbject.destination = document.querySelector(dataArray[0].trim());
      оbject.breakpoint = dataArray[1] ? dataArray[1].trim() : "767";
      оbject.place = dataArray[2] ? dataArray[2].trim() : "last";
      оbject.index = this.indexInParent(оbject.parent, оbject.element);
      this.оbjects.push(оbject);
   }
   this.arraySort(this.оbjects);
   this.mediaQueries = Array.prototype.map.call(this.оbjects, function (item) {
      return '(' + this.type + "-width: " + item.breakpoint + "px)," + item.breakpoint;
   }, this);
   this.mediaQueries = Array.prototype.filter.call(this.mediaQueries, function (item, index, self) {
      return Array.prototype.indexOf.call(self, item) === index;
   });
   for (let i = 0; i < this.mediaQueries.length; i++) {
      const media = this.mediaQueries[i];
      const mediaSplit = String.prototype.split.call(media, ',');
      const matchMedia = window.matchMedia(mediaSplit[0]);
      const mediaBreakpoint = mediaSplit[1];
      const оbjectsFilter = Array.prototype.filter.call(this.оbjects, function (item) {
         return item.breakpoint === mediaBreakpoint;
      });
      matchMedia.addListener(function () {
         _this.mediaHandler(matchMedia, оbjectsFilter);
      });
      this.mediaHandler(matchMedia, оbjectsFilter);
   }
};
DynamicAdapt.prototype.mediaHandler = function (matchMedia, оbjects) {
   if (matchMedia.matches) {
      for (let i = 0; i < оbjects.length; i++) {
         const оbject = оbjects[i];
         оbject.index = this.indexInParent(оbject.parent, оbject.element);
         this.moveTo(оbject.place, оbject.element, оbject.destination);
      }
   } else {
      for (let i = 0; i < оbjects.length; i++) {
         const оbject = оbjects[i];
         if (оbject.element.classList.contains(this.daClassname)) {
            this.moveBack(оbject.parent, оbject.element, оbject.index);
         }
      }
   }
};
DynamicAdapt.prototype.moveTo = function (place, element, destination) {
   element.classList.add(this.daClassname);
   if (place === 'last' || place >= destination.children.length) {
      destination.insertAdjacentElement('beforeend', element);
      return;
   }
   if (place === 'first') {
      destination.insertAdjacentElement('afterbegin', element);
      return;
   }
   destination.children[place].insertAdjacentElement('beforebegin', element);
}
DynamicAdapt.prototype.moveBack = function (parent, element, index) {
   element.classList.remove(this.daClassname);
   if (parent.children[index] !== undefined) {
      parent.children[index].insertAdjacentElement('beforebegin', element);
   } else {
      parent.insertAdjacentElement('beforeend', element);
   }
}
DynamicAdapt.prototype.indexInParent = function (parent, element) {
   const array = Array.prototype.slice.call(parent.children);
   return Array.prototype.indexOf.call(array, element);
};
DynamicAdapt.prototype.arraySort = function (arr) {
   if (this.type === "min") {
      Array.prototype.sort.call(arr, function (a, b) {
         if (a.breakpoint === b.breakpoint) {
            if (a.place === b.place) {
               return 0;
            }
            if (a.place === "first" || b.place === "last") {
               return -1;
            }
            if (a.place === "last" || b.place === "first") {
               return 1;
            }
            return a.place - b.place;
         }
         return a.breakpoint - b.breakpoint;
      });
   } else {
      Array.prototype.sort.call(arr, function (a, b) {
         if (a.breakpoint === b.breakpoint) {
            if (a.place === b.place) {
               return 0;
            }
            if (a.place === "first" || b.place === "last") {
               return 1;
            }
            if (a.place === "last" || b.place === "first") {
               return -1;
            }
            return b.place - a.place;
         }
         return b.breakpoint - a.breakpoint;
      });
      return;
   }
};
const da = new DynamicAdapt("max");
da.init();

/*------------------*/
const swiper = new Swiper('.soul .swiper', {
   // Optional parameters
   direction: 'horizontal',
   loop: false,

   breakpoints: {
      // when window width is >= 320px
      320: {
         slidesPerView: 1,
      },
      // when window width is >= 480px
      650: {
         slidesPerView: 1.1,
      },
      // when window width is >= 640px
      1450: {
         slidesPerView: 1.6351,
      }
   },
   // Navigation arrows
   navigation: {
      nextEl: '.soul .swiper-button-next',
      prevEl: '.soul .swiper-button-prev',
   },

   // And if we need scrollbar
   scrollbar: {
      el: '.soul .swiper-scrollbar',
   },
   senteredSlides: false,

});
const reviewsSwiper = new Swiper('.reviews .swiper', {
   // Optional parameters
   direction: 'horizontal',
   loop: false,


   // Navigation arrows
   navigation: {
      nextEl: '.reviews .swiper-button-next',
      prevEl: '.reviews .swiper-button-prev',
   },

   // And if we need scrollbar
   scrollbar: {
      el: '.reviews .swiper-scrollbar',
   },
   senteredSlides: false,
   slidesPerView: 1,
});
const senseisSwiper = new Swiper('.sensei .swiper', {
   // Optional parameters
   direction: 'horizontal',
   loop: false,


   // Navigation arrows
   navigation: {
      nextEl: '.sensei .swiper-button-next',
      prevEl: '.sensei .swiper-button-prev',
   },

   // And if we need scrollbar
   scrollbar: {
      el: '.sensei .swiper-scrollbar',
   },
   senteredSlides: false,
   slidesPerGroup: 1,
   spaceBetween: 30,
   breakpoints: {
      // when window width is >= 320px
      320: {
         slidesPerView: 1.2,
      },
      // when window width is >= 480px
      650: {
         slidesPerView: 2,
      },
      // when window width is >= 640px
      900: {

         slidesPerView: 2.5,
      },
      1200: {
         slidesPerView: 3,
      },
   },
});

$(document).ready(function () {
   $("a").on('click', function (event) {
      if (this.hash !== "") {
         event.preventDefault();
         var hash = this.hash;
         $('html, body').animate({
            scrollTop: $(hash).offset().top
         }, 800, function () {
            window.location.hash = hash;
         });
      }
   });
});