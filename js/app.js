var app = angular.module('quizApp', []);

app.factory('quizFactory', function(){
   var questions = [
      {
         question: "Which is the largest country in the world by population?",
         options: ["India", "USA", "China", "Russia"],
         answer: 2
      }
   ];

   return {
      getQuestion: function(id) {
         if(id < questions.length) {
            return questions[id];
         } else {
            return false;
         }
      }
   };
});

app.directive('quiz', function(quizFactory){
   return {
      restrict: 'AE',
      scope: {},
      templateUrl: 'template.html',
      link: function(scope, elem, attrs){
         scope.start = function () {
            scope.id = 0;
            scope.quizOver = false;
            scope.inProgress = true;
            scope.getQuestion();
         };

         scope.reset = function() {
            scope.inProgress = false;
            scope.score = 0;
         };

         scope.getQuestion = function() {
            var q = quizFactory.getQuestion(scope.id);
            if(q){
               scope.question = q.question;
               scope.options = q.options;
               scope.answer = q.answer;
               scope.answerMode = true;
               scope.chosenanswer = q.options[0];
            } else {
               scope.quizOver = true;
            }
         };

         scope.checkAnswer = function() {
            if(scope.chosenanswer == scope.options[scope.answer]){
               scope.score++;
               scope.correctAns = true;
            } else {
               scope.correctAns = false;
            }
            scope.answerMode = false;
         };

         scope.nextQuestion = function(){
            scope.id++;
            scope.getQuestion();
         }

         scope.reset();
      }
   }
});
