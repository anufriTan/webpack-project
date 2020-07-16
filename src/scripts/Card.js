export class Card {
    constructor(cardName, cardLink, cardId, cardOwnerId, likes, cardPopup, container, imageCard, api, user) {
      this.cardName = cardName;
      this.cardLink = cardLink;
      this.cardId = cardId;
      this.cardOwnerId = cardOwnerId;
      this.likes = likes;
      this.cardPopup = cardPopup;
      this.container = container;
      this.imageCard = imageCard;
      this.api = api;      
      this.user = user;
      
      this.openCard = this.openCard.bind(this);
      this.remove = this.remove.bind(this);
    }

    createCard() {
        const placeCard = document.createElement('div');
        const placeCardImage = document.createElement('div');
        const placeCardDeleteIcon = document.createElement('button');
        const placeCardDescription = document.createElement('div');
        const placeCardName = document.createElement('h3');
        const likesContainer = document.createElement('div');
        const placeCardLikeIcon = document.createElement('button');
        const placeCardLikesAmount = document.createElement('p');

        placeCard.classList.add('place-card');
        placeCard.setAttribute('data-id', `${this.cardId}`);
        placeCard.setAttribute('data-owner', `${this.cardOwnerId}`);
       
        placeCardImage.classList.add('place-card__image');
        placeCardImage.setAttribute('style', `background-image: url(${this.cardLink})`);        
        placeCardImage.setAttribute('data-url', `${this.cardLink}`);
        
        placeCardDeleteIcon.classList.add('place-card__delete-icon');

        if (this.cardOwnerId === this.user.getAttribute(`data-id`)) {
          placeCardDeleteIcon.classList.add('place-card__delete-icon_my');       
        }        

        placeCardDescription.classList.add('place-card__description');
        placeCardName.classList.add('place-card__name');

        placeCardName.textContent = this.cardName;

        likesContainer.classList.add('place-card__likes-container');
        placeCardLikeIcon.classList.add('place-card__like-icon');
        placeCardLikesAmount.classList.add('place-card__likes-amount');

        placeCardLikesAmount.textContent = this.likes.length;

        placeCardImage.appendChild(placeCardDeleteIcon);
        placeCardDescription.appendChild(placeCardName);
        placeCardDescription.appendChild(likesContainer);
        likesContainer.appendChild(placeCardLikeIcon);
        likesContainer.appendChild(placeCardLikesAmount);

        placeCard.appendChild(placeCardImage);
        placeCard.appendChild(placeCardDescription);

        this.cardElement = placeCard;
        this.setEventListeners();
        
        return placeCard;
    }

    setEventListeners() { 
      this.cardElement.querySelector('.place-card__image').addEventListener('click', this.openCard);
      this.cardElement.querySelector('.place-card__like-icon').addEventListener('click', this.like);
      this.cardElement.querySelector('.place-card__delete-icon').addEventListener('click', this.remove);
      this.cardElement.querySelector('.place-card__delete-icon').addEventListener('click', function(event) {
        event.stopImmediatePropagation();
      });        
    }

    removeListeners() {
      this.cardElement.querySelector('.place-card__like-icon').removeEventListener('click', this.like);
      this.cardElement.querySelector('.place-card__image').removeEventListener('click', this.openCard);
      this.cardElement.querySelector('.place-card__delete-icon_my').removeEventListener('click', this.remove);
    }

    like(event) {
        event.target.classList.toggle('place-card__like-icon_liked');
    }

    // Удаление карточки
    remove(event) {  
      const currentCard = event.target.closest('.place-card'); 
      if (window.confirm('Вы действительно хотите удалить эту карточку?')) {      
        this.api.deleteMyCard(currentCard.getAttribute('data-id')).then(() => {
          this.container.removeChild(currentCard);
          this.removeListeners();
        })
          .catch((err) => {
          console.log(err);
          })
      };      
    }

    openCard() {
      this.cardPopup.open();
      this.imageCard.src = this.cardLink;
    }

    closeCard() {
      this.cardPopup.close();
    }    
}


