// Кнопка показать еще
const btnLoadMore = document.querySelector('.section-quize-cards__load-more');
const cardsLength = document.querySelectorAll('.quize-card').length;

let cards = 6;

btnLoadMore.addEventListener('click', () => {
   cards +=6;
   const arrayCards = Array.from(document.querySelector('.section-quize-cards__content').children);
   const visibleCards = arrayCards.slice(0, cards);

   visibleCards.forEach(element => element.classList.add('quize-card--visible'));

   if (visibleCards.length === cardsLength) {
      btnLoadMore.style.display = 'none';
   }
})

// Section Q&A - аккордеон
document.addEventListener('DOMContentLoaded', () => {
   const accordions = document.querySelectorAll('.js-accordeon');
console.log(accordions);

   accordions.forEach( element => {
      element.addEventListener('click', (evt) => {
         const events = evt.currentTarget;

         const tabAccordeon = events.querySelector('.js-tab-accordeon');
         const contentAccordeon = events.querySelector('.js-content-accordeon');

         events.classList.toggle('js-active');

         // Accessibility - значение ARIA-атрибутов
         if(events.classList.contains('js-active')) {
            tabAccordeon.setAttribute('aria-expanded', true);
            contentAccordeon.setAttribute('aria-hidden', false);
         } else {
            tabAccordeon.setAttribute('aria-expanded', false);
            contentAccordeon.setAttribute('aria-hidden', true);
         }
      })
   })
})