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

const editProfileContainer = document.querySelector('.edit-profile-container');
const formEditProfile = document.querySelector('.form-edit-profile');
const fileUpload = document.querySelector('.file-upload');
const previewImage = document.querySelector('.preview-image');
const usernameInputEditProfile = document.querySelector('.username-input-edit-profile');
const errorMessageInputEditProfile = document.querySelector('.error-message-input-edit-profile');

fileUpload.addEventListener('change', (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();

    reader.addEventListener('load', () => {
        const imageDataUrl = reader.result;
        previewImage.src = imageDataUrl;
    });

    reader.readAsDataURL(file);
});

const dataStorage = localStorage.getItem('username') ? JSON.parse(localStorage.getItem('username')) : [];

function storeDataStorage() {
    usernameInputEditProfile.value = dataStorage;
    usernameInputEditProfile.focus();
};
storeDataStorage();

formEditProfile.addEventListener('submit', (e) => {
    if (validateFormEdit()) {
        formEditProfile.submit();
    } else {
        e.preventDefault();
    };
});

function validateFormEdit() {
    const saveImageFileUploaded = previewImage.src;
    let result = true;

    if (usernameInputEditProfile.value.trim() == '') {
        errorMessageInputEditProfile.style.display = 'block';
        errorMessageInputEditProfile.innerHTML = 'Name cannot be empty';
        result = false;
    } else if (usernameInputEditProfile.value.trim().length < 3) {
        errorMessageInputEditProfile.style.display = 'block';
        errorMessageInputEditProfile.innerHTML = 'Name at least have 3 minimum character';
        result = false;
    } else if (!isNameValid(usernameInputEditProfile.value.trim())) {
        errorMessageInputEditProfile.style.display = 'block';
        errorMessageInputEditProfile.innerHTML = 'Name must not contain number or symbol';
        result = false;
    } else {
        errorMessageInputEditProfile.style.display = 'none';

        updateUsername(usernameInputEditProfile);

        saveImageFileUploaded = localStorage.setItem('file-uploaded', saveImageFileUploaded);
    };

    return result;
};

function isNameValid(usernameInputEditProfile) {
    const reg = /^[A-Za-z\s]+$/;

    return reg.test(usernameInputEditProfile);
};

function updateUsername(usernameInputEditProfile) {
    dataStorage.splice(0, 1, usernameInputEditProfile.value);
    localStorage.setItem('username', JSON.stringify(dataStorage));
};

function updateUserImage() {
    const imageFileSaved = localStorage.getItem('file-uploaded');

    if (imageFileSaved) {
        previewImage.src = localStorage.getItem('file-uploaded');
    } else {
        previewImage.src = 'https://sociology.columbia.edu/themes/custom/columbia/assets/img/people-default.svg';
    };
};
updateUserImage();

function removeProfile() {
    localStorage.removeItem('username');
    localStorage.removeItem('file-uploaded');
    location.href = 'index.html';
};