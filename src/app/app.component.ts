import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  title = 'Pizza-order';
  grandTotal:number = 0;
  toppingArray:any = {
    'vegToppings' : [
      {
        'name': 'Tomato',
        'price': 1,
      },
      {
        'name': 'Onions',
        'price': 0.50,
      },
      {
        'name': 'BellPepper',
        'price': 1,
      },
      {
        'name': 'Mushrooms',
        'price': 1.20,
      },
      {
        'name': 'PineApple',
        'price': 0.75,
      }
    ],
    'nonVegToppings' : [
      {
        'name': 'Sausage',
        'price': 1,
      },
      {
        'name': 'Pepperoni',
        'price': 2,
      },
      {
        'name': 'BbQ',
        'price': 3,
      }
    ]
  }

  pizzaDetailObj:any = {
    'small':{
      'price':5,
      'quantity': 0,
      'topCount':0,
      'sum':0,
      'offer':'',
      'toppingsDetails': {
        'tomatoes':0,
        'onions':0,
        'bellPepper':0,
        'mushrooms':0,
        'pineApple':0,
        'sausage':0,
        'pepperoni':0,
        'bbQ':0,
      }
    },
    'medium':{
      'price':7,
      'quantity': 0,
      'topCount':0,
      'sum':0,
      'offer':'',
      'toppingsDetails': {
        'tomatoes':0,
        'onions':0,
        'bellPepper':0,
        'mushrooms':0,
        'pineApple':0,
        'sausage':0,
        'pepperoni':0,
        'bbQ':0,
      }
    },
    'large':{
      'price':8,
      'quantity': 0,
      'topCount':0,
      'sum':0,
      'offer':'',
      'toppingsDetails': {
        'tomatoes':0,
        'onions':0,
        'bellPepper':0,
        'mushrooms':0,
        'pineApple':0,
        'sausage':0,
        'pepperoni':0,
        'bbQ':0,
      }
    },
    'exlarge':{
      'price':9,
      'quantity': 0,
      'topCount':0,
      'sum':0,
      'offer':'',
      'toppingsDetails': {
        'tomatoes':0,
        'onions':0,
        'bellPepper':0,
        'mushrooms':0,
        'pineApple':0,
        'sausage':0,
        'pepperoni':0,
        'bbQ':0,
      }
    }
  }

 addPizza(type){
   this.pizzaDetailObj[type].quantity++;
   this.getTotalCount(this.pizzaDetailObj);
 }

 removePizza(type){
   this.pizzaDetailObj[type].quantity--;
   this.getTotalCount(this.pizzaDetailObj);
 }

  changeFn(event,size,item){
    if(event.target.checked){
      this.pizzaDetailObj[size].toppingsDetails[item.name] = item.price;
      if(item.name === 'Pepperoni'||item.name === 'BbQ'){
        this.pizzaDetailObj[size].topCount = this.pizzaDetailObj[size].topCount +2;
      } else{
        this.pizzaDetailObj[size].topCount++
      }
    } else {
      this.pizzaDetailObj[size].toppingsDetails[item.name] = 0;
      if(item.name === 'Pepperoni'||item.name === 'BbQ'){
        this.pizzaDetailObj[size].topCount = this.pizzaDetailObj[size].topCount-2;
      } else{
        this.pizzaDetailObj[size].topCount--
      }
    }
    this.getTotalCount(this.pizzaDetailObj)
  }

  getTotalCount(pizzaDetailObj){
    let totalPrice = [];
    for(const keys of Object.keys(pizzaDetailObj)){
        pizzaDetailObj[keys]['sum'] = this.getPizzaPrize(pizzaDetailObj[keys],keys);
        totalPrice.push({
          'value': this.getPizzaPrize(pizzaDetailObj[keys],keys)
        })
    }
    this.grandTotal = totalPrice.reduce((a, b) => a + (b['value'] || 0), 0);
  }

  getPizzaPrize(pizzaObj, keys){
    let pizzaPrice = 0;
    if(pizzaObj.topCount === 2 && keys === 'medium' && pizzaObj.quantity>0){
      pizzaObj.offer = 'offer 1 Applied';
      return 5 * pizzaObj.quantity;
    } else if(pizzaObj.topCount === 4 && keys === 'medium' && pizzaObj.quantity%2 === 0) {
      pizzaObj.offer = 'offer 2 Applied';
      return 9 * pizzaObj.quantity;
    } else if(pizzaObj.topCount === 4 && keys === 'large' && pizzaObj.quantity>0){
      pizzaObj.offer = 'offer 3 Applied';
      let total = (this.toppingTotal(pizzaObj) + pizzaObj.price) * pizzaObj.quantity;
      return (50*total)/100;
    } else{
      pizzaObj.offer ='';
      return this.toppingTotal(pizzaObj) * pizzaObj.quantity  + pizzaObj.price * pizzaObj.quantity;
    }
  }

  toppingTotal(pizzaObj){
    let toppingsPrice = 0;
    for(const toppingNames of Object.keys(pizzaObj.toppingsDetails)){
      if(pizzaObj.toppingsDetails[toppingNames] > 0){
      toppingsPrice = toppingsPrice + pizzaObj.toppingsDetails[toppingNames];
      }
    }
    return toppingsPrice;
  }
}
