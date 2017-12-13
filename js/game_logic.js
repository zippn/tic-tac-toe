!function(){

    //Initial vars
    var board = $('#board');
    var player1 = {id: 1, name: 'PLAYER1',selector: $('#player1'), moves: [], winner: false};
    var player2 = {id: 2, name: 'PLAYER2',selector: $('#player2'), moves: [], winner: false};
    var finishedGame = $('#finish');


    var activePlayer;
    var turnCompleted = 0;
    var gameOver = false;
    var boardArray = [0,1,2,3,4,5,6,7,8];//['top-left','top-mid','top-right', 'mid-left','mid-mid','mid-right','bottom-left','bottom-mid','bottom-right'];
    var winningMoves = [[0,1,2],[0,3,6],[0,4,8],[1,4,7],[2,5,8],[2,4,6],[3,4,5],[6,7,8]];
    var switchPlayer = function () {
            activePlayer.selector.removeClass('active');
                if(activePlayer.selector.attr('id')==='player2') {
                    activePlayer = player1;

                }else {
                    activePlayer = player2;

                }
            activePlayer.selector.addClass('active');
                console.log(board);

        };


    board.addClass('hide');
    finishedGame.hide();

    //Start game button
    $('#start .button').click(function () {

        $('#start').hide();

        //Start board
        board.removeClass('hide');
        activePlayer = player2;
        activePlayer.selector.addClass('active');


    });
    $('#finish a').click(function () {
        resetGame();
    });
    $('.box').click(function () {

        //index of box
        var index = $('.box').index(this);
        console.log(index);

        if(!$(this).hasClass('box-filled-1')&&!$(this).hasClass('box-filled-2')){
            if(activePlayer.selector.attr('id')==='player2'){
                console.log('p2');

                $(this).addClass('box-filled-2');
                activePlayer.moves.push(boardArray[index]);

            }else {
                console.log('p1');
                $(this).addClass('box-filled-1');
                activePlayer.moves.push(boardArray[index]);

            }
            turnCompleted++;
            if(turnCompleted>=5){
                checkForWinner();
            }
            if(turnCompleted===9){
                gameOver = true;
            }
            if(gameOver){
                board.hide();
                finishedGame.show();
                if(activePlayer.winner) {
                    $('.message').text('GAME OVER! WINNER ');
                    if(activePlayer.id===1){
                        $('.message').addClass('player1-winner');
                    }else {

                        $('.message').addClass('player2-winner');
                    }
                }else {
                    $('.message').text('TIE!');
                }
            }
            if(!gameOver){
                switchPlayer();

            }

            console.log(player1.moves);
            console.log(player2.moves);

        }
    });
    
    function checkForWinner() {
        var playerMove;
        var moveArray = [];
            activePlayer.moves.sort();
            checkPlayerMoves(activePlayer);

    }
    function checkPlayerMoves(player) {
        var playerMoves = player.moves;
        var matchCount = 0;
        var startIndex = 0;
        do{
            console.log('start '+startIndex);
            playerMoves.forEach(function (move) {
                console.log('move '+move);
                if (winningMoves[startIndex].indexOf(move) > -1) {
                    matchCount++;
                }
            });
            console.log('match '+matchCount);
            if(matchCount===3){break;}
            matchCount = 0;
            startIndex++;

        }while(startIndex<8)

        if(matchCount===3) {
            player.winner = true;
            gameOver = true;
        }


    }
    function resetGame() {
        turnCompleted = 0;
        player1.winner = false;
        player2.winner = false;
        player1.moves = [];
        player2.moves = [];
        gameOver = false;
        $('.message').removeClass('player2-winner player1-winner');

        $('.box').removeClass('box-filled-1 box-filled-2');
        board.show();
        finishedGame.hide();
        activePlayer = player2;
        activePlayer.selector.addClass('active');

    }

}();