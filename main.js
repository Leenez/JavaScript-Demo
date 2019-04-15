// Get current year to footer
const date = new Date();
const footer = document.querySelector('footer');
footer.innerHTML = '<p>&copy firstname lastname ' + date.getFullYear() + '</p>';

// Logic for the box "String Operations"
window.onload = function() {
    var inputFields = document.getElementsByClassName('empty-on-reload');
    Array.from(inputFields).forEach(element => {
        element.value = '';
    });
}

const inputString = document.querySelector('#string');
const reverseString = document.querySelector('#reverse');
const palindromeString = document.querySelector('#palindromi');
const longestWordString = document.querySelector('#longest-word');
inputString.addEventListener('keyup', stringMagic);

function reverse(str) {
    let reversestr = '';
    for(i = 0; i < str.length; i++){
        reversestr = str[i] + reversestr;
    }
    return reversestr;
}

function longestWord(str) {
    const array = str.match(/[a-zA-Z0-9]+/g);
    const sorted = array.sort((a, b) => b.length - a.length);
    const words = sorted.filter((w) => w.length === sorted[0].length);

    if (words.length === 1){
        return words[0];
    } else {
        return words.join(' ');
    }
}

function stringMagic(e){
    reverseString.value = reverse(inputString.value);
    if (reverseString.value == inputString.value){
        palindromeString.value = true;
    } else {
        palindromeString.value = false;
    }
    longestWordString.value = longestWord(inputString.value);
}

// Logic for the box "When Win Lottery"
const lotteryStartButton = document.querySelector("#start-lottery-button");
lotteryStartButton.addEventListener('click', whenWinLottery);
const lotteryStopButton = document.querySelector("#stop-lottery-button");
lotteryStopButton.addEventListener('click', stopGame);
const lotterySpeedButton = document.querySelector("#speed-lottery-button");
lotterySpeedButton.addEventListener('click', speedLottery);

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}
  

function checkWinning(array1, array2){
    let hitcount = 0;
    array1.forEach(num => {
        if(array2.includes(num)){
            hitcount += 1;
        }
    });
    return hitcount;
}
let stopLottery = false;
let lotteryRunning = false;
let lotterySpeed = 2000;

function stopGame(){
    stopLottery = true;
    lotteryRunning = false;
    lotterySpeed = 2000;
}

function speedLottery() {
    if (lotterySpeed < 500) {
        lotterySpeed = 0;
    } else {
        lotterySpeed = lotterySpeed - 500;
    }
}

async function whenWinLottery(e){
    e.preventDefault();
    if (lotteryRunning === false){
    stopLottery = false;
    const gamerNumbers = document.getElementsByClassName('gamernumbers');
    const lotteryNumbers = [];
    const weekField = document.querySelector("#week-row");
    let resultField = document.querySelector("#correct");
    let week = 0;
    let bestwin = 0;
    Array.from(gamerNumbers).forEach(element => {
        lotteryNumbers.push(Number(element.value));
    });

    while(stopLottery === false){
        week += 1;
        
        let randomArray = [];
        while(randomArray.length < 7){
            let number = Math.floor(Math.random() * 40) + 1;
            if(!randomArray.includes(number)){
                randomArray.push(number);
            }
        }
        
        let correct = checkWinning(randomArray, lotteryNumbers);
        if (correct > bestwin){
            bestwin = correct;
        }
        weekField.innerHTML = "<h3>Week " + week + " numbers: " + randomArray + "</h3>";
        resultField.innerHTML = "<h3>You got " + correct + " correct.<br><br>Your best result is: " + bestwin + "</h3>";

        await sleep(lotterySpeed);
        
    }
    }
}

// Logic for the box "Form To Notepad"

// Create listener for entire form
const box3Form = document.querySelector("#form-to-notepad");
box3Form.addEventListener('click', formNotepadMethod);

function formNotepadMethod(e){
    e.preventDefault();

    if (e.target === e.currentTarget){
        e.stopPropagation();
        return;
    }

    // Empty field when focused
    const target = document.getElementById(e.target.id);
    if(!target.value.length == 0){
        target.value = '';
    }

    // Add field value to list
    if(target.id === 'add-list-button'){
        
        const currentValue = document.getElementById('inner-box3-input').value;
        let listing = document.getElementById('input-list');
        let li = document.createElement('li');
        li.className = 'box3-list-item';
        li.appendChild(document.createTextNode(currentValue));
        listing.appendChild(li);

        // let deleteButton = document.createElement('button');
        // deleteButton.className = 'button';
        // deleteButton.appendChild(document.createTextNode('Delete'));
        // li.appendChild(deleteButton);
        // listing.appendChild(li);
    }

    // Write all added lines to text file
    if(target.id === 'write-to-notepad'){
        let allLines = Array.from(document.getElementsByClassName('box3-list-item'))
        let message = '';
        allLines.forEach(function(element) {
            message += element.textContent + " \n";
        });
        fileWriter(message);
    }
    e.stopPropagation();
}

function fileWriter(data){
    const blob = new Blob([data], {type: 'text/plain;charset=utf-8'});
    saveAs(blob, "form_demo.txt");
}




