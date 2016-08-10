(function(){
	var app = angular.module("filters", [ ]);


	app.controller("TableDataController", function($scope, $http, $httpParamSerializerJQLike) {

		$scope.cityOptions = ["", "Москва", "Спб", "Геленджик", "Калининград", "Сочи", "Владивосток", "Партизанск"];
		$scope.cityOptions.sort();
		$scope.cityName = $scope.cityOptions[0];
		$scope.selectedCity = [];

		$scope.eduOptions = ["", "Высшее", "Среднее", "Колледж", "Повар", "Магистр", "Юрист"];
		$scope.eduOptions.sort();
		$scope.eduName = $scope.eduOptions[0];
		$scope.selectedEdu = [];

		console.log($scope.eduOptions);

		$scope.tableData = [];


		$scope.addToFilter = function(){

				var ind = $scope.cityOptions.indexOf( $scope.cityName );

				$scope.cityOptions.splice( ind, 1 );
				$scope.selectedCity.push($scope.cityName);    		
				$scope.cityName = $scope.cityOptions[0];
		}

		$scope.removeFromFilter = function(){
			$scope.cityOptions.push( this.city );
			$scope.cityOptions.sort();
			$scope.selectedCity.splice( this.$index, 1 );
		}

		$scope.addToFilterEdu = function(){

				var ind = $scope.eduOptions.indexOf( $scope.eduName );

				$scope.eduOptions.splice( ind, 1 );
				$scope.selectedEdu.push($scope.eduName);    		
				$scope.eduName = $scope.eduOptions[0];
		}

		$scope.removeFromFilterEdu = function(){
			$scope.eduOptions.push( this.edu );
			$scope.eduOptions.sort();
			$scope.selectedEdu.splice( this.$index, 1 );
		}

		//отправить данные фильтра на сервер
		$scope.sendFilter = function(){

			

			var cities = $scope.selectedCity.join(', ');
			var edus = $scope.selectedEdu.join(', ');

			console.log(cities);
			console.log(edus);

			var obj = {
				"cities": cities,
				"edus": edus
			};

			$http({
				  url: 'Filter.php',
				  method: 'POST',
				  data: $httpParamSerializerJQLike(obj), // Make sure to inject the service you choose to the controller
				  headers: {
				    'Content-Type': 'application/x-www-form-urlencoded' // Nte the appropriate header
				  }
				}).success(function(res) { 
	         		createTableData(res);
	    		});
				/*.then(function(res){ //видно что отправили 
					console.log(res.data);
					//$scope.createTableData();
					createTableData(res.data);
					console.log("ниже tableData");
    				console.log($scope.tableData);

				});*/

		}



		function createTableData(receivedData) {
		//$scope.createTableData = function(){

	    	// сортровка по id
	    	receivedData.sort(function(a, b) {
	    		return parseInt(a.user_id) - parseInt(b.user_id);
			});

			console.log(receivedData);


	    	// когда id отсортированы по-порядку
	    	var strResCity = receivedData[0].city_name;
	    	var strResEdu = receivedData[0].edu_name;

	    	for (i = 0; i < receivedData.length; i++) {


	    		if ( (i + 1) == receivedData.length ) {

	    			receivedData[i].city_name = strResCity;
	    			receivedData[i].edu_name = strResEdu;

	    			$scope.tableData.push(receivedData[i]);
	    		}

	    		else if (receivedData[i].user_id == receivedData[i+1].user_id) {


	    			var str1 = receivedData[i+1].city_name;

	    			console.log(str1);

	    			if (strResCity.indexOf(str1) == -1) { // строка не найдена, попался новый город

	    				strResCity = strResCity + ", " + str1;

	    				console.log(strResCity);
	    			}

	    			
	    			var str2 = receivedData[i+1].edu_name;

	    			console.log(str2);

	    			if (strResEdu.indexOf(str2) == -1) { // строка не найдена, попалось новое образование

	    				strResEdu = strResEdu + ", " + str2;

	    				console.log(strResEdu);
	    			}

	    		}
	    		else {

	    			receivedData[i].city_name = strResCity;
	    			receivedData[i].edu_name = strResEdu;
	    			$scope.tableData.push(receivedData[i]);

	    			strResCity = receivedData[i+1].city_name;
	    			strResEdu = receivedData[i+1].edu_name;

	    		}
	    	}
	    };

	   /*
	    //JSON
	    var receivedData = [ //id НЕ по порядку
	    	{
	            'user_id': '1',                      
	            'user_name': 'Вася',         
	            'city_name': 'Москва',     
	            'edu_name': 'среднее'                          
	        },

	        
	        {
	            'user_id': '1',                      
	            'user_name': 'Вася',         
	            'city_name': 'Москва',     
	            'edu_name': 'переводчик англ'                          
	        },
	        {
	            'user_id': '1',                      
	            'user_name': 'Вася',         
	            'city_name': 'Спб',     
	            'edu_name': 'среднее'                          
	        },
	        {
	            'user_id': '1',                      
	            'user_name': 'Вася',         
	            'city_name': 'Спб',     
	            'edu_name': 'высшее'                          
	        },
	        {
	            'user_id': '1',                      
	            'user_name': 'Вася',         
	            'city_name': 'Спб',     
	            'edu_name': 'переводчик англ'                          
	        },
	        {
	            'user_id': '3',                      
	            'user_name': 'Юля',         
	            'city_name': 'Спб',     
	            'edu_name': 'колледж'                          
	        },
	        
	        {
	            'user_id': '2',                      
	            'user_name': 'Петя',         
	            'city_name': 'Спб',     
	            'edu_name': 'школьное'                          
	        }, 
	        {
	            'user_id': '2',                      
	            'user_name': 'Петя',         
	            'city_name': 'Спб',     
	            'edu_name': 'колледж'                          
	        },
	        {
	            'user_id': '1',                      
	            'user_name': 'Вася',         
	            'city_name': 'Геленджик',     
	            'edu_name': 'переводчик англ'                          
	        },   
	        {
	            'user_id': '2',                      
	            'user_name': 'Петя',         
	            'city_name': 'Москва',     
	            'edu_name': 'школьное'                          
	        }, 
	        
	        {
	            'user_id': '1',                      
	            'user_name': 'Вася',         
	            'city_name': 'Москва',     
	            'edu_name': 'высшее'                          
	        },  
	        {
	            'user_id': '15',                      
	            'user_name': 'Гена',         
	            'city_name': 'Калиниград',     
	            'edu_name': 'повар'                          
	        },  
	    ];*/


	});// TableDataController

})(); //main function 