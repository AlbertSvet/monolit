new Swiper('.image-slider',{
    navigation: {
        nextEl: '.salon__right',
        prevEl: '.salon__left',
    },
     slidesPerView:5,
     loop:true,
     spaceBetween:20,
     speed:4000,
     centeredSlides: true,
    
     
   
    pagination: {
        el: '.swiper-pagination',
        dynamicBullets: true,
        type: 'bullets',
    }, 
    autoplay: {
        delay: 100,

    }, 

    breakpoints: {
        320: {
            slidesPerView:2,
            
        },
        480: {
            slidesPerView:3,
            
        },
        768: {
            slidesPerView:5,
        }
        

        
       

    },

});


// =============================================================================================================//
// Бургер-меню
  const trigerBtn = document.querySelector('.burger');
  const content = document.querySelector('.menu-laptop');
  const body = document.querySelector('body');
  const pagin = document. querySelector('.header__pagin ');
  trigerBtn.addEventListener('click', (e) =>{
    if(e.target === trigerBtn) {
        content.classList.toggle('active');
        body.classList.toggle('lock');
        
    } if (content.classList.contains('active')) {
        pagin.style.display = 'none';
        }else{
            pagin.style.display = 'flex';
        }
  })

// =============================================================================================================//

const section = document.querySelectorAll('[data-act]');
const btn = document.querySelectorAll('.pagin__btn');
btn[0].classList.add('active');
window.addEventListener('scroll', () => {
    let scrollDistance = window.scrollY;
    
    section.forEach((el, i) => {
        
        if (el.offsetTop <= scrollDistance) {
            
            btn.forEach(btnEl => {
                btnEl.classList.remove('active');
            });
            btn[i].classList.add('active');
        }
    });
});
btn.forEach((btnEl, index) => {
    btnEl.addEventListener('click', () => {
        section[index].scrollIntoView({ behavior: 'smooth' });
    });
});

//========

  // Функция для вычисления и вывода общей стоимости
function updateTotalPrice() {
    // Получаем цену выбранной кнопки и значение слайдера
    const activeButton = document.querySelector('.img4__button.active');
    const priceBtn = parseInt(activeButton.dataset.price);
    const sliderValue = $(".range-slider").roundSlider("option", "value");

    // Вычисляем и выводим общую стоимость
    const totalPrice = priceBtn * sliderValue;
    const formatter = new Intl.NumberFormat("ru-RU", {
        style: "currency",
        currency: "RUB",
        maximumFractionDigits: 0
    });
    const formattedNumber = formatter.format(totalPrice);
    // const formattedNumber = new Intl.NumberFormat("ru-RU").format(totalPrice);
    $('.img4__total').text(formattedNumber);
}

// Добавляем обработчик события изменения значения слайдера
$(".range-slider").roundSlider({
    radius: 120,
    width: 14,
    handleSize: "+16",
    handleShape: "dot",
    sliderType: "min-range",
    value: 64,
    min: 1,
    max: 301,
    startAngle: 90,
    change: function (e) {
        // При изменении значения слайдера вызываем функцию обновления общей стоимости
        updateTotalPrice();
    }
});

// Добавляем обработчики событий для кнопок
const tabs = document.querySelectorAll('.img4__button');
const btnArrow = document.querySelectorAll('.img4__arrow');
const bodrderArrow = document.querySelector('.img4__border');

tabs.forEach((tab, index) => {
    tab.addEventListener('click', (e) => {
        // Сначала убираем активный класс у всех кнопок и стрелок
        tabs.forEach((tab) => tab.classList.remove('active'));
        // btnArrow.forEach((btn) => btn.classList.remove('active'));

        // Затем добавляем активный класс к выбранной кнопке
        tab.classList.add('active');
        btnArrow[index].classList.add('active');
        btnArrow.forEach(item =>{
            if(item.classList.contains('active')) {
                bodrderArrow.classList.add('act');
            }else{
                bodrderArrow.classList.remove('act');
            }
        })
      
       
        // При клике на кнопку вызываем функцию обновления общей стоимости
        updateTotalPrice();
    });
});


// Вызываем функцию обновления общей стоимости сразу после загрузки страницы
updateTotalPrice();
//===========rangeTwo


const circle = document.querySelector('.progress-ring__circle');
const r = circle.r.baseVal.value;
const circumference = 2 * Math.PI * r;
const input = document.querySelector('.percente');

circle.style.strokeDasharray = `${circumference} ${circumference}`;
circle.style.strokeDashoffset = circumference;

function setProgress(percent) {
  const offset = circumference - percent / 6 * circumference;
  circle.style.strokeDashoffset = offset;
}

setProgress(0);

input.addEventListener('input', function () {
  setProgress(input.value);
});

const rangeBtn = document.querySelectorAll('[data-btn]');
const rangeInput = document.querySelector('.percente');
const tabRange = document.querySelectorAll('.img5__item');
let lastClickedIndex = null;
// rangeBtn.forEach((btn, index) => {
//     btn.addEventListener('click', () => {
//       if (index > 0 && index !== lastClickedIndex) { // Начинаем увеличивать value начиная с индекса 1 и проверяем на совпадение индексов
//         rangeInput.value = index+0; // Устанавливаем значение равным индексу кнопки плюс 1
//         setProgress(parseInt(rangeInput.value)); // Обновляем прогресс
//         lastClickedIndex = index; // Обновляем последний нажатый индекс
//       }
//     });
//   });
function hideTabRange () {
    tabRange.forEach(item =>{
        item.style.display ='none';
    })
    rangeBtn.forEach((item)=>{
        item.classList.remove('active');
    })
}

