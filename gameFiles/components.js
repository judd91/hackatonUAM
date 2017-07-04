CLOCKWORKRT.components.register([
    {
        name: "character",
        events: [
            {
                name: "#setup", code: function (event) {
                    this.var.block = false;
                    this.var.$state = "Volando";
                    this.var.vx = this.var.vy = 0;
                }
            },
            {
                name: "#loop", code: function (event) {
                    if (this.var.$y > 664 - 31) {
                        this.do.suelo();
                    }
                    if (!(this.var.$y <= 38 && this.var.vy < 0)) {
                        this.var.$y += this.var.vy;
                    }
                    if (!(this.var.$x <= 40 && this.var.vx < 0) && !(this.var.$x >= 1366 - 40 && this.var.vx > 0)) {
                        this.var.$x += this.var.vx;
                    }
                }
            }],
        collision: {
            "player": [
                { "x": 0, "y": 0, "r": 38, "#tag": "playerCollision" }
            ]
        }
    }, {
        name: "move_kirby",
        sprite: "kirby",
        inherits: "character",
        events: [
            {
                name: "keyboardDown", code: function (event) {
                    this.engine.debug.log(event.key);
                    if (this.var.block == false) {
                        switch (event.key) {
                            case 37: // IZQUIERDA
                                this.var.vx = -8;
                                break;
                            case 38: // ARRIBA
                                if (this.var.$state == "Apoyado") {
                                    this.do.yvoloo();
                                }
                                if (this.var.$state == "Volando") {
                                    this.var.vy = -8;
                                }
                                break;
                            case 39: // DERECHA
                                this.var.vx = 8;
                                break;
                            case 40: // ABAJO
                                this.var.vy = 8;
                                break;
                            case 32: // ABAJO
                                this.do.aplastar();
                                break;
                        }
                    }
                }
            }, {
                name: "keyboardUp", code: function (event) {
                    if (this.var.block == false) {
                        switch (event.key) {
                            case 37: // IZQUIERDA
                                this.var.vx = 0;
                                break;
                            case 38: // ARRIBA
                                this.var.vy = 0;
                                break;
                            case 39: // DERECHA
                                this.var.vx = 0;
                                break;
                            case 40: // ABAJO
                                this.var.vy = 0;
                                break;
                        }
                    }
                }
            }, {
                name: "gamepadAxis", code: function (event) {
                    //This event is triggered each frame, sends the state of the thumbsticks
                    if (event.player == 0) { //The id of the gamepad
                        event.values[0];
                        if (this.var.block == true) { return; }
                        if (event.values[0].x < -0.1) {
                            this.var.vx = -8;
                        }
                        else if (event.values[0].x > 0.1) {
                            this.var.vx = 8;
                        }
                        else {
                            this.var.vx = 0;
                        }

                        if (event.values[0].y < -0.1) {
                            if (this.var.$state == "Apoyado") {
                                this.do.yvoloo();
                            }
                            if (this.var.$state == "Volando") {
                                this.var.vy = -8;
                            }
                        }
                        else if (event.values[0].y > 0.1) {
                            this.var.vy = 8;
                        }
                        else {
                            this.var.vy = 0;
                        }

                    }
                }
            }, {
                name: "gamepadDown", code: function (event) {
                    //This event is triggered when a button is pressed
                    if (event.player == 0) { //The id of the gamepad
                        event.name; //The name of the button
                        // this.engine.debug.log(event.name)
                        if (event.name == "A") {
                            if (this.var.block == false) {
                                this.do.aplastar();
                            }
                        }
                    }
                }
            }, {
                name: "aplastar", code: function (event) {
                    if (this.var.$state != "Apoyado") {
                        this.var.block = true;
                        this.var.$state = "Aplasta";
                        this.var.vy = 20;
                    }
                }
            }, {
                name: "suelo", code: function (event) {
                    this.var.block = false;
                    this.var.$state = "Apoyado";
                    this.var.vy = 0;
                }
            }, {
                name: "yvoloo", code: function (event) {
                    this.var.block = false;
                    this.var.$state = "Volando";
                    this.var.vy = -8;
                    this.var.$y -= 20;
                }
            }, {
                name: "#collide", code: function (event) {
                    //this.engine.debug.log(event.shape2tag)
                    if (event.shape2tag == "dolarCollision") {
                        this.engine.destroy(event.object);
                        this.engine.do.aumentaLongBarra1();
                    } else {
                        if (this.var.$state == "Aplasta") {
                            this.engine.do.disminuyeLongBarra2();
                        }
                    }
                }
            }
        ]
    }, {
        name: "move_ybrik",
        sprite: "ybrik",
        inherits: "character",
        events: [
            {
                name: "keyboardDown", code: function (event) {
                    //this.engine.debug.log(event.key);
                    if (this.var.block == false) {
                        switch (event.key) {
                            case 65: // IZQUIERDA (A)
                                this.var.vx = -8;
                                break;
                            case 87: // ARRIBA (W)
                                if (this.var.$state == "Apoyado") {
                                    this.do.yvoloo();
                                }
                                if (this.var.$state == "Volando") {
                                    this.var.vy = -8;
                                }
                                break;
                            case 68: // DERECHA (D)
                                this.var.vx = 8;
                                break;
                            case 83: // ABAJO (S)
                                this.var.vy = 8;
                                break;
                            case 9: // APLASTA (tabulador)
                                this.do.aplastar();
                                break;
                        }
                    }
                }
            }, {
                name: "keyboardUp", code: function (event) {
                    if (this.var.block == false) {
                        switch (event.key) {
                            case 65:
                                this.var.vx = 0;
                                break;
                            case 87:
                                this.var.vy = 0;
                                break;
                            case 68:
                                this.var.vx = 0;
                                break;
                            case 83:
                                this.var.vy = 0;
                                break;
                        }
                    }
                }
            }, {
                name: "gamepadAxis", code: function (event) {
                    //This event is triggered each frame, sends the state of the thumbsticks
                    if (event.player == 1) { //The id of the gamepad
                        event.values[0];
                        if (this.var.block == true) { return; }
                        if (event.values[0].x < -0.1) {
                            this.var.vx = -8;
                        }
                        else if (event.values[0].x > 0.1) {
                            this.var.vx = 8;
                        }
                        else {
                            this.var.vx = 0;
                        }

                        if (event.values[0].y < -0.1) {
                            if (this.var.$state == "Apoyado") {
                                this.do.yvoloo();
                            }
                            if (this.var.$state == "Volando") {
                                this.var.vy = -8;
                            }
                        }
                        else if (event.values[0].y > 0.1) {
                            this.var.vy = 8;
                        }
                        else {
                            this.var.vy = 0;
                        }

                    }
                }
            }, {
                name: "gamepadDown", code: function (event) {
                    //This event is triggered when a button is pressed
                    if (event.player == 1) { //The id of the gamepad
                        event.name; //The name of the button
                        this.engine.debug.log(event.name)
                        if (event.name == "A") {
                            if (this.var.block == false) {
                                this.do.aplastar();
                            }
                        }
                    }
                }
            }, {
                name: "aplastar", code: function (event) {
                    if (this.var.$state != "Apoyado") {
                        this.var.block = true;
                        this.var.$state = "Aplasta";
                        this.var.vy = 20;
                    }
                }
            }, {
                name: "suelo", code: function (event) {
                    this.var.block = false;
                    this.var.$state = "Apoyado";
                    this.var.vy = 0;
                }
            }, {
                name: "yvoloo", code: function (event) {
                    this.var.block = false;
                    this.var.$state = "Volando";
                    this.var.vy = -8;
                    this.var.$y -= 20;
                }
            }, {
                name: "#collide", code: function (event) {
                    //this.engine.debug.log(event.shape2tag)
                    if (event.shape2tag == "dolarCollision") {
                        this.engine.destroy(event.object);
                        this.engine.do.aumentaLongBarra2();
                    } else {
                        if (this.var.$state == "Aplasta") {
                            this.engine.do.disminuyeLongBarra1();
                        }
                    }
                }
            }]
    }, {
        name: "background",
        sprite: "background",
        events: [
            {
                name: "#setup", code: function (event) {

                }
            },
            {
                name: "#loop", code: function (event) {

                }
            }]
    }, {
        name: "background2",
        sprite: "background2",
        events: [
            {
                name: "#setup", code: function (event) {

                }
            },
            {
                name: "#loop", code: function (event) {

                }
            }]
    }, {
        name: "background3",
        sprite: "background3",
        events: [
            {
                name: "#setup", code: function (event) {

                }
            },
            {
                name: "#loop", code: function (event) {

                }
            }]
    }, {
        name: "barra2",
        sprite: "barrita",
        events: [
            {
                name: "#setup", code: function (event) {
                    this.var.$dibujar = function (context, x, y, longitud) {

                        context.beginPath();
                        context.rect(x + 400 - longitud, y, longitud, 50);
                        context.fillStyle = "red";
                        context.fill();
                        context.beginPath();
                        context.rect(x, y, 400, 50);
                        context.lineWidth = 2;
                        context.strokeStyle = 'black';
                        context.stroke();
                    }


                    this.engine.debug.log("Barrita");

                    this.var.$long = 400;
                    this.var.timer = 0;
                    //this.setCollider("circulitos", { "x":0  , "y": 0 , "r": this.var.$w/2 });

                }
            }, {
                name: "aumentaLongBarra1", code: function () {
                    if (this.var.$long <= 400) {
                        this.var.$long = 400;
                    }
                }

            },
            {
                name: "disminuyeLongBarra1", code: function () {
                    if (this.var.$long > 0) {
                        this.var.$long -= 5;
                    } else {
                        //Perder
                        this.engine.loadLevel("endLevel2");
                    }
                }

            }
        ]
    }, {
        name: "barra1",
        sprite: "barrita",
        events: [
            {
                name: "#setup", code: function (event) {
                    this.var.$dibujar = function (context, x, y, longitud) {
                        context.beginPath();
                        context.rect(x, y, longitud, 50);
                        context.fillStyle = "red";
                        context.fill();
                        context.beginPath();
                        context.rect(x, y, 400, 50);
                        context.lineWidth = 2;
                        context.strokeStyle = 'black';
                        context.stroke();
                    }
                    this.engine.debug.log("Barrita");
                    this.var.$long = 400;
                    this.var.timer = 0;
                    //this.setCollider("circulitos", { "x":0  , "y": 0 , "r": this.var.$w/2 });
                }
            }, {
                name: "aumentaLongBarra2", code: function () {
                    if (this.var.$long < 400) {
                        this.var.$long = 400;
                    }
                }
            },
            {
                name: "disminuyeLongBarra2", code: function () {
                    if (this.var.$long > 0) {
                        this.var.$long -= 5;
                    } else {
                        //Perder
                        this.engine.loadLevel("endLevel1");
                    }
                }
            }
        ]
    }, {
        name: "dolar",
        sprite: "dolar",
        events: [
            {
                name: "#setup", code: function (event) {
                    // this.var.$state = "Random";
                }
            },
            {
                name: "#loop", code: function (event) {

                }
            }],
        collision: {
            "coin": [
                { "x": 0, "y": 0, "r": 38, "#tag": "dolarCollision" }
            ]
        }
    }, {
        name: "factoryCoins",
        events: [
            {
                name: "#setup", code: function (event) {
                    this.var.timer = 0;
                }
            },
            {
                name: "#loop", code: function (event) {
                    this.var.timer = this.var.timer + 1;
                    if (this.var.timer == 1800) {
                        this.var.timer = 0;
                        this.engine.spawn("moneda", "dolar", { $x: Math.random() * 1000 + 150, $y: Math.random() * 500 + 50 })
                    }
                }
            }],
    }, {
        name: "player1",
        sprite: "player1",
        events: [
            {
                name: "#setup", code: function (event) {
                    this.var.$player1 = "Player 1";
                }
            }
        ]
    }, {
        name: "player2",
        sprite: "player2",
        events: [
            {
                name: "#setup", code: function (event) {
                    this.var.$player2 = "Player 2";
                }
            }
        ]
    }

]);