import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  title = 'Pizza-order-System';
  order:any[] =[];
  grandTotal:number = 0;
  mediumPizzaPrice: number =0;
  smallPizzaPrice: number =0;
  largePizzaPrice: number=0;
  exLargePizzaPrice : number=0;
  toppingArray: any = [
      {
        'name': 'Tomato',
        'price': 1,
      },
      {
        'name': 'onions',
        'price': 0.50,
      },
      {
        'name': 'bellPepper',
        'price': 1,
      },
      {
        'name': 'mushrooms',
        'price': 1.20,
      },
      {
        'name': 'pineApple',
        'price': 0.75,
      },
      {
        'name': 'sausage',
        'price': 1,
      },
      {
        'name': 'pepperoni',
        'price': 2,
      },
      {
        'name': 'bbQ',
        'price': 3,
      }
  ]

  pizzaCartDetails:any={
    'small':0,
    'medium':0,
    'large':0,
    'exlarge':0
  }


  price:any ={
    'small':5,
    'medium':7,
    'large': 8,
    'exLarge': 9
  }
  pizzaDetailObj:any = {
    'small':{
      'price':5,
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
   this.pizzaCartDetails[type] = 1;
   this.getTotalCount()
 }
  changeFn(event,size,item){
    if(event.target.checked){
      this.pizzaDetailObj[size].toppingsDetails[item.name] = item.price;
    } else {
      this.pizzaDetailObj[size].toppingsDetails[item.name] = 0;
    }
    this.getTotalCount()
  }
  getTotalCount(){

    let mediumPizzaPrice = 0;
    let largePizzaPrice = 0;
    let smallPizzaPrice = 0;
    let exLargePizzaPrice =0;
    for(const keys of Object.keys(this.pizzaDetailObj)){
      if(this.pizzaCartDetails[keys] > 0){
        if(keys === 'medium') {
          mediumPizzaPrice = this.getSingleMediumPricePizza();
        } else if(keys  === 'large') {
          largePizzaPrice = this.getSingleLargePricePizza();
        } else if(keys  === 'small'){
          smallPizzaPrice = this.getPizzaPrize(keys);
          this.smallPizzaPrice = smallPizzaPrice;
        } else {
          exLargePizzaPrice = this.getPizzaPrize(keys);
          this.exLargePizzaPrice = exLargePizzaPrice;
          }
      }
    }
    this.grandTotal = smallPizzaPrice + mediumPizzaPrice + largePizzaPrice + exLargePizzaPrice ;
  }

  getPizzaPrize(keys){
    let pizzaPrice = 0;
    let toppingsPrice = 0;
    let toppingCount = 0;
    let toppingsDetails = this.pizzaDetailObj[keys].toppingsDetails;
    for(const toppingNames of Object.keys(toppingsDetails)){
      if(toppingsDetails[toppingNames] > 0){
      toppingCount++;
      toppingsPrice = toppingsPrice+toppingsDetails[toppingNames];
      }
    }
    if(toppingCount > 0){
      pizzaPrice = pizzaPrice+((this.pizzaDetailObj[keys].price + toppingsPrice)*this.pizzaCartDetails[keys]);
    }else{
      pizzaPrice = pizzaPrice+(this.pizzaCartDetails[keys] * this.pizzaDetailObj[keys].price)
    }
    return pizzaPrice;
  }

  getSingleMediumPricePizza(){
    let pizzaPrice = 0;
    let mediumPizzaToppingDetails = this.pizzaDetailObj['medium'].toppingsDetails;
    let toppingCount = 0;
    let toppingsPrice = 0;
    for(const keys of Object.keys(mediumPizzaToppingDetails)){
      if(mediumPizzaToppingDetails[keys] > 0){
        toppingCount++;
        toppingsPrice = toppingsPrice+mediumPizzaToppingDetails[keys]
      }
    }
    if(toppingCount == 2){
      pizzaPrice = 5;
    }else if(toppingCount == 0){
      pizzaPrice = this.pizzaDetailObj['medium'].price;
    }else{
      pizzaPrice = toppingsPrice + (this.pizzaDetailObj['medium'].price * 1)
    }
    this.mediumPizzaPrice = pizzaPrice;
    return pizzaPrice;
  }

  getDoubleMediumPricePizza(){
    let pizzaPrice = 0;
    let mediumPizzaToppingDetails = this.pizzaDetailObj['medium'].toppingsDetails;
    let toppingCount = 0;
    let toppingsPrice = 0;
    for(const keys of Object.keys(mediumPizzaToppingDetails)){
      if(mediumPizzaToppingDetails[keys] > 0){
        toppingCount++;
        toppingsPrice = toppingsPrice+mediumPizzaToppingDetails[keys]
      }
    }
    if(toppingCount == 4){
      pizzaPrice = 9;
    }else if(toppingCount == 0){
      pizzaPrice = this.pizzaDetailObj['medium'].price;
    }else{
      pizzaPrice = toppingsPrice + (this.pizzaDetailObj['medium'].price * 2)
    }
    return pizzaPrice;
  }

  getSingleLargePricePizza(){
    let pizzaPrice = 0;
    let largePizzaToppingDetails = this.pizzaDetailObj['large'].toppingsDetails;
    let toppingCount = 0;
    let toppingsPrice = 0;
    for(const keys of Object.keys(largePizzaToppingDetails)){
      if(largePizzaToppingDetails[keys] > 0){
        toppingCount++;
        toppingsPrice = toppingsPrice+largePizzaToppingDetails[keys]
      }
    }
    if(toppingCount == 4){
      pizzaPrice = toppingsPrice + (this.pizzaDetailObj['large'].price * 1);
      pizzaPrice = (50*pizzaPrice)/100
    }else if(toppingCount == 0){
      pizzaPrice = this.pizzaDetailObj['large'].price;
    }else{
      pizzaPrice = toppingsPrice + (this.pizzaDetailObj['large'].price * 1)
    }
    this.largePizzaPrice = pizzaPrice;
    return pizzaPrice;
  }



}
