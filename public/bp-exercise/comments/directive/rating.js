var ratingController  = ['$scope', function ($scope) {
      const vm = this;
      vm.stars = [];
      vm.myScore = 0;
      vm.avScore = 0;
      
      if (!vm.comment){
    	  vm.comment = {};
      }
      
      vm.$onInit = function () {
        vm.avScore = vm.setAvScore(vm.comment);
        vm.stars[Math.round(vm.avScore)] = true;
      };

	  // leave calc to client as discussed on interview
      vm.setAvScore = (comment) => {
        return (Math.round(comment.rate / comment.ratingHits * 100) / 100) || 0;
      }

      vm.clickScore = (score) => {
        vm.myScore = parseInt(score, 10);
        let stars = [];
        stars[vm.myScore] = true;

        vm.sendRating({
          commentId: vm.comment._id,
          rate: vm.myScore
        }).then((data) => {
          vm.stars = stars;
          vm.avScore = vm.setAvScore(data);
        });
      }
      
	$scope.$watch('vm.comment', function (newValue, oldValue) {
		  vm.avScore = vm.setAvScore(newValue);
		});

    }];

bpExerciseApp.directive('rating', function () {
  return {
    templateUrl: 'bp-exercise/comments/directive/rating.html',
    scope: {
      comment: '=',
      sendRating: '&'
    },
    bindToController: true,
    controllerAs: 'vm',
    controller: ratingController
  };
});

