var app = angular.module('app', ['ngAnimate']);

app.controller('MyController', function($scope,$interval,$timeout){
 	
//====================== GAME ===========================

	$scope.game = {
		win     : false,
		lose    : false,
		score   : 0,
		record  : 0,
		start   : true,
		info    : true
	};


	$scope.start = function () {

		$scope.game.lose = false;
		$scope.game.win  = false;
		$scope.game.info = false;

       $timeout(function() {
	 
	 		$scope.game.score = 0;

	 		$scope.board = {
				speed : 10,
				width : 200,
				x     : 300,
				y     : 650
			};	
			//random start position 
			var rand = Math.round(0 - 0.5 + Math.random() * (685 - 0 + 1));

			$scope.ball = {
				show  : true,
				speed : 1,
				x     : rand,
				y     : 0
			};

			$interval.cancel($scope.yDOWN);
			$interval.cancel($scope.yRIGHT);
			$interval.cancel($scope.yLEFT);

			$scope.yDOWN = $interval($scope.ballMoveDown, 1);
			$scope.yLEFT = $interval($scope.ballMoveLeft, 1);
		}, 1500);
	}

 //======================== board ===========================

	$scope.board = {
		speed : 10,
		width : 200,
		x     : 300,
		y     : 650
	};

 	$scope.move = function() {

	 		if ( event.keyCode === 100) {
	 			if ($scope.board.x <= (680 - $scope.board.width)) {
 					$scope.board.x += $scope.board.speed;
 				}
	 		}
	 		
	 		if (event.keyCode === 97) {
	 			if ($scope.board.x >= 10) {
 					$scope.board.x -= $scope.board.speed;
 				}
	 		}
	};

//========================== ball DOWN===========================

	$scope.ballMoveDown = function () {
		$scope.ball.y += $scope.ball.speed;
		$scope.game.start = false;
 			if ($scope.ball.y >= $scope.board.y) {

 				if($scope.board.x >= ($scope.ball.x + 6 - $scope.board.width)  && $scope.board.x <= ($scope.ball.x + 11)) { //reflect
	 				$scope.board.width -= 5;
	 				$scope.ball.speed  += 0.1;
	 				$scope.game.score ++;
					$interval.cancel($scope.yDOWN);
		 			$scope.yUP = $interval($scope.ballMoveUp, 1);
 				}
 			}

 			if ($scope.ball.y >= 670){

 				if ($scope.game.score > $scope.game.record) {
					$scope.game.record= $scope.game.score;

					$interval.cancel($scope.yDOWN);
					$interval.cancel($scope.yRIGHT);
					$interval.cancel($scope.yLEFT);
					$scope.game.win = true;
					$scope.game.start = true;
					return;
				} else {

					$scope.game.lose = true;
					$scope.game.start = true;
					$interval.cancel($scope.yDOWN);
					$interval.cancel($scope.yRIGHT);
					$interval.cancel($scope.yLEFT);
				}
 			}

	};
   
//============================ball UP===========================

	$scope.ballMoveUp = function () {
			
		$scope.ball.y -= $scope.ball.speed;

		if ($scope.ball.y <= 0 ) {
			$interval.cancel($scope.yUP);
			$scope.yDOWN = $interval($scope.ballMoveDown, 1);
		}
	};
	
//=============================ball left===========================

	$scope.ballMoveLeft = function () {
			
		$scope.ball.x -= 1;

			if ($scope.ball.x <= 0 ) {
				$interval.cancel($scope.yLEFT);
				$scope.yRIGHT = $interval($scope.ballMoveRight, 1);
			}
	};

//===========================ball right===========================

	$scope.ballMoveRight = function () {
			
			$scope.ball.x += 1;

			if ($scope.ball.x >= 675 ) {
				$interval.cancel($scope.yRIGHT);
				$scope.yLEFT = $interval($scope.ballMoveLeft, 1);
			}
	};

});







