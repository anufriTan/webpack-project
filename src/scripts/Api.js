export class Api {
    constructor(config) {
      this.url = config.baseUrl;
      this.headers = config.headers;       
    }

    loadUserInfo() {
      return fetch(`${this.url}/users/me`, {headers: this.headers})
        .then(res => {
          if (res.ok) {
            return res.json();
          }
          return Promise.reject(`Ошибка: ${res.status}`);
        })    
    }

  
    getInitialCards() {
      return fetch(`${this.url}/cards`, {headers: this.headers})
        .then(res => {
          if (res.ok) {
            return res.json();
          }
          return Promise.reject(`Ошибка: ${res.status}`);
        })          
    }
  
    editProfile(newName, newJob) {
      return fetch(`${this.url}/users/me`, {
        method: 'PATCH',
        headers: this.headers,
        body: JSON.stringify({
          name: newName,
          about: newJob
        })      
      })
        .then(res => {
          if (res.ok) {
            return (res.json());
          }
          return Promise.reject(`Ошибка: ${res.status}`);
        })        
    }

    addNewCard(newName, newLink) {
      return fetch(`${this.url}/cards`, {
        method: 'POST',
        headers: this.headers,
        body: JSON.stringify({
          name: newName, 
          link: newLink
        })
      })
      .then(res => {
        if (res.ok) {
          return res.json();
        }
        return Promise.reject(`Ошибка: ${res.status}`);
      })         
    }

    deleteMyCard(cardId) {
      return fetch(`${this.url}/cards/${cardId}`, {
        method: 'DELETE',
        headers: this.headers        
      })
        .then(res => {
          if (res.ok) {
            return res.json();
          }
          return Promise.reject(`Ошибка: ${res.status}`);
        })          
    }
    
}
  
  

 