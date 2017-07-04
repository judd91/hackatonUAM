CLOCKWORKRT.collisions.register([
    {
        shape1: "player",
        shape2: "coin",
        detector: function (player1, coin) {
            if (Math.pow((player1.x - coin.x), 2) + Math.pow((player1.y - coin.y), 2) < Math.pow((player1.r + coin.r), 2)) {
                return true;
            }else{
                return false;
            }
        }
    }
]);