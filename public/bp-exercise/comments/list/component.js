function ListController(CommentsService, CommentsFactory, $scope) {
  const vm = this;
  vm.comments = [];
  
  vm.sendRating = CommentsService.SendRating;
  vm.socket = CommentsFactory.socket;
  vm.sendComment = CommentsService.SendComment;

  vm.addComment = (text) => {
	  $scope.text = '';
	  console.log(text);
        vm.sendComment({
          text: text,
        }).then((data) => {
            vm.comments = data;
        });
      }
  
  vm.socket.on('newRating', function (comment) {
    vm.comments.forEach((currentComment, index) => {
      if (comment._id === currentComment._id) {
//    	  vm.comments[index].rate = comment.rate;
//    	  vm.comments[index].ratingHits = comment.ratingHits;
    	  vm.comments[index] = angular.copy(comment);
        $scope.$apply();
      }
    });
  });
  
vm.socket.on('newComment', function (comments) {
    vm.comments = comments;
    $scope.$apply();
  });

  CommentsService.List().then((comments) => {
    vm.comments = comments;
  });
}

ListController.$inject = ['CommentsService', 'CommentsFactory'];

bpExerciseApp.component('commentsList', {
  controller: ['CommentsService', 'CommentsFactory', '$scope', ListController],
  templateUrl: 'bp-exercise/comments/list/list.html'
});
