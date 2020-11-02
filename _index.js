window.addEventListener('DOMContentLoaded', () => {
        // noinspection SpellCheckingInspection
        const tab = document.querySelectorAll('.info-header-tab'),
            info = document.querySelector('.info-header'),
            tabContent = document.querySelectorAll('.info-tabcontent');
        const hideTabContant = (a) => {
            for (let i = a; i < tabContent.length; i++) {
                tabContent[i].classList.remove('show');
                tabContent[i].classList.add('hide');
            }
        }
        hideTabContant(1);
        const showTabContent = (b) => {
            if (tabContent[b].classList.contains('hide')) {
                tabContent[b].classList.add('show');
                tabContent[b].classList.remove('hide');
            }
        }
        info.addEventListener('click', evt => {
            let target = evt.target;
            if (target && target.classList.contains('info-header-tab')) {
                for (let i = 0; i < tab.length; i++) {
                    if (target === tab[i]) {
                        hideTabContant(0);
                        showTabContent(i);
                        break;
                    }
                }
            }
        })
        // Timer
        let deadLine = '2020-12-26';
        const getTimeReamaining = (endtime) => {
            let t = Date.parse(endtime) - Date.now();
            let seconds = Math.floor((t / 1000) % 60);
            let minutes = Math.floor((t / 1000 / 60) % 60);
            let hours = Math.floor((t / (1000 * 60 * 60)));
            return {
                'total': t,
                'hours': hours,
                'minutes': minutes,
                'seconds': seconds
            };
        }
        const setClock = (id, endtime) => {
            const timer = document.getElementById(id);
            const hours = timer.querySelector('.hours');
            const minutes = timer.querySelector('.minutes');
            const seconds = timer.querySelector('.seconds');
            const timeInterval = setInterval(updateClock, 1000);

            function updateClock() {
                let t = getTimeReamaining(endtime);
                hours.textContent = ('0' + t.hours).slice(-2);
                minutes.textContent = ('0' + t.minutes).slice(-2);
                seconds.textContent = ('0' + t.seconds).slice(-2);
                if (t.total <= 0) {
                    clearInterval(timeInterval);
                }
            }
        };

        setClock('timer', deadLine)
        // modal
        const more = document.querySelector('.more');
        const overlay = document.querySelector('.overlay');
        const close = document.querySelector('.popup-close');
        const descriptionBtn = document.querySelector('.description-btn');
        more.addEventListener('click', open);
        descriptionBtn.addEventListener('click', open);

        function open() {
            overlay.style.display = 'block';
            this.classList.add('more-splash');
            document.body.style.overflow = 'hidden';
        }

        close.addEventListener('click', () => {
            overlay.style.display = 'none';
            more.classList.remove('more-splash');
            document.body.style.overflow = ''
        });
        window.addEventListener('keydown', closeFunc)

        function closeFunc(event) {
            if (event.key === 'Escape') {
                overlay.style.display = 'none';
                more.classList.remove('more-splash');
                document.body.style.overflow = ''
            }
        }

        //     class Option {
        //         constructor(height, width, bg, fontSize, textAlign) {
        //             this.height = height;
        //             this.width = width;
        //             this.bg = bg;
        //             this.fontSize = fontSize;
        //             this.textAlign = textAlign;
        //         }
        //
        //         buildDiv() {
        //             let div = {};
        //             const newDiv = document.createElement('div')
        //             newDiv.innerHTML=`<h1>${prompt('Веди сообщение которое появиться в конце страницы')}</h1>`
        //             return div = {
        //                 height: newDiv.style.height = this.height,
        //                 width: newDiv.style.width=this.width,
        //                 bg: newDiv.style.backgroundColor=this.bg,
        //                 fontSize: newDiv.style.fontSize=this.fontSize,
        //                 textAlign: newDiv.style.textAlign=this.textAlign,
        //
        //             }, newDiv
        //         }
        //
        //     }
        //     let attempt= new Option('500px','500px','#B8860B',18,'center')
        //
        // document.body.insertAdjacentElement('beforeend',attempt.buildDiv())

        // Form
        // const message = {
        //     loading: 'Загрузка',
        //     success: 'Спасибо! Мы скоро свами свяжемся',
        //     fail: 'Ошибка',
        // };
        // const form = document.querySelector('.main-form'),
        //     input = form.getElementsByTagName('input'),
        //     statusMsg = document.createElement('div');
        // form.addEventListener('submit', (event) => {
        //     event.preventDefault();
        //     form.appendChild(statusMsg);
        //     let request = new XMLHttpRequest();
        //     request.open('POST', 'server.php')
        //     request.setRequestHeader('Content-Type', 'application/json;charset=utf-8');
        //     let formData = new FormData(form);
        //     let obj = {};
        //     formData.forEach((value, key) => {
        //         obj[key] = value;
        //     })
        //     let json = JSON.stringify(obj)
        //     request.send(obj);
        //     request.addEventListener('readystatechange', () => {
        //         if (request.readyState < 4) {
        //             statusMsg.innerHTML = message.loading;
        //         } else if (request.readyState === 4 && request.status == 200) {
        //             statusMsg.innerHTML = message.loading;
        //         } else {
        //             statusMsg.innerHTML = message.fail;
        //         }
        //     })
        //     for (let i = 0; i < input.length; i++) {
        //         input[i].value = '';
        //     }
        // });
        //slider

        let sliderIndex = 1;
        const sliderItem = document.querySelectorAll('.slider-item');
        const prev = document.querySelector('.prev'),
            next = document.querySelector('.next'),
            sliderDots = document.querySelector('.slider-dots'),
            dots = document.querySelectorAll('.dot');
        showSlides(sliderIndex);

        function showSlides(n) {
            if (n > sliderItem.length) {
                sliderIndex = 1
            }
            if (n < 1) {
                sliderIndex = sliderItem.length;
            }
            sliderItem.forEach(item => {
                item.style.display = 'none';
            });
            dots.forEach(item => {
                item.classList.remove('dot-active');
            })
            sliderItem[sliderIndex - 1].style.display = 'block';
            dots[sliderIndex - 1].classList.add('dot-active');
        }

        function plusSlides(n) {
            showSlides(sliderIndex += n)
        }

        function currentSlide(n) {
            showSlides(sliderIndex = n);
        }

        prev.addEventListener('click', () => {
            plusSlides(-1);
        });
        next.addEventListener('click', () => {
            plusSlides(1);
        })
        sliderDots.addEventListener('click', (event) => {
            console.log(event.target)
            for (let i = 0; i < dots.length + 1; i++) {
                if (event.target.classList.contains('dot') && event.target == dots[i - 1]) {
                    currentSlide(i);
                }
            }
        })

        //calc
        let people = document.querySelectorAll('.counter-block-input')[0],
            restDays = document.querySelectorAll('.counter-block-input')[1],
            place = document.getElementById('select'),
            totalValue = document.getElementById('total'),
            personSum = 0,
            daySum = 0,
            total = 0;

        totalValue.innerHTML = '0';
        people.addEventListener('input', function () {
            personSum = +this.value;
            total = (daySum + personSum) * 4000;
            if (restDays.value == '') {
                totalValue.innerHTML = '0';
            } else {
                totalValue.innerHTML = total;
            }
        })
        restDays.addEventListener('input', function () {
            personSum = +this.value;
            total = (daySum + personSum) * 4000;
            if (people.value == '') {
                totalValue.innerHTML = '0';
            } else {
                totalValue.innerHTML = total;
            }
        })

        place.addEventListener('change', () => {
            if (restDays.value == '' || people.value == '') {
                totalValue.innerHTML = '0';
            } else {
                let count = total;
                totalValue.innerHTML = count * place.options[place.selectedIndex].value;
            }
        })
    }

);