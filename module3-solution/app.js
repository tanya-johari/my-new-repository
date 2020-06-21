(function(){
  'use strict'
  angular.module("NarrowItDownApp",[])
  .controller("NarrowItDownController",NarrowItDownController)
  .service("MenuSearchService",MenuSearchService)
  .directive('foundItems',FoundItemsDirective)
  .constant('ApiBasePath','https://davids-restaurant.herokuapp.com');

  function FoundItemsDirective(){
    var ddo = {
      templateUrl: 'foundDisplay.html',
      scope:{
        found: '<',
        onRemove: '&'
      },
      controller: FoundItemsDirectiveController,
      controllerAs: 'dctrl',
      bindToController: true
    };
    return ddo;
  }

  function FoundItemsDirectiveController(){
    console.log("dirController",this);
  }

  NarrowItDownController.$inject = ["MenuSearchService"];
  function NarrowItDownController(MenuSearchService) {
    var ctrl = this;
    ctrl.searchTerm = "";
    ctrl.getMatchedMenuItems = function(){
      var foundPromise = MenuSearchService.getMatchedMenuItems(ctrl.searchTerm);
      foundPromise.then((response)=>{
        ctrl.found = response;
        console.log(response.length);
      })
      //console.log("Ctrl:",ctrl.found);
    };
    ctrl.removeItem = function(index){
      ctrl.found.splice(index,1);
    }
  }

  MenuSearchService.$inject = ['$http','ApiBasePath'];
  function MenuSearchService($http,ApiBasePath){
    var service = this;

    service.getMatchedMenuItems = function (searchTerm) {
      var response = $http({
        method:"GET",
        url:(ApiBasePath+"/menu_items.json")
    }).then((response) => {
        var menu_items = response.data.menu_items;
        //console.log("Service: ",menu_items);
        return menu_items.filter(function(val){
          return (searchTerm!==""&&val.description.indexOf(searchTerm)!==-1);
        })

      }).catch((err) => {
        console.log(err.status +": "+err.statusText);
      });
      return response;
    }
  }
})();
