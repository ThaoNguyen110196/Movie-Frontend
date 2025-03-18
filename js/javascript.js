// Active
document.querySelectorAll('.header-links .dropdown .header-link').forEach((link) => {
    link.addEventListener('click', function () {
        this.classList.add('active');
        const siblings = this.parentElement.querySelectorAll('.header-link');
        siblings.forEach((sibling) => {
            if (sibling !== this) {
                sibling.classList.remove('active');
            }
        });
    });
});

// Active searchBtn
let searchBtn = document.querySelector('.searchBtn');
let searchBox = document.querySelector('.searchBox');

let userBtn = document.querySelector('.userBtn');
let profileBox = document.querySelector('.profile');

let menuToggle = document.querySelector('.menuToggle');
let header = document.querySelector('.header');

// Active searchBtn
searchBtn.addEventListener('click', function () {
    if (searchBox.classList.contains('active')) {
        searchBox.classList.remove('active');
        searchBtn.setAttribute('name', 'search-outline');
        if (!menuToggle.classList.contains('active') && $(window).scrollTop() <= 100) {
            header.style.background = 'transparent';
        }
    } else {
        searchBox.classList.add('active');
        header.style.background = '#0C0C0C';
        searchBtn.setAttribute('name', 'close-outline');
    }
});

userBtn.addEventListener('click', function () {
    if (profileBox.classList.contains('active')) {
        profileBox.classList.remove('active');
        if (!menuToggle.classList.contains('active') && $(window).scrollTop() <= 100) {
            header.style.background = 'transparent';
            $('.profile .content').css('background', 'transparent');
        }
    } else {
        profileBox.classList.add('active');
        header.style.background = '#0C0C0C';
        $('.profile .content').css('background', '#0C0C0C');
    }
});

// header sticky
$(document).ready(function () {
    $(window).scroll(function () {
        var scroll = $(window).scrollTop();
        if (scroll > 100 && !searchBox.classList.contains('active') && !menuToggle.classList.contains('active')) {
            header.style.background = '#0C0C0C';
        } else if (scroll <= 100 && !searchBox.classList.contains('active')) {
            header.style.background = 'transparent';
        }
    });
});

// dropdown-menu-mega
$(document).ready(function () {
    $(window).scroll(function () {
        var scroll = $(window).scrollTop();
        if (scroll > 100 && !searchBox.classList.contains('active') && !menuToggle.classList.contains('active')) {
            header.style.background = '#0C0C0C';
            $('.dropdown-menu-mega').css('background', '#0C0C0C');
        } else {
            header.style.background = 'transparent';
            $('.dropdown-menu-mega').css('background', 'transparent');
        }
    });
});

// menuToggle
menuToggle.onclick = function () {
    menuToggle.classList.toggle('active');
    header.classList.toggle('active');
    header.style.background = '#0C0C0C';
    if (
        !menuToggle.classList.contains('active') &&
        !searchBox.classList.contains('active') &&
        $(window).scrollTop() <= 100
    ) {
        header.style.background = 'transparent';
    }
};

document.onclick = function (e) {
    if (
        !searchBtn.contains(e.target) &&
        !header.contains(e.target) &&
        !menuToggle.contains(e.target) &&
        !userBtn.contains(e.target)
    ) {
        menuToggle.classList.remove('active');
        searchBox.classList.remove('active');
        profileBox.classList.remove('active');
        searchBtn.setAttribute('name', 'search-outline');
        header.classList.remove('active');
        if ($(window).scrollTop() <= 100) {
            header.style.background = 'transparent';
        }
    }
};

// Dropdown
document.addEventListener('click', (e) => {
    const isDropdownButton = e.target.matches('.header-link');

    if (!isDropdownButton && e.target.closest('.dropdown') === null) {
        document.querySelectorAll('.dropdown.active').forEach((dropdown) => {
            dropdown.classList.remove('active');
        });
        return;
    }

    const currentDropdown = e.target.closest('.dropdown');
    const activeDropdowns = document.querySelectorAll('.dropdown.active');

    activeDropdowns.forEach((dropdown) => {
        if (dropdown !== currentDropdown) {
            dropdown.classList.remove('active');
        }
    });

    if (isDropdownButton) {
        currentDropdown.classList.toggle('active');
        header.style.background = '#0C0C0C';
        $('.dropdown-menu-mega').css('background', '#0C0C0C');
    } else {
        currentDropdown.classList.remove('active');
        header.style.background = 'transparent';
    }
});

