import "../pages/index.css";

import {Popup} from './Popup.js';
import {Api} from './Api.js';
import {Card} from './Card.js';
import {UserInfo} from './UserInfo.js';
import {FormValidator} from './FormValidator.js';
import {CardList} from './CardList.js';


//Переменные
// const API_URL = NODE_ENV === 'production' ? 'https://praktikum.tk' : 'http://praktikum.tk';
const API_URL = NODE_ENV === 'production' ? 'https://nomoreparties.co' : 'http://nomoreparties.co';
const placesList = document.querySelector('.places-list');
const popupFormNew = document.forms.new;
const popupFormEdit = document.forms.edit;
const userInfoButton = document.querySelector('.user-info__button');
const popupCloseNew = document.querySelector('.popup__close-new');
const userInfoButtonEdit = document.querySelector('.user-info__button-edit');
const popupCloseEdit = document.querySelector('.popup__close-edit');
const popupCloseCard = document.querySelector('.popup__close-card');
const popupButtonNew = document.querySelector('.popup__button_new');
const popupButtonEdit = document.querySelector('.popup__button_edit');
const popupImageCard = document.querySelector('.popup__image-card');
const userInfoName = document.querySelector('.user-info__name');
const userInfoJob = document.querySelector('.user-info__job');
const userInfoAvatar = document.querySelector('.user-info__photo');


export const errorMessages = {
    empty: 'Это обязательное поле',
    wrongLength: 'Должно быть от 2 до 30 символов',
    wrongUrl: 'Здесь должна быть ссылка'
  }

const config = {
    baseUrl: `${API_URL}/cohort11`,
    headers: {
      authorization: '36279dda-0bbf-482e-b4a1-7fb64dcfda1e',
      'Content-Type': 'application/json'
    }
};  

//Конструкторы
const popupNew = new Popup(document.querySelector('.popup-new'));
const popupEdit = new Popup(document.querySelector('.popup-edit'));
const popupCard = new Popup(document.querySelector('.popup-card'));

const api = new Api(config);

const createCardCallback = (name, link, id, owner, likes) => new Card(name, link, id, owner, likes, popupCard, placesList, popupImageCard, api, userInfoName).createCard();

const newUser = new UserInfo(document.querySelector('.user-info__name'), document.querySelector('.user-info__job'),
    document.querySelector('#user-name'), document.querySelector('#job'), popupEdit, popupFormEdit, api);

const formNewValidator = new FormValidator(popupFormNew, popupButtonNew, errorMessages);
const formEditValidator = new FormValidator(popupFormEdit, popupButtonEdit, errorMessages);



//Функции

// Загрузка информации о пользователе с сервера
api.loadUserInfo().then(res => {
    userInfoName.textContent = res.name;
    userInfoJob.textContent = res.about;
    userInfoAvatar.style.backgroundImage = `url(${res.avatar})`;
    userInfoName.setAttribute('data-id', res._id);
})
  .catch((err) => {
    console.log(err);
  });

// Загрузка первоначальных карточек с сервера
api.getInitialCards().then(res => {
    const cardList = new CardList(res, placesList, createCardCallback);
    cardList.render();
})
  .catch((err) => {
    console.log(err);
  });


formNewValidator.setEventListeners();
formEditValidator.setEventListeners();

userInfoButton.addEventListener('click', function() {
    popupFormNew.reset();
    formNewValidator.clearErrors();
    popupNew.open();
    formNewValidator.setSubmitButtonState();
});


popupCloseNew.addEventListener('click', function() {
    popupNew.close();
});

// Добавление новой карточки
popupFormNew.addEventListener('submit', function(event) {
    event.preventDefault();
    const name = popupFormNew.elements.name;
    const link = popupFormNew.elements.link;
    
    api.addNewCard(name.value, link.value).then((res) => {  
      const newPlace = new Card(res.name, res.link, res._id, res.owner._id, res.likes, popupCard, placesList, popupImageCard, api, userInfoName);     
      placesList.appendChild(newPlace.createCard());
    })
      .catch((err) => {
        console.log(err);
      });
    popupFormNew.reset();
    popupNew.close();
})

userInfoButtonEdit.addEventListener('click', function() {
    popupEdit.open();
    newUser.updateUserInfo();
    formEditValidator.setSubmitButtonState();
    formEditValidator.clearErrors();
    newUser.addListeners();
});


popupCloseEdit.addEventListener('click', function() {
    popupEdit.close();
});


popupCloseCard.addEventListener('click', function() {
    popupCard.close();
});




