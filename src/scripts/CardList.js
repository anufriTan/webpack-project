export class CardList {
    constructor(data, container, callback) {   
      this.data = data;  
      this.container = container;         
      this.callback = callback;
    }
    
    addCard(name, link, id, owner, likes) {
      this.container.appendChild(this.callback(name, link, id, owner, likes));              
    }

    render() {
      this.data.forEach((item) => {          
      this.addCard(item.name, item.link, item._id, item.owner._id, item.likes);                  
      });      
    }   
  
  }




