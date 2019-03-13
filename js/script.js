'use strict';

window.addEventListener('DOMContentLoaded', function() {
    let tab = document.querySelectorAll('.info-header-tab'),
        info = document.querySelector('.info-header'),
        tabContent = document.querySelectorAll('.info-tabcontent');

    function hideTabContent(a) {
        for (let i = a; i < tabContent.length; i++) {
            tabContent[i].classList.remove('show');
            tabContent[i].classList.add('hide');
        };
    };
    hideTabContent(1);

    function showTabContent(b) {
        if (tabContent[b].classList.contains('hide')) {
            tabContent[b].classList.remove('hide');
            tabContent[b].classList.add('show');
        };
    };

    info.addEventListener('click', function(e) {
        let target = e.target;
        if (target && target.classList.contains('info-header-tab')) {
            for (let i = 0; i < tab.length; i++) {
                if (target == tab[i]) {
                    hideTabContent(0);
                    showTabContent(i);
                    break;
                };
            };
        };
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
    };

    function setClock(id, endtime) {
        let timer = document.getElementById(id),
            hours = timer.querySelector('.hours'),
            minutes = timer.querySelector('.minutes'),
            seconds = timer.querySelector('.seconds');
        if (Date.parse(endtime) <= Date.parse(new Date())) {
            hours.textContent = minutes.textContent = seconds.textContent = '00';
            return;
        };
        let timeInterval = setInterval(updateClock, 1000);

        function updateClock() {
            let t = getTimeRemaining(endtime);

            (t.hours > 9) ? hours.textContent = t.hours : hours.textContent = '0' + t.hours;
            (t.minutes > 9) ? minutes.textContent = t.minutes : minutes.textContent = '0' + t.minutes;
            (t.seconds > 9) ? seconds.textContent = t.seconds : seconds.textContent = '0' + t.seconds;
            if (t.total <= 0) {
                clearInterval(timeInterval);
            };
        };
    };
    setClock('timer', deadline);

    // Scroll
    let menu = document.querySelector('#menu');
    const anchors = [].slice.call(menu.querySelectorAll('a[href*="#"]')),
        animationTime = 1000,
        framesCount = 100;
    console.log(anchors);

    anchors.forEach(function(item) {
        // каждому якорю присваиваем обработчик события
        item.addEventListener('click', function(e) {
            e.preventDefault();
            let coordY = document.querySelector(item.getAttribute('href')).getBoundingClientRect().top - 100;
            let currentScroll = window.pageYOffset || document.documentElement.scrollTop;
            window.scrollBy(0, coordY);
            //запускаем интервал, в котором
            // let scroller = setInterval(function() {
            //     // считаем на сколько скроллить за 1 такт
            //     let scrollBy = coordY / framesCount;
            //     // если к-во пикселей для скролла за 1 такт больше расстояния до элемента
            //     // и дно страницы не достигнуто
            //     if(scrollBy > window.pageYOffset - coordY && window.innerHeight + window.pageYOffset < document.body.offsetHeight) {
            //         // то скроллим на к-во пикселей, которое соответствует одному такту
            //         window.scrollBy(0, scrollBy);
            //     } else {
            //         // иначе добираемся до элемента и выходим из интервала
            //         window.scrollTo(0, coordY);
            //         clearInterval(scroller);
            //     };
            //     // время интервала равняется частному от времени анимации и к-ва кадров
            // }, animationTime / framesCount);
        });
    });


});