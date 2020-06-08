(function () {
'use strict';

angular.module('app',[])
.controller('ToBuyController', ToBuyController)
.controller('AlreadyBoughtController', AlreadyBoughtController)
.service('ShoppingListService', ShoppingListService);

//To buy list
	ToBuyController.$inject =['ShoppingListService'];
	function ToBuyController (ShoppingListService){
		var buy = this;

		buy.items = ShoppingListService.buyItems();

		buy.removeItem = function(itemIndex){
			ShoppingListService.bought(itemIndex);
		};

	}

	//Already bought list
	AlreadyBoughtController.$inject =['ShoppingListService'];
	function AlreadyBoughtController (ShoppingListService){
		var bought = this;

		bought.items = ShoppingListService.boughtItems();
	}

//Shopping list service
	function ShoppingListService(){
		var service = this;

		var buyItems = [
		{name: "cookies",
		 quantity: 10
		},
		{name: "chips",
		 quantity: 20
		},
		{name: "cake",
		 quantity: 5
		},
		{name: "carrots",
		 quantity: 10
		},
		{name: "tomatoes",
		 quantity: 9
		}];
		//var buyItems = [{name:"a",quantity:10}];
		var boughtItems = [];

		service.bought = function(itemIndex) {
			boughtItems.push(buyItems[itemIndex]);
			buyItems.splice(itemIndex, 1);
		};

		service.boughtItems = function(){
			return boughtItems;
		};

		service.buyItems = function(){
			return buyItems;
		};
	}

})();
