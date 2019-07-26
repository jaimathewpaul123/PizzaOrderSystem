import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class OrderserviceService {

  constructor() { }

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

  getPizzaObj(){
    return this.pizzaDetailObj;
  }
  getToppingArray(){
    return this.toppingArray;
  }
}
