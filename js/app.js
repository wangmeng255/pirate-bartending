"use strict"

var customer_id = 0;
var customers = [];

var BarTender = function() {
  this.orders = [];
};

BarTender.prototype.serve = function() {
  window.setInterval(this.response.bind(this), 1000);
};

BarTender.prototype.response = function() {
  if(this.orders.length) {
    var drink = new Drink(this.orders[0]);
    $(".bartender").text("bartender is serving customer" + String(this.orders[0].id + 1));
    customers[this.orders[0].id].receive(drink);
    this.orders.shift();
  }
  else $(".bartender").text("bartender is ready!");
};

var Drink = function(order) {
  this.color = [0, 0, 0];
  this.opacity = 1 - getPercent(order.bitter);
  this.color[1] = (getPercent(order.fruit) + getPercent(order.sweet)) * 255;
  this.color[2] = (getPercent(order.salty) + getPercent(order.sweet)) * 255;
  this.color[0] = (getPercent(order.strong) + getPercent(order.sweet)) * 255;

  function getPercent(val) {
    if(val === "0") return 0;
    if(val === "1") return 0.25;
    if(val === "2") return 0.5;
    if(val === "3") return 0.75;
  }
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
  this.selector = $(".customer" + String(this.id + 1));
  this.server = server;
};

Customer.prototype.request = function(order) {
  this.server.orders.push(order);
};

Customer.prototype.receive = function(drink) {
  var svgClone = $(".not-display svg").clone();
  
  svgClone.find(".wine").get(0).style.fill = 
    "rgb(" + 
    Math.round(drink.color[0]) + "," + 
    Math.round(drink.color[1]) + "," + 
    Math.round(drink.color[2]) + ")";
  svgClone.find(".wine").get(0).style.opacity = drink.opacity;

  this.selector.append(svgClone);
};

$(document).ready(function() {

  var bartender = new BarTender();
  bartender.serve();

  customer_id += 1;
  var customer = new Customer(customer_id - 1, bartender);
  customers.push(customer);

  $(".customers").on("submit", "form", function(event) {
    event.preventDefault();

    var getId = parseInt($(this).attr("id").replace("customer", "")) - 1;
    var customer_order = new Order(getId, $(this).serializeArray());
    
    customers[getId].request(customer_order);
  });
});


