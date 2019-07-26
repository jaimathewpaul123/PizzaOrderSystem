import { Component , OnInit} from '@angular/core';
import { OrderserviceService } from './orderservice.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})



export class AppComponent implements OnInit{

  constructor (private orderservice: OrderserviceService) { }

  title = 'Pizza-order';
  grandTotal:number = 0;
  pizzaDetailObj:any;
  toppingArray:any;

ngOnInit(){
  this.pizzaDetailObj = this.orderservice.getPizzaObj();
  this.toppingArray = this.orderservice.getToppingArray();
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
