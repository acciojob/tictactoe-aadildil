




const container=document.getElementsByClassName("container")[0];
const form = document.getElementsByTagName("form")[0];//game start forn
let player1, player2;//player names
let activePlayer,gameContainer;

let turn = null;

let gameHTML = `  <p class="message">&nbsp;</p>
<div class="game-container" data-game-enabled="false">
    <div id="1">&nbsp;</div>
    <div id="2">&nbsp;</div>
    <div id="3">&nbsp;</div>
    <div id="4">&nbsp;</div>
    <div id="5">&nbsp;</div>
    <div id="6">&nbsp;</div>
    <div id="7">&nbsp;</div>
    <div id="8">&nbsp;</div>
    <div id="9">&nbsp;</div>
</div>
`;

let resultString = `<div class="result">
<p id="para">&nsbc</p>
</div>`;
let won = false;
let arr = [
    ["", "", ""],
    ["", "", ""],
    ["", "", ""]
]



function addPlayer(e) {//for submit button

    e.preventDefault();
    turn = 1
    console.log("Form submitted!");


    player1 = form["name1"].value; console.log(player1);
    player2 = form["name2"].value;

    
    form.remove();
    let gameDiv=document.createElement("div");
    gameDiv.className="game-div"
   
    gameDiv.innerHTML=gameHTML;
    container.appendChild(gameDiv);
    


     gameContainer = document.getElementsByClassName("game-container")[0];//game container
    let blocks = document.querySelectorAll(".game-container > div");//each cell
     activePlayer = document.getElementsByClassName("message")[0];
    activePlayer.innerText = `${player1}, you're up`
    gameContainer.setAttribute("data-game-enabled", "true");




    function onClickItem(event) {//click on cell

        let isGameEnabled = gameContainer.getAttribute
            ("data-game-enabled");
        if (isGameEnabled === "false")
            return;
    
        if (turn == 1) {
            event.target.innerText = "X";
            turn = 1 - turn;
            activePlayer.innerText = `${player2}, you're up`
        }
        else {
            event.target.innerText = "O";
            turn = 1 - turn;
            activePlayer.innerText = `${player1}, you're up`
        }
        event.target.style.backgroundColor = "purple";
        fillArray(event.target.id);
    
        event.target.removeEventListener("click", onClickItem);
    }

    blocks.forEach((item) => {//adding listeners for cells
        item.addEventListener("click", onClickItem)
    })
    

}
function resultPrint() {
    const resultContainer = document.createElement("div");
    resultContainer.className = "result-container";
    resultContainer.innerHTML = resultString;
    document.body.appendChild(resultContainer);
    const para = document.getElementById("para");
    
    if (turn == 0)
       {
        activePlayer.innerText=`${player1}, congratulations you won!`;
        para.innerText = `congrats ${player1},\n you won`;
    }
    else
       { activePlayer.innerText=`${player2}, congratulations you won!` ;
        para.innerText = `congrats ${player2},\n you won`;
    }

}

function fillArray(id) {
    id--;
    let fill = turn === 0 ? "X" : "O";
    let row = Math.floor(id / 3);
    let col = id % 3;


    arr[row][col] = fill;

    let count = 0;

    for (let i = 0; i < 3; i++) {

        if (arr[i][col] === fill)
            count++;
        else
            break;
    }
    if (count == 3) { won = true; }

    count = 0;
    for (let i = 0; i < 3; i++) {

        if (arr[row][i] === fill)
            count++;
        else
            break;
    }
    if (count == 3) { won = true; }
    count = 0;

    if (row == col) {
        for (let i = 0; i < 3; i++) {
            if (arr[i][i] === fill)
                count++;
        }
        if (count == 3) { won = true; }
       
    }
    count = 0;
    let j = 2;
    for (let i = 0; i < 3; i++) {
        if (arr[i][j] === fill)
            count++;
        j--;
    }
    if (count == 3) { won = true; }


    if (won) {
        resultPrint();
        setTimeout(3000);
        gameContainer.remove();
        

    }

}





//form.addEventListener("submit", addPlayer);//adding listener for submit button