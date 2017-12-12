(function(){

    //Initial vars
    var board = $('#board');
    var player1 = $('#player1');
    var player2 = $('#player2');
    var activePlayer;
    var turn = 0;
    var switchPlayer = function (player) {
            activePlayer.removeClass('active');
            activePlayer = player;
            activePlayer.addClass('active');
                console.log(board);

        };


    board.addClass('hide');

    //Start game button
    $('#start .button').click(function () {

        $('#start').hide();

        //Start board
        board.removeClass('hide');
        activePlayer = player2;
        activePlayer.addClass('active');


    });

    $('.box').click(function () {
        if(!$(this).hasClass('box-filled-1')&&!$(this).hasClass('box-filled-2')){
            if(activePlayer.attr('id')==='player2'){
                console.log('p2');

                $(this).addClass('box-filled-2');
                switchPlayer(player1);


            }else {
                console.log('p1');
                $(this).addClass('box-filled-1');
                switchPlayer(player2);

            }

        }
    });


})();