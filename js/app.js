"use strict"

$(document).ready(function() {
  var customer_id = 0;
  var customers = [];
  var bartender = new barTender();
  console.log(bartender);
  window.setInterval(bartender.response, 3000);

  $("form").submit(function(event) {
    event.preventDefault();

    var getId = $(this).attr("id").replace("customer", "");
    var customer_order = new order(parseInt(getId), $(this).serializeArray());
    
    customer[getId].request(customer_order);
  });

});

var order = function (id, order_array) {
  var order = this;
  $.each(order_array, function(i, val) {
    order[order_array[i].name] = order_array[i].value;
  });
  this.id = id;
};

var customer = function(customer_id) {
  this.id = customer_id;
  this.selector = $(".customer" + this.id);
};

customer.prototype.request = function(order) {
  bartender.orders.push(order);
};

customer.prototype.receive = function(drink) {
  this.selecotr.append("drink received!");
};

var barTender = function() {
  this.orders = [];
};

barTender.prototype.response = function() {
  console.log(this.orders);
  if(this.orders.length) {
    var drink = this.orders[0].toString();
    customers[this.orders[0].id].receive(drink);
    this.orders.shift();
  }
  else console.log("bartender is ready!");
};