// Video
var swiper = new Swiper('.movies-banner', {
    spaceBetween: 30,
    centeredSlides: true,
    loop: true,
    autoplay: false,
    on: {
        init: function () {
            playVideo(this.slides[this.activeIndex]);
        },
        slideChangeTransitionStart: function () {
            stopVideo(this.slides[this.previousIndex]);
        },
        slideChangeTransitionEnd: function () {
            playVideo(this.slides[this.activeIndex]);
        },
    },
});

function playVideo(slide) {
    var video = slide.querySelector('video');
    if (video) {
        video.addEventListener('ended', function () {
            swiper.slideNext();
        });
        video.play();
    }
}

function stopVideo(slide) {
    var video = slide.querySelector('video');
    if (video) {
        video.pause();
        video.currentTime = 0;
    }
}

// let leftBtn = document.getElementsByClassName('left')[0];
// let rightBtn = document.getElementsByClassName('right')[0];
// let cards = document.getElementsByClassName('cards')[0];
// let search = document.getElementsByClassName('searchMovie')[0];
// let searchInput = document.getElementsByClassName('searchInput')[0];

// leftBtn.addEventListener('click', () => {
//     cards.scrollLeft -= 140;
// });

// rightBtn.addEventListener('click', () => {
//     cards.scrollLeft += 140;
// });

// // Json
// let json_url = 'json/movie.json';

// fetch(json_url)
//     .then((Response) => Response.json())
//     .then((data) => {
//         data.forEach((ele, i) => {
//             let { name, imdb, date, sposter, mposter, genre, type, url } = ele;
//             let item = document.createElement('a');
//             item.classList.add('item');
//             item.href = url;
//             item.innerHTML = `
//             <img src="${sposter}" alt="${name} poster" class="poster" />
//                 <div class="rest-item">
//                     <video src="${mposter}" muted autoplay playsinline></video>
//                     <div class="cont">
//                         <h4>${name}</h4>
//                         <div class="sub">
//                             <p>${genre}, ${date}</p>
//                             <h3><span>IMDB</span><ion-icon name="star-outline" class="rating"></ion-icon> ${imdb}</h3>
//                         </div>
//                     </div>
//                 </div>
//             `;

//             cards.appendChild(item);
//         });

//         document.getElementById('title').innerText = data[0].name;
//         document.getElementById('genre').innerText = data[0].genre;
//         document.getElementById('date').innerText = data[0].date;
//         document.getElementById(
//             'rate',
//         ).innerHTML = `<span>IMDB</span><ion-icon name="star-outline"</ion-icon> ${data[0].imdb}`;

//         // Search data
//         data.forEach((element) => {
//             let { name, imdb, date, sposter, genre, url } = element;
//             let movie = document.createElement('a');
//             movie.classList.add('movie');
//             movie.href = url;
//             movie.innerHTML = `
//             <img src="${sposter}" alt="" />
//                 <div class="content-movie">
//                     <h3>
//                         ${name}
//                         <p>
//                             ${genre}, ${date}, <span>IMDB</span>
//                             <ion-icon name="star-outline"></ion-icon> ${imdb}
//                         </p>
//                     </h3>
//                 </div>
//         `;
//             search.appendChild(movie);
//         });

//         // Search filter
//         searchInput.addEventListener('keyup', () => {
//             let filter = searchInput.value.toUpperCase();
//             let a = search.getElementsByTagName('a');

//             for (let index = 0; index < a.length; index++) {
//                 let b = a[index].getElementsByClassName('content-movie')[0];
//
//                 let TextValue = b.textContent || b.innerText;
//                 if (TextValue.toUpperCase().indexOf(filter) > -1) {
//                     a[index].style.display = 'flex';
//                     search.style.visibility = 'visible';
//                     search.style.opacity = '1';
//                 } else {
//                     a[index].style.display = 'none';
//                 }

//                 if (searchInput.value == 0) {
//                     search.style.visibility = 'hidden';
//                     search.style.opacity = '0';
//                 }
//             }
//         });
//     });

// Card-Movie
var swiper = new Swiper('.card-movie', {
    slidesPerView: 2,
    spaceBetween: 10,
    breakpoints: {
        640: {
            slidesPerView: 3,
        },
        768: {
            slidesPerView: 4,
        },
        1024: {
            slidesPerView: 5,
        },
    },
});

// Banners
var swiper = new Swiper('.banners', {
    spaceBetween: 30,
    centeredSlides: true,
    loop: true,
    autoplay: {
        delay: 2500,
        disableOnInteraction: false,
    },
});

// hover video run
const cards = document.querySelectorAll('.card-movie .card');

cards.forEach((card) => {
    const videoElement = card.querySelector('video');

    card.addEventListener('mouseenter', () => {
        videoElement.currentTime = 0; // Start the video from the beginning
        videoElement.play();
    });

    card.addEventListener('mouseleave', () => {
        videoElement.pause();
    });
});
