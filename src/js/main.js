// Кнопка показать еще
const btnLoadMore = document.querySelector('.section-quize-cards__load-more');
const cardsLength = document.querySelectorAll('.quize-card').length;

let currentCategory = 'all'; // переменная для хранения текущей выбранной категории
let cards = 6;

function startCards() {
   cards += 6;
   const arrayCards = Array.from(document.querySelector('.section-quize-cards__content').children);
   const visibleCards = arrayCards.slice(0, cards);

   visibleCards.forEach(element => {
      if (currentCategory === 'all' || element.classList.contains(currentCategory)) {
         element.classList.add('quize-card--visible');
         element.style.display = 'flex';
      }
   });

   if (visibleCards.length === cardsLength) {
      btnLoadMore.style.display = 'none';
   }
}

btnLoadMore.addEventListener('click', startCards);

// Section Q&A - аккордеон
document.addEventListener('DOMContentLoaded', () => {
   const accordions = document.querySelectorAll('.js-accordeon');

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

conteinerCategories.addEventListener('click', function (evt) {
   const events = evt.target;
   const btnClick = events.closest('.js-filter-item');

   btnWrapCategories.forEach(item => {
      item.classList.remove('active');
      item.setAttribute('aria-selected', false);
   });

   if (btnClick.classList.contains('active')) {
      btnClick.classList.remove('active');
   } else {
      btnClick.classList.add('active');
      btnClick.setAttribute('aria-selected', true);
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
   // сохраняем выбранную категорию
   currentCategory = className;
   // + проверка условия для отображения не более 6 карточек 
   let count = 0;

   card.forEach(item => {
      item.style.display = 'none';
   });

   card.forEach(item => {
      if (item.classList.contains(className)) {
         item.style.display = 'flex'
         count++;
         if (count >= 6) {
            // item.style.display = 'none'
            btnLoadMore.style.display = 'block';
         } else {
            btnLoadMore.style.display = 'none';
         }
      }

      console.log(currentCategory.length);
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


// Анимация intro
const sectionIntro = document.querySelector('.intro');
const iconBtnBuy = document.querySelector('.btn-buy__icon');

function randomCircle(x, y) {
   return (x + (Math.random() * (y - x)));
}

// интервал размеров элемента
const s = randomCircle(20, 28);

// вариант с кружками и транслейтом
// for (let i = 0; i < 12; i++) {
//    sectionIntro.innerHTML += '<div class="circle-intro-decor" style=" width: ' + randomCircle(6, 10) + 'px; height: ' + randomCircle(6, 10) + 'px; animation-duration: ' + randomCircle(10, 30) + 's; top: ' + randomCircle(0, 100) + '%; left: ' + randomCircle(0, 100) + '%;"></div>';
// }


// розовые элм. слева
for (let i = 0; i < 5; i++) {
   sectionIntro.innerHTML += '<svg class="intro__decor-1" \
   style=" animation-duration: ' + randomCircle(5, 15) + 's; \
   top: ' + randomCircle(10, 100) + '%; left: ' + randomCircle(0, 20) + '%; \
   width: ' + s + 'px; height: ' + s + 'px;"  viewBox="0 0 17 17" fill="none" \
   xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" \
   d="M6.80002 3.57002C6.80002 5.4478 5.27778 6.97003 3.40001 6.97003L1.53 6.97003C0.685004 6.97003 -3.34612e-07 7.65504 -3.71548e-07 8.50003V8.50003C-4.08485e-07 9.34503 0.685004 10.03 1.53 10.03L3.40001 10.03C5.27778 10.03 6.80002 11.5523 6.80002 13.43L6.80002 15.47C6.80002 16.315 7.48502 17 8.33002 17V17C9.17501 17 9.86002 16.315 9.86002 15.47L9.86002 13.515C9.86002 11.5903 11.4203 10.03 13.345 10.03L15.47 10.03C16.315 10.03 17 9.34503 17 8.50003V8.50003C17 7.65504 16.315 6.97003 15.47 6.97003L13.345 6.97003C11.4203 6.97003 9.86002 5.40974 9.86002 3.48502L9.86002 1.53C9.86002 0.685004 9.17501 -3.42041e-07 8.33002 -3.78977e-07V-3.78977e-07C7.48502 -4.15913e-07 6.80002 0.685004 6.80002 1.53L6.80002 3.57002Z"\
   fill="#fb2dc9" fill-opacity=".8" /></svg>';
};


// фиолетовые элм. справа
for (let i = 0; i < 6; i++) {
   sectionIntro.innerHTML += '<svg class="intro__decor-5" \
   style=" animation-duration: ' + randomCircle(5, 15) + 's; \
   top: ' + randomCircle(0, 80) + '%; right: ' + randomCircle(0, 30) + '%; \
   width: ' + s + 'px; height: ' + s + 'px;" viewBox="0 0 22 22" fill="none"  xmlns="http://www.w3.org/2000/svg"> \
   <path fill="#8264FC" fill-rule="evenodd" \
   d="M8.8 4.62a4.4 4.4 0 0 1-4.4 4.4H1.98a1.98 1.98 0 0 0 0 3.96H4.4a4.4 4.4 0 0 1 4.4 4.4v2.64a1.98 1.98 0 0 0 3.96 0v-2.53a4.51 4.51 0 0 1 4.51-4.51h2.75a1.98 1.98 0 0 0 0-3.96h-2.75a4.51 4.51 0 0 1-4.51-4.51V1.98a1.98 1.98 0 0 0-3.96 0v2.64Z"\
   clip-rule="evenodd" /> </svg>';
};