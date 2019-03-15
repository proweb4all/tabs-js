'use strict';

window.addEventListener('DOMContentLoaded', () => {
    let tab = document.querySelectorAll('.info-header-tab'),
        info = document.querySelector('.info-header'),
        tabContent = document.querySelectorAll('.info-tabcontent');

    function hideTabContent(a) {
        for (let i = a; i < tabContent.length; i++) {
            tabContent[i].classList.remove('show');
            tabContent[i].classList.add('hide');
        }
    }
    hideTabContent(1);

    function showTabContent(b) {
        if (tabContent[b].classList.contains('hide')) {
            tabContent[b].classList.remove('hide');
            tabContent[b].classList.add('show');
        }
    }

    info.addEventListener('click', (e) => {
        let target = e.target;
        if (target && target.classList.contains('info-header-tab')) {
            for (let i = 0; i < tab.length; i++) {
                if (target == tab[i]) {
                    hideTabContent(0);
                    showTabContent(i);
                    break;
                }
            }
        }
    });

    // Timer
    let deadline = '2019-03-18';

    function getTimeRemaining(endtime) {
        let t = Date.parse(endtime) - Date.parse(new Date()),
            seconds = Math.floor((t/1000) % 60),
            minutes = Math.floor((t/1000/60) % 60),
            hours = Math.floor((t/(1000*60*60)));
        return {
            'total': t,
            'hours': hours,
            'minutes': minutes,
            'seconds': seconds
        };
    }

    function setClock(id, endtime) {
        let timer = document.getElementById(id),
            hours = timer.querySelector('.hours'),
            minutes = timer.querySelector('.minutes'),
            seconds = timer.querySelector('.seconds');
        if (Date.parse(endtime) <= Date.parse(new Date())) {
            hours.textContent = minutes.textContent = seconds.textContent = '00';
            return;
        }
        let timeInterval = setInterval(updateClock, 1000);

        function updateClock() {
            let t = getTimeRemaining(endtime);

            (t.hours > 9) ? hours.textContent = t.hours : hours.textContent = '0' + t.hours;
            (t.minutes > 9) ? minutes.textContent = t.minutes : minutes.textContent = '0' + t.minutes;
            (t.seconds > 9) ? seconds.textContent = t.seconds : seconds.textContent = '0' + t.seconds;
            if (t.total <= 0) {
                clearInterval(timeInterval);
            }
        }
    }
    setClock('timer', deadline);

    // Modal
    let more = document.querySelectorAll('.more, .description-btn'),
        overlay = document.querySelector('.overlay'),
        close = document.querySelector('.popup-close');

    more.forEach(function(item){
        item.addEventListener('click', function() {
            overlay.style.display = 'block';
            this.classList.add('more-splash');
            document.body.style.overflow = 'hidden';
        });
        close.addEventListener('click', () => {
            overlay.style.display = 'none';
            item.classList.remove('more-splash');
            document.body.style.overflow = '';
        });
    });



    // Scroll
    let menu = document.querySelector('#menu');
    // const anchors = [].slice.call(menu.querySelectorAll('a[href*="#"]')),
    //     animationTime = 1000,
    //     framesCount = 100;

    const anc = menu.querySelectorAll('a[href*="#"]');
    //console.log(anc);

    for (let anchor of anc) {
        // console.log(anchor)
        anchor.addEventListener('click', (e) => {
            e.preventDefault();
            const blockID = anchor.getAttribute('href');
            //console.log(document.querySelector('' + blockID), document.querySelector('' + blockID).scrollTop);
            document.querySelector('' + blockID).scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        });
    }

    // let linkNav = menu.querySelectorAll('[href^="#"]'), //выбираем все ссылки к якорю на странице
    // V = .3;  // скорость, может иметь дробное значение через точку (чем меньше значение - тем больше скорость)
    // for (let i = 0; i < linkNav.length; i++) {
    //     linkNav[i].addEventListener('click', function(e) { //по клику на ссылку
    //         e.preventDefault(); //отменяем стандартное поведение
    //         let w = window.pageYOffset,  // прокрутка
    //             hash = this.href.replace(/[^#]*(.*)/, '$1');  // к id элемента, к которому нужно перейти
    //         let t = document.querySelector(hash).getBoundingClientRect().top - 100,  // отступ от окна браузера до id
    //             start = null;
    //         requestAnimationFrame(step);  // подробнее про функцию анимации [developer.mozilla.org]
    //         //console.log('time', time);
    //         function step(time) {
    //             console.log('time', time);
    //             if (start === null) start = time;
    //             let progress = time - start,
    //                 r = (t < 0 ? Math.max(w - progress/V, w + t) : Math.min(w + progress/V, w + t));
    //             window.scrollTo(0,r);
    //             if (r != w + t) {
    //                 requestAnimationFrame(step)
    //             } else {
    //                 location.hash = hash  // URL с хэшем
    //             };
    //         };
    //     }, false);
    // };

    // anchors.forEach(function(item) {
    //     // каждому якорю присваиваем обработчик события
    //     item.addEventListener('click', function(e) {
    //         e.preventDefault();
    //         let coordY = document.querySelector(item.getAttribute('href')).getBoundingClientRect().top - 100;
    //         let currentScroll = window.pageYOffset || document.documentElement.scrollTop;
    //         window.scrollBy(0, coordY);
    //         console.log(document.querySelector(item.getAttribute('href')), currentScroll, coordY);
    //         let scrollStep = coordY / 30; // шаг скролла


    //         // function step() {
    //         //     //setTimeout(function() {
    //         //         // requestAnimationFrame(step);
    //         //         if ((scrollStep > window.pageYOffset - coordY) && (window.innerHeight + window.pageYOffset < document.body.offsetHeight)) {
    //         //             // то скроллим на к-во пикселей, которое соответствует одному такту
    //         //             window.scrollBy(0, scrollStep);
    //         //             requestAnimationFrame(step);
    //         //         } else {                 };
    //         //         // else {
    //         //         //     // иначе добираемся до элемента и выходим из интервала
    //         //         //     //window.scrollTo(0, coordY);
    //         //         //     window.scrollBy(0, window.pageYOffset - coordY);
    //         //         //     return;
    //         //         //     //clearInterval(scroller);
    //         //         // };
    //         //         console.log('Quit Step - ', window.pageYOffset - coordY, coordY, scrollStep);
    //         //         return;
    //         //     //}, 17);
    //         // };
    //         // step();
    //         //запускаем интервал, в котором
    //         // let scroller = setInterval(function() {
    //         //     // считаем на сколько скроллить за 1 такт
    //         //     let scrollBy = coordY / framesCount;
    //         //     // если к-во пикселей для скролла за 1 такт больше расстояния до элемента
    //         //     // и дно страницы не достигнуто
    //         //     if(scrollBy > window.pageYOffset - coordY && window.innerHeight + window.pageYOffset < document.body.offsetHeight) {
    //         //         // то скроллим на к-во пикселей, которое соответствует одному такту
    //         //         window.scrollBy(0, scrollBy);
    //         //     } else {
    //         //         // иначе добираемся до элемента и выходим из интервала
    //         //         window.scrollTo(0, coordY);
    //         //         clearInterval(scroller);
    //         //     };
    //         //     // время интервала равняется частному от времени анимации и к-ва кадров
    //         // }, animationTime / framesCount);
    //     });
    // });


});