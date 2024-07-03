// Кнопка показать еще
const btnLoadMore = document.querySelector('.section-quize-cards__load-more');
const cardsLength = document.querySelectorAll('.quize-card').length;

let cards = 6;

function startCards() {
   cards += 6;
   const arrayCards = Array.from(document.querySelector('.section-quize-cards__content').children);
   const visibleCards = arrayCards.slice(0, cards);

   visibleCards.forEach(element => {
      element.classList.add('quize-card--visible');
      element.style.display = 'flex';
   }
   );

   if (visibleCards.length === cardsLength) {
      btnLoadMore.style.display = 'none';
   }
}

btnLoadMore.addEventListener('click', startCards)

// Section Q&A - аккордеон
document.addEventListener('DOMContentLoaded', () => {
   const accordions = document.querySelectorAll('.js-accordeon');
   console.log(accordions);

   accordions.forEach(element => {
      element.addEventListener('click', (evt) => {
         const events = evt.currentTarget;

         const tabAccordeon = events.querySelector('.js-tab-accordeon');
         const contentAccordeon = events.querySelector('.js-content-accordeon');

         events.classList.toggle('js-active');

         // Accessibility - значение ARIA-атрибутов
         if (events.classList.contains('js-active')) {
            tabAccordeon.setAttribute('aria-expanded', true);
            contentAccordeon.setAttribute('aria-hidden', false);
         } else {
            tabAccordeon.setAttribute('aria-expanded', false);
            contentAccordeon.setAttribute('aria-hidden', true);
         }
      })
   })
})

// Фильтр для шаблонов по категориям
const conteinerCategories = document.querySelector('.categiries__filters-list-container');
const inputLabel = conteinerCategories.querySelectorAll('.filter-item__label');
const btnRemoveClass = conteinerCategories.querySelectorAll('.filter-item__btn');
const btnWrapCategories = document.querySelectorAll('.js-filter-item');

// отмена всплытия от label, чтобы не было двойного события клика
inputLabel.forEach(label => {
   label.addEventListener('click', function (evt) {
      evt.stopPropagation();
   });
});

function removeActiveClass(item) {
   item.classList.remove('active');
}


conteinerCategories.addEventListener('click', function (evt) {
   const events = evt.target;
   const btnClick = events.closest('.js-filter-item');

   btnWrapCategories.forEach(item => {
      item.classList.remove('active');
   });

   if (btnClick.classList.contains('active')) {
      btnClick.classList.remove('active');
   } else {
      btnClick.classList.add('active');
   }
})


// контейнер со всеми карточками (список)
const cardsArea = document.querySelector('.section-quize-cards__content');
// карточка
const card = cardsArea.querySelectorAll('.quize-card');

function filterCards() {
   conteinerCategories.addEventListener('click', evt => {
      const dataId = evt.target.id;


      switch (dataId) {
         case 'all':
            getItemCard('quize-card')
            break
         case 'furniture':
            getItemCard('furniture')
            break
         case 'realty':
            getItemCard('realty')
            break
         case 'tours':
            getItemCard('tours')
            break
         case 'kitchen':
            getItemCard('kitchen')
            break
         case 'other':
            getItemCard('other')
            break
         case 'health':
            getItemCard('health')
            break
         case 'interior':
            getItemCard('interior')
            break
         case 'cars':
            getItemCard('cars')
            break
         case 'courses':
            getItemCard('courses')
            break
      }
   })
}

filterCards();

function getItemCard(className) {
   // + проверка условия для отображения не более 6 карточек 
   let count = 0;
   card.forEach(item => {
      if (item.classList.contains(className)) {
         item.style.display = 'flex'
         count++;
         if (count > 6) {
            item.style.display = 'none'
            btnLoadMore.style.display = 'block';
         }
      } else {
         item.style.display = 'none'
         btnLoadMore.style.display = 'none';
      }
   })
}

// Кнопка показа фильтров на мобильной версии
function hiddenFilter() {
   btnWrapCategories.forEach(filter => {
      if (document.documentElement.clientWidth < 992) {
         filter.style.display = 'none';
      } else {
         filter.style.display = 'flex';
      }
   })
}

hiddenFilter();

function toggleFilters() {
   btnWrapCategories.forEach(item => {
      item.style.display = item.style.display === 'none' ? 'flex' : 'none';
   });
}


//Свайпер для section-questions
const sliderMobile = document.querySelector('.section-type-question__cards');
let mySwiper;

function mobileSlider() {
   if (window.innerWidth <= 767 && sliderMobile.dataset.mobile == 'false') {

      mySwiper = new Swiper(sliderMobile, {
         slideClass: 'section-type-question__card',
         wrapperClass: 'section-type-question__cards-wrapper',
         direction: 'horizontal',
         loop: true,
         spaceBetween: 20,
         slidesPerView: 1,
         pagination: {
            el: '.swiper-pagination',
            type: 'bullets',
         },

      });

      sliderMobile.dataset.mobile == 'true';
   }

   if (window.innerWidth > 767) {
      sliderMobile.dataset.mobile == 'false';

      if (sliderMobile.classList.contains('.swiper-initialized')) {
         mySwiper.destroy();
      }
   }
}

mobileSlider();

function resizeHandler() {
   mobileSlider();
   hiddenFilter();
};

window.addEventListener('resize', resizeHandler);