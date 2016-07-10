"use strict"

var customer_id = 0;
var customers = [];

var BarTender = function() {
  this.orders = [];
};

BarTender.prototype.serve = function() {
  window.setInterval(this.response.bind(this), 3000);
};

BarTender.prototype.response = function() {
  if(this.orders.length) {
    var drink = this.orders[0].toString();
    customers[this.orders[0].id].receive(drink);
    this.orders.shift();
  }
  else console.log("bartender is ready!");
};

var Order = function (id, order_array) {
  var order = this;
  $.each(order_array, function(i, val) {
    order[order_array[i].name] = order_array[i].value;
  });
  this.id = id;
};

var Customer = function(id, server) {
  this.id = id;
  this.selector = $(".customer" + this.id);
  this.server = server;
};

Customer.prototype.request = function(order) {
  this.server.orders.push(order);
};

Customer.prototype.receive = function(drink) {
  this.selector.append("drink received!");
};

$(document).ready(function() {

  var bartender = new BarTender();
  bartender.serve();

  customer_id += 1;
  var customer = new Customer(customer_id, bartender);
  customers.push(customer);
  console.log(customers);

  $(".customers").on("submit", "form", function(event) {
    event.preventDefault();

    var getId = $(this).attr("id").replace("customer", "");
    var customer_order = new Order(parseInt(getId), $(this).serializeArray());
    
    customers[getId-1].request(customer_order);
  });

});


