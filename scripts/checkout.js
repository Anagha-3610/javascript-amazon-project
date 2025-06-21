import { cart, removeFromCart, updateDeliveryOptId } from '../data/cart.js';
import { products } from '../data/products.js';
import { formatCurrency } from './utils/money.js'; 
import {hello} from 'https://unpkg.com/supersimpledev@1.0.1/hello.esm.js';
import  dayjs  from 'https://unpkg.com/supersimpledev@8.5.0/dayjs/esm/index.js';
import { deliveryOptions } from '../data/deliveryOptions.js';
//why we removed the curly braces=> default export when we want to export only one thing from the file=> export default Function_Name; at the end of the file.

hello();
const today = dayjs();

const deliverydate = today.add(7,'days');

console.log(deliverydate.format('dddd, MMMM D'));
let summaryHTML='';

cart.forEach((cartItem)=>{

  const productId=cartItem.productId;

  let matchingProduct;
  products.forEach((product)=>{
    if(product.id===productId){
      matchingProduct=product;
    }
  });

  const deliveryOptionId = cartItem.deliveryOptionsId;

  let deliveryOption;
  
  deliveryOptions.forEach((option)=>{
  if(option.id === deliveryOptionId){
    deliveryOption = option;
  }
  });
  
  const today = dayjs();
  const deliveryDate=today.add(
    deliveryOption.deliveryDays, 'days'
  );
  const dateString = deliveryDate.format(
    'dddd, MMMM D'
  );


  summaryHTML+= `
  <div class="cart-item-container 
  js-cart-item-container-${matchingProduct.id}">
    <div class="delivery-date">
      Delivery date: ${dateString}
    </div>

    <div class="cart-item-details-grid">
      <img class="product-image"
        src="${matchingProduct.image}">

      <div class="cart-item-details">
        <div class="product-name">
          ${matchingProduct.name}
        </div>
        <div class="product-price">
          $${formatCurrency(matchingProduct.priceCents)}
        </div>
        <div class="product-quantity">
          <span>
            Quantity: <span class="quantity-label">${cartItem.quantity}</span>
          </span>
          <span class="update-quantity-link link-primary">
            Update
          </span>
          <span class="delete-quantity-link link-primary js-delete-link" data-product-id=${matchingProduct.id}>
            Delete
          </span>
        </div>
      </div>

      <div class="delivery-options">
        <div class="delivery-options-title">
          Choose a delivery option:
        </div>
        
        ${deliveryOptionsHTML(matchingProduct,cartItem)}

      </div>
    </div>
  </div>
  `;
});

function deliveryOptionsHTML(matchingProduct,cartItem){
  let HTML = '';
  deliveryOptions.forEach((deliveryOption)=>{
    const today = dayjs();
    const deliveryDate=today.add(
      deliveryOption.deliveryDays, 'days'
    );
    const dateString = deliveryDate.format(
      'dddd, MMMM D'
    )
    const priceString = deliveryOption.priceCents===0 ? 'FREE' : `$ ${formatCurrency(deliveryOption.priceCents)} -`

    const isChecked = deliveryOption.id ===
    cartItem.deliveryOptionsId;

    HTML+=
      `<div class="delivery-option js-delivery-option" data-product-id="${matchingProduct.id}" data-delivery-options-id="${deliveryOption.id}">
        <input type="radio"
          ${isChecked ? 'checked' : ''}
          class="delivery-option-input"
          name="delivery-option-${matchingProduct.id}">
        <div>
          <div class="delivery-option-date">
            ${dateString}
          </div>
          <div class="delivery-option-price">
            ${ priceString } Shipping
          </div>
        </div>
      </div>`
  });

  return HTML;
}
//LOOP THROUGH DELIVERY OPTIONS
//FOR EACH OPTION, GENERATE SOME HTML
//COMBINE THE HTML TOGETHER


document.querySelector('.js-order-summary').innerHTML = summaryHTML;

// console.log(summaryHTML);


document.querySelectorAll('.js-delete-link')
  .forEach((link) => {
    link.addEventListener('click',() => {
      const productId = link.dataset.productId;
      removeFromCart(productId);
      
      const container = document.querySelector(
        `.js-cart-item-container-${productId}`);
      container.remove();
      // to remove the HTML of the removed element remove is used.
    });
  });


document.querySelectorAll('.js-delivery-option').forEach((element)=>{
  element.addEventListener('click',()=>{
    const {productId,deliveryOptionsId} = element.dataset;
    updateDeliveryOptId(productId,deliveryOptionsId);
  });
});