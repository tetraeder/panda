bpExerciseApp.service('CommentsService', function ($http) {
  this.List = () => {
    return $http({
      url: '/comments',
      method: 'GET'
    }).then((results) => results.data);
  }
  
  this.SendComment = (comment) => {
	console.log(comment);
    return $http.post('/comments/add', {
    	comment: comment.text,
    }).then((results) => {
      return results.data;
    });
  }

  this.SendRating = (commentId, rate) => {
    return $http.post('/comments/' + commentId + '/rate', {
      rate: rate,
    }).then((results) => {
      return results.data;
    });
  }
  
});

bpExerciseApp.service('CommentsFactory', function () {
  return {
    socket: io()
  };
});
