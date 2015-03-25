
//Answer model
function Answer(data) {
  var self = this;
  self.text = data.text || "";
  //next question reference
  self.nextQuestion = data.nextQuestion || undefined;
  self.resultText = data.resultText || "";

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

function getQuestionById(id, questionsList) {
  for(var i = 0, length = questionsList.length; i < length; i++) {
    if (questionsList[i].id === id) {
      return questionsList[i];
    }
  }
  return null;
}

function parseJSONTestsObject(array) {
  var questions = [];

  questions = array.map(function(question) {
    return new Question({
      id: question.id,
      text: question.text,
      answers: question.answers.map(function(answer) {
        return new Answer({
          text: answer.text,
          nextQuestion: answer.nextQuestion,
          resultText: answer.resultText
        });
      })
    })
  });

  questions.forEach(function(question) {
    var nextQuestionId = 0;
    for(var i = 0, length = question.answers.length; i < length; i++) {
      nextQuestionId = question.answers[i].nextQuestion;

      if(nextQuestionId) {
        question.answers[i].nextQuestion = getQuestionById(nextQuestionId, questions);
      }
    }
  });

  return questions;
}

//Mock for test "WHICH PROGRAMMING LANGUAGE SHOULD I LEARN FIRST?"
//which can be found by following link
//http://cdn2.carlcheo.com/wp-content/uploads/2014/12/which-programming-language-should-i-learn-first-infographic.png
function programmingLanguagesTestMock() {
  var questionsList = [{
      id: 1,
      text: "Why do you want to learn programming?",
      answers: [{
        text: "For my kids",
        resultText: "Start with Scratch, and then move on to Python"
      }, {
        text: "Make money",
        nextQuestion: 2
      }, {
        text: "I don't know, just pick one for me",
        resultText: "Python"
      }, {
        text: "Just for fun",
        nextQuestion: 13
      }, {
        text: "I'm interesed",
        nextQuestion: 13
      }, {
        text: "Improve myself",
        nextQuestion: 13
      }]
    }, {
      id: 2,
      text: "How do you plan to make money?",
      answers: [{
        text: "Get a job",
        nextQuestion: 3
      }, {
        text: "I have a startup idea!",
        nextQuestion: 11
      }]
    }, {
      id: 3,
      text: "Which platform/field?",
      answers: [{
        text: "I want work for big tech companies",
        nextQuestion: 4
      }, {
        text: "Doesn't matter, I just want $$$",
        resultText: "Java"
      }, {
        text: "Web",
        nextQuestion: 5
      }, {
        text: "Enterprise",
        nextQuestion: 7
      }, {
        text: "Mobile",
        nextQuestion: 8
      }, {
        text: "3D/Gaming",
        resultText: "C++"
      }]
    }, {
      id: 4,
      text: "Which of one following companies do you prefer?",
      answers: [{
        text: "Facebook",
        resultText: "Python"
      }, {
        text: "Microsoft",
        resultText: "C#"
      }, {
        text: "Apple",
        resultText: "Objective C"
      }, {
        text: "Google",
        resultText: "Python"
      }]
    }, {
      id: 5,
      text: "Which side of web-development will you choose?",
      answers: [{
        text: "Front-end(web interface)",
        resultText: "JavaScript"
      }, {
        text: "Back-end(\"brain\" behind a website)",
        nextQuestion: 6
      }]
    }, {
      id: 6,
      text: "I want to work for...",
      answers: [{
        text: "Corporate",
        nextQuestion: 7
      }, {
        text: "Startup",
        nextQuestion: 9
      }]
    }, {
      id: 7,
      text: "What do you think about Microsoft?",
      answers: [{
        text: "I'm a fan!",
        resultText: "C#"
      }, {
        text: "Not bad",
        resultText: "Java"
      }, {
        text: "Suck",
        resultText: "Java"
      }]
    }, {
      id: 8,
      text: "Which OS?",
      answers: [{
        text: "iOS",
        resultText: "Objective C"
      }, {
        text: "Android",
        resultText: "Java"
      }]
    }, {
      id: 9,
      text: "Do you want to try something new with huge potential, but less mature?",
      answers: [{
        text: "YES",
        resultText: "JavaScript"
      }, {
        text: "NOT SURE",
        nextQuestion: 10
      }, {
        text: "NO",
        nextQuestion: 10
      }]
    }, {
      id: 10,
      text: "Which one is your favourite toy?",
      answers: [{
        text: "Lego",
        resultText: "Python"
      }, {
        text: "Play-Doh",
        resultText: "Ruby"
      }, {
        text: "I've an old & ugly toy, but I love it so much!",
        resultText: "PHP"
      }]
    }, {
      id: 11,
      text: "Which platform/field?",
      answers: [{
        text: "3D/Gaming",
        resultText: "C++"
      }, {
        text: "Mobile",
        nextQuestion: 8
      }, {
        text: "Enterprise",
        nextQuestion: 7
      }, {
        text: "Web",
        nextQuestion: 12
      }]
    }, {
      id: 12,
      text: "Does your web app provides info in real-time, like twitter?",
      answers: [{
        text: "YES",
        resultText: "JavaScript"
      }, {
        text: "NO",
        nextQuestion: 9
      }]
    }, {
      id: 13,
      text: "Have a brilliant idea/platform in mind?",
      answers: [{
        text: "Nope. Just want to get started",
        nextQuestion: 14
      }, {
        text: "YES",
        nextQuestion: 11
      }]
    }, {
      id: 14,
      text: "I prefer to learn things...",
      answers: [{
        text: "The easy way",
        resultText: "Python"
      }, {
        text: "The best way",
        resultText: "Python"
      }, {
        text: "The slightly harder way",
        nextQuestion: 15
      }, {
        text: "The really hard way (but easier to pick up other languages in the future)",
        resultText: "C++"
      }]
    }, {
      id: 15,
      text: "Auto or manual car?",
      answers: [{
        text: "Auto",
        resultText: "Java"
      }, {
        text: "Manual",
        resultText: "C"
      }]
    }
  ];

  return parseJSONTestsObject(questionsList);
}

document.addEventListener('DOMContentLoaded', function() {
  var questions = programmingLanguagesTestMock();

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
