CLOCKWORKRT.collisions.register([
    {
        shape1: "player",
        shape2: "player",
        detector: function (player1, player2) {
            if (Math.pow((player1.x - player2.x), 2) + Math.pow((player1.y - player2.y), 2) < Math.pow((player1.r + player2.r), 2)) {
                return true;
            }else{
                return false;
            }
        }
    }
]);