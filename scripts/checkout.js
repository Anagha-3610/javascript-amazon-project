import { renderOrderSummary } from './checkout/orderSummary.js';
import { renderPaymentSummary } from './checkout/paymentSummary.js';

import { loadProducts, loadProductsFetch } from '../data/products.js';
import { loadCart } from '../data/cart.js';
//import '../data/cart-class.js'
//import '../data/backend-practice.js';

async function loadPage() {


  await loadProductsFetch();

  await new Promise((resolve) =>{
    loadCart(()=>{
      resolve();
    });
  });

    renderOrderSummary();
    renderPaymentSummary();

  return 'value2'// to return a like done with resolve here return is used.
}
//Async makes a function return a promise. 
loadPage();

/*
Promise.all([
  loadProductsFetch(),
  new Promise((resolve) =>{
    loadCart(()=>{
      resolve();
    });
  })

]).then((values) => {
  console.log(values)
  renderOrderSummary();
  renderPaymentSummary();
})
*/

/*
new Promise((resolve) => {
  loadProducts(() => {
    resolve('value1');
  });
}).then((value) => {
  console.log(value);
  //Can share a value between two steps of a promise.
  return new Promise((resolve) =>{
    loadCart(()=>{
      resolve();
    });
  });
}).then(() => {
  renderOrderSummary();
  renderPaymentSummary();
});
*/

/*
loadProducts(() => {
  loadCart(() =>{
    renderOrderSummary();
    renderPaymentSummary();
  });
});
*/