//Mock 14 questions
function getSemilatticeQuestionsMock() {
  var questions = [];

  for(var i = 1, k = 1; i < 15; i++) {
    //if questions are final, add result messages
    if (i > 8) {
      questions.push(new Question({
        id: i,
        text: "Question " + i + " text",
        answers: [
          new Answer({ text: "Answer 1 text", resultText: "Result message " + k + "!"}),
          new Answer({ text: "Answer 2 text", resultText: "Result message " + ++k + "!"})
        ]
      }));
      //increment Result number counter
      k++;
      console.log(questions[i-1].answers[0].resultText);
      console.log(questions[i-1].answers[1].resultText);
    } else {
      questions.push(new Question({
        id: i,
        text: "Question " + i + " text",
        answers: [
          new Answer({ text: "Answer 1 text" }),
          new Answer({ text: "Answer 2 text" })
        ]
      }));
      //add third answer to questions
      //with ID 2 and 4
      if (i === 2 || i === 4) {
        questions[questions.length - 1].answers.push(new Answer({ text: "Answer 3 text" }));
      }
    }
  }

  //add "Semilattice" relations only to questions, which are not final.
  //Questions have next stucture (second part of scheme)
  //https://oinkerme.files.wordpress.com/2015/01/tree-semilattice.png.
  //For testing purposes, in "docs" directory of this project you can find same
  //scheme, but with nodes ID's set corresponding to questions ID's in this app
  //This way you can visually check if app is running correctly
  questions[0].answers[0].setNextQuestion(questions[1]);
  questions[0].answers[1].setNextQuestion(questions[2]);
  questions[1].answers[0].setNextQuestion(questions[3]);
  questions[1].answers[1].setNextQuestion(questions[4]);
  questions[1].answers[2].setNextQuestion(questions[5]);
  questions[2].answers[0].setNextQuestion(questions[5]);
  questions[2].answers[1].setNextQuestion(questions[13]);
  questions[3].answers[0].setNextQuestion(questions[8]);
  questions[3].answers[1].setNextQuestion(questions[9]);
  questions[3].answers[2].setNextQuestion(questions[10]);
  questions[4].answers[0].setNextQuestion(questions[9]);
  questions[4].answers[1].setNextQuestion(questions[6]);
  questions[5].answers[0].setNextQuestion(questions[6]);
  questions[5].answers[1].setNextQuestion(questions[7]);
  questions[6].answers[0].setNextQuestion(questions[10]);
  questions[6].answers[1].setNextQuestion(questions[11]);
  questions[7].answers[0].setNextQuestion(questions[11]);
  questions[7].answers[1].setNextQuestion(questions[12]);

  return questions;
}

//Answer model
function Answer(data) {
  var self = this;
  self.text = data.text || "";
  //next question reference
  self.nextQuestion = data.nextQuestion || undefined;
  self.resultText = data.resultText || "";

  self.setNextQuestion = function(nextQuestion) {
    self.nextQuestion = nextQuestion;
  };

  //Show either next question if available,
  //or final test result
  self.showResult = function() {
    if (self.resultText.length > 0) {
      alert(self.resultText);
      location.reload();
    } else {
      //hide all previousely active questions
      document.querySelector('.active').classList.remove('active');
      self.nextQuestion.show();
    }
  };
}

//Question model
function Question(data) {
  var self = this;
  self.id = data.id;
  self.text = data.text;
  self.answers = data.answers;
  //reference to related "section.question" element
  //attached during DOM building procedure
  self.containingElement = undefined;

  //setter function for "self.containingElement"
  self.setContainingElement = function(domElement) {
    self.containingElement = domElement;
  };

  //show curent question related DOM element
  self.show = function() {
    if (self.containingElement) {
      self.containingElement.classList.add('active');
    }
  };
  //hide curent question related DOM element
  self.hide = function() {
    if (self.containingElement) {
      self.containingElement.classList.remove('active');
    }
  };
}

document.addEventListener('DOMContentLoaded', function() {
  var questions = getSemilatticeQuestionsMock();

  //build question elements DOM structure
  function buildDom() {
    var $questionDocumentFragment = new DocumentFragment(),
        $questionsWrapper = document.querySelector('.questions-wrapper');

    //Create "section.question" element with question text
    //and unordered list of answers
    questions.forEach(function(question) {
      var $section = document.createElement('section'),
          questionHTMLString = '',
          answersElements;

      $section.classList.add('question');
      question.setContainingElement($section);

      questionHTMLString += '<h4>' + question.text + '</h4>' +
                            '<ul class="question-answers-list">';
      question.answers.forEach(function(answer) {
        questionHTMLString += '<li class="answer-item">' +
          '<label><input type="radio" />' + answer.text + '</label>' +
          '</li>';
      });
      questionHTMLString += '</ul>';

      $section.innerHTML = questionHTMLString;

      [].forEach.call($section.querySelectorAll('.answer-item'), function(answer, index) {
        answer.onclick = question.answers[index].showResult;
      });

      $questionDocumentFragment.appendChild($section);
    });

    $questionsWrapper.appendChild($questionDocumentFragment);
  }

  buildDom();
  questions[0].show();
});
