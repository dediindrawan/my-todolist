// change image on user platform using basically
function setSharedImage() {
    let sharedImage = 'https://i.postimg.cc/Gh8GfFGr/Dedi-Indrawan-Title.jpg';

    // set user popular platform are needed
    if (window.location.href.includes('whatsapp.com')) {
        sharedImage = 'https://i.postimg.cc/Gh8GfFGr/Dedi-Indrawan-Title.jpg';
    } else if (window.location.href.includes('instagram.com')) {
        sharedImage = 'https://i.postimg.cc/Gh8GfFGr/Dedi-Indrawan-Title.jpg';
    } else if (window.location.href.includes('telegram.com')) {
        sharedImage = 'https://i.postimg.cc/Gh8GfFGr/Dedi-Indrawan-Title.jpg';
    } else if (window.location.href.includes('twitter.com')) {
        sharedImage = 'https://i.postimg.cc/Gh8GfFGr/Dedi-Indrawan-Title.jpg';
    };

    // set display picture when link is shared by user
    document.querySelector('meta[property="og:image"]').setAttribute('content', sharedImage);
};
setSharedImage();

const userImage = document.querySelector('.user-image');
const imageFileStorage = localStorage.getItem('file-uploaded');

function displayPicture() {
    if (imageFileStorage) {
        userImage.src = localStorage.getItem('file-uploaded');
    } else {
        userImage.src = 'https://sociology.columbia.edu/themes/custom/columbia/assets/img/people-default.svg';
    };
};
displayPicture();

const usernameArray = localStorage.getItem('username') ? JSON.parse(localStorage.getItem('username')) : [];

const boardingForm = document.querySelector('.boarding-form');
const usernameInputBoarding = document.querySelector('.username-input-boarding');
const errorMessageInputBoarding = document.querySelector('.error-message-input-boarding');
const boardingContainer = document.querySelector('.boarding-container');
const mainContainer = document.querySelector('.main-container');

boardingForm.addEventListener('submit', (e) => {
    if (validateForm()) {
        boardingForm.submit();
    } else {
        e.preventDefault();
    };
});

function validateForm() {
    let result = true;

    if (usernameInputBoarding.value.trim() == '') {
        errorMessageInputBoarding.style.display = 'block';
        errorMessageInputBoarding.innerHTML = 'Name cannot be empty';
        result = false;
    } else if (usernameInputBoarding.value.trim().length < 3) {
        errorMessageInputBoarding.style.display = 'block';
        errorMessageInputBoarding.innerHTML = 'Name at least have 3 minimum character';
        result = false;
    } else if (!isNameValid(usernameInputBoarding.value.trim())) {
        errorMessageInputBoarding.style.display = 'block';
        errorMessageInputBoarding.innerHTML = 'Name must not contain number or symbol';
        result = false;
    } else {
        errorMessageInputBoarding.style.display = 'none';

        createUsername(usernameInputBoarding);
    };

    return result;
};

function isNameValid(usernameInputBoarding) {
    const reg = /^[A-Za-z\s]+$/;

    return reg.test(usernameInputBoarding);
};

function createUsername(usernameInputBoarding) {
    usernameArray.push(usernameInputBoarding.value);
    localStorage.setItem('username', JSON.stringify(usernameArray));
    location.reload();
};

function openMainContainer() {
    if (usernameArray.length !== 0) {
        boardingContainer.style.display = 'none';
        mainContainer.style.display = 'block';

        document.querySelector('.display-name').innerHTML = usernameArray;
    };
};
openMainContainer();

function timeViewer() {
    const dayNames = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Nov', 'Dec'];

    let day = document.querySelector('.day');
    let date = document.querySelector('.date');
    let clock = document.querySelector('.clock');
    let greeting = document.querySelector('.greeting');

    let today = new Date(), days, months, dates, years;
    days = dayNames[today.getDay()];
    months = monthNames[today.getMonth()];
    dates = today.getDate();
    years = today.getFullYear();

    dates = dates < 10 ? '0' + dates : dates;

    day.innerHTML = `${days}`;
    date.innerHTML = `${months}, ${dates}/${years}`;

    document.querySelector('.boarding-credit span').innerHTML = years;

    setInterval(function () {
        let times = new Date(), hours, minutes, seconds, indicator;
        hours = times.getHours();
        minutes = times.getMinutes();
        seconds = times.getSeconds();
        indicator = 'Am';

        if (hours >= 0 && hours <= 4) {
            greeting.innerHTML = `&#x1f44b; Hi, Good Night`;
        };

        if (hours >= 4 && hours <= 12) {
            greeting.innerHTML = `&#x1f44b; Hi, Good Morning`;
        };

        if (hours >= 12 && hours <= 18) {
            greeting.innerHTML = `&#x1f44b; Hi, Good Afternoon`;
        };

        if (hours >= 18 && hours <= 20) {
            greeting.innerHTML = `&#x1f44b; Hi, Good Evening`;
        };

        if (hours >= 20 && hours <= 24) {
            greeting.innerHTML = `&#x1f44b; Hi, Good Night`;
        };

        if (hours >= 12) {
            hours -= 12;
            indicator = 'Pm';
        };

        hours = hours < 10 ? '0' + hours : hours;
        minutes = minutes < 10 ? '0' + minutes : minutes;
        seconds = seconds < 10 ? '0' + seconds : seconds;

        clock.innerHTML = `${hours}:${minutes}:${seconds} ${indicator}`;
    }, 1000);
};
timeViewer();

function btnEditProfile() {
    location.href = 'profile.html';
};

const navItems = document.querySelectorAll('.wrapper-navbar ul a li');
navItems.forEach(items => {
    items.addEventListener('click', () => {
        navItems.forEach(items => {
            if (items.classList.contains('nav-active')) {
                items.classList.remove('nav-active');
            };
        });
        items.classList.add('nav-active');
    });
});