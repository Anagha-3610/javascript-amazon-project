export const orders = JSON.parse(localStorage.getItem('orders')) || [];

export function addOrder(order){
  orders.unshift(order);
  saveToStorage();
}
// Unshift - Most recent order at the top. Adds it to the front of the array.

function saveToStorage(){
  localStorage.setItem('orders', JSON.stringify(orders));
}