function showTabRange (index = 6 ) {
    tabRange[index].style.display = 'flex';
    rangeBtn[index].classList.add('active');
}
hideTabRange();
showTabRange(1);
rangeBtn.forEach((btn, index ) =>{
    btn.addEventListener('click', (e) =>{
        if(e.target == btn) {
            hideTabRange();
            showTabRange(index);
        }
    })
})
rangeBtn.forEach((btn, index) => {
    btn.addEventListener('click', () => {
        if (index === 0 && parseInt(rangeInput.value) === 5) { // Если нажата кнопка с индексом 0 и значение input равно 5
            rangeInput.value = parseInt(rangeInput.value) + 1; // Увеличиваем значение на 1
        } else if (index > 0 && index !== lastClickedIndex) { // Для остальных кнопок увеличиваем значение на 1
            rangeInput.value = index + 0; // Устанавливаем значение равным индексу кнопки плюс 0
        }
        setProgress(parseInt(rangeInput.value)); // Обновляем прогресс
        lastClickedIndex = index; // Обновляем последний нажатый индекс
    });
});

setProgress(parseInt(rangeInput.value = 1))




//=======================
const trigerAccardion = document.querySelectorAll('.img3__subtitle');
const contentAccardion = document.querySelectorAll('.img3__subtext');
const bodyAfter = document.querySelectorAll('.img3__item ');
const linkYelow = document.querySelectorAll('.img3__link-yelow');
trigerAccardion.forEach((btn, j) =>{
    btn.addEventListener('click', (e) =>{
        if(window.matchMedia("(max-width: 768px)").matches) {
            if(e.target == btn) {
                contentAccardion.forEach((content,i) =>{
                    if(j == i) {
                        content.classList.toggle('acti');
                    }
                    
                });
                bodyAfter.forEach((after,g)=>{
                    if(j == g) {
                        after.classList.toggle('acti');
                    }
                })
                linkYelow.forEach((link,f)=>{
                    if(j == f) {
                        link.classList.toggle('acti');
                    }
                })

               
            }
        }
       
     
    })
})

//===== Pop-call

const btnPopCall = document.querySelectorAll('[data-call]');
const popUpCall = document.querySelector('.popUp-call');
const burgerBtn = document.querySelector('.burger');
const closeBtn = document.querySelector('.close-Btn');
btnPopCall.forEach(btn =>{
    btn.addEventListener('click', (e) =>{
        
        popUpCall.classList.toggle('active');
        
        if (popUpCall.classList.contains('active')) {         

            pagin.style.display = 'none';
            burgerBtn.style.display = 'none';
            closeBtn.style.display = 'block';
            content.classList.remove('active');
            body.classList.add('lock');
            }else{
                pagin.style.display = 'flex';
                burgerBtn.style.display = 'block';
                closeBtn.style.display = 'none';
                body.classList.remove('lock');
            }
    })
   
});
closeBtn.addEventListener('click', () =>{
    popUpCall.classList.remove('active');
    body.classList.remove('lock');
    closeBtn.style.display = 'none';    
    burgerBtn.style.display = 'block';
    pagin.style.display = 'flex';
})




// =============================================================================================================//


// Анимация при скролле

// window.addEventListener('load', ()=>{


//     const animItems = document.querySelectorAll('._anim-items');

//     if (animItems.length > 0) {
//         window.addEventListener('scroll', animOnScroll);
//         function animOnScroll() {
//             for (let index = 0; index < animItems.length; index++) {
//                 const animItem = animItems[index];
//                 const animItemHeight = animItem.offsetHeight;
//                 const animItemOffset = offset(animItem).top;
//                 const animStart = 4;

//                 let animItemPoint = window.innerHeight - animItemHeight / animStart;

//                 if (animItemHeight > window.innerHeight) {
//                     animItemPoint = window.innerHeight - window.innerHeight / animStart;
//                 }

//                 if ((pageYOffset > animItemOffset - animItemPoint) && pageYOffset < (animItemOffset + animItemHeight)) {
//                     animItem.classList.add('_active');
//                 } else {
//                     if (!animItem.classList.contains('_anim-no-hide')) {
//                         animItem.classList.remove('_active');
//                     }
//                 }
//             }
//         }
//         function offset(el) {
//             const rect = el.getBoundingClientRect(),
//                 scrollLeft = window.pageXOffset || document.documentElement.scrollLeft,
//                 scrollTop = window.pageYOffset || document.documentElement.scrollTop;
//             return {
//                 top: rect.top + scrollTop, left: rect.left + scrollLeft
//             }
//         }
//     }

//     if (animItems.length > 0) {
//         setTimeout(() => {
//                 animOnScroll();
//             }, 500);
//     }
// })

// =============================================================================================================//






