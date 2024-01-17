//   When the game ends, it should display their score and give the user the ability to save their initials and their score
var initial = document.querySelector(`#initials`);
var submitBtn = document.querySelector(`#submit`);
var scoreRecord = document.querySelector(`#highscores`);
var backBtn = document.querySelector(`#back`);
var clearBtn= document.querySelector(`#clear`);

// Score save
function saveScore () {
    var scores ={
        user: initial.value,
        score: totalScore
    }
    addItem(scores);
    var highScores = sort();   
    var topFive = highScores.slice(0,5);
    for (var i = 0; i < topFive.length; i++) {
    var item = topFive[i];
    var liTag = document.createElement(`li`);
    liTag.textContent = item.user + ` - ` + item.score;
    scoreRecord.appendChild(liTag);
    }
}

function sort () {
    var unsortedList = getScore();
    if (getScore == null ){
        return;
    } else{
    unsortedList.sort(function(a,b){
        return b.score - a.score;
    })
    return unsortedList;
}};

function getScore () {
    var list =localStorage.getItem(`ScoreList`);
    if (list !== null ){
        newList = JSON.parse(list);
        return newList;
    } else {
        newList = [];
    }
    return newList;
};

function addItem (n) {
    var addedList = getScore();
    addedList.push(n);
    localStorage.setItem(`ScoreList`, JSON.stringify(addedList));
};

submitBtn.addEventListener(`click`, function(event) {
    event.preventDefault();
    endScreen.style.display = `block`;
    startScreen.style.display = `none`;
    questionPage.style.display =`none`;
    saveScore();
});
