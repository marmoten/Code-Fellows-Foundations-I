var DonutMaster = function() {

  this.donutShops = [];

  this.addDonutShop = function(newShop) {
    this.donutShops.push(newShop);
  };

  this.generateReport = function() {
    $('tr:gt(0)').remove();
    for ( var index = 0 ; index < this.donutShops.length ; index++ ) {
      $('table').append('<tr class="shop"><td class="location">' + this.donutShops[index].name + '</td><td class="data">' + this.donutShops[index].getDonutsPerHour() +
        '</td><td class="data">' + this.donutShops[index].getDonutsPerDay() + '</td></tr>');
    }
    $('.data').hide();
    $('.shop').on('mouseover', function() {
      $(this).children('td').css('background-color', 'Purple');
    });
    $('.shop').on('mouseout', function() {
      $(this).children('td').css('background-color', '#CCBBCC');
    });
    $('.shop').on('click', function() {
      $(this).children('.location').fadeOut(50);
      $(this).children('.location').fadeIn(50);
    });
    $('.shop').on('click', function() {
      $(this).children('.data').fadeIn(400);
    });
  };

  this.userAddShop = function() {
    var userName = $("#locationName").val();
    var userHours = $("#hours").val();
    var userMinCustomerPerHour = $("#minCustomerPerHour").val();
    var userMaxCustomerPerHour = $("#maxCustomerPerHour").val();
    var userAvgDonutsPerCustomer = $("#avgDonutsPerCustomer").val();
    dm.addDonutShop(new TopPotLocation(userName, userHours, userMinCustomerPerHour, userMaxCustomerPerHour, userAvgDonutsPerCustomer));
    document.getElementById("userAddShopForm").reset();
    dm.generateReport();
  };
};

var TopPotLocation = function (name, numberOfHoursPerDay, minCustomersPerHour, maxCustomersPerHour, avgDonutsPerCustomer) {
  this.name = name;
  this.numberOfHoursPerDay = numberOfHoursPerDay;
  this.minCustomersPerHour = minCustomersPerHour;
  this.maxCustomersPerHour = maxCustomersPerHour;
  this.avgDonutsPerCustomer = avgDonutsPerCustomer;
  this.peakHours = 2;

  this.getCustomersPerHour = function(hours) {
    if (hours === "peak") {
      return Math.round(Math.random() * (this.maxCustomersPerHour - (this.minCustomersPerHour * 2)) + (this.minCustomersPerHour * 2));
    }
    else {
      return Math.round(Math.random() * ((this.maxCustomersPerHour / 2) - this.minCustomersPerHour) + this.minCustomersPerHour);
    }

  };
  this.getCustomersPerDay = function() {
    var totalCustomersPerDay = 0;
    for (var index = 0 ; index < (this.numberOfHoursPerDay - this.peakHours) ; index++ ) {
      totalCustomersPerDay += this.getCustomersPerHour("offPeak");
    }
    for (index = 0 ; index < this.peakHours ; index++ ) {
      totalCustomersPerDay += this.getCustomersPerHour("peak");
    }
    return totalCustomersPerDay;
  };

  this.getDonutsPerHour = function() {
    return Math.round(this.getCustomersPerHour() * this.avgDonutsPerCustomer);
  };

  this.getDonutsPerDay = function() {
    return Math.round(this.getCustomersPerDay() * this.avgDonutsPerCustomer);
  };
};

var dm = new DonutMaster();

dm.addDonutShop(new TopPotLocation("Downtown", 15, 8, 43, 4.5));
dm.addDonutShop(new TopPotLocation("Capitol Hill", 13, 4, 37, 2));
dm.addDonutShop(new TopPotLocation("South Lake Union", 15, 9, 23, 6.33));
dm.addDonutShop(new TopPotLocation("Wedgwood", 12, 2, 28, 1.25));
dm.addDonutShop(new TopPotLocation("Ballard", 11, 8, 58, 3.75));

dm.generateReport();

$('#newShopButton').on('click', function(e) {
  e.preventDefault();
  dm.userAddShop();

});


