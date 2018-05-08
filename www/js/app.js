var app = {

    fps: 60,
    key: 0,
    touch: null,
    audio: new Audio('audio/atefood.mp3'),
    hero: new Player(0, 0, 'white', 10, 10),
    enemys: [
        new Player(0, 0, 'red', 20, 20),
        new Player(0, 0, 'orange', 20, 20),
        new Player(0, 0, 'orangered', 20, 20),
        new Player(0, 0, 'darkred', 20, 20)
    ],

    init: function () {
        $(document).on("deviceready", this.start.bind(this));
        $(document).ready(this.start.bind(this));//for browsers
        this.audio.load();
    },

    start: function () {
        $(document).unbind('ready');
        if (!(typeof StatusBar === "undefined")) {//for mobile
            StatusBar.hide();
        }

        $('canvas').hide();
        $('div').on('click', this.openClose);
        $('div').height($(window).height());
        $('div').css('padding-top', '25%');

        this.canvas = $('canvas')[0];
        this.ctx = this.canvas.getContext('2d');
        this.canvas.width = $(document).width();
        this.canvas.height = $(document).height();

        for (var i = 0; i < this.enemys.length; i++) {
            this.enemys[i].x = -1000 * Math.random();
            this.enemys[i].y = -1000 * Math.random();
            this.enemys[i].speed = this.hero.speed * (0.5 * Math.random());
        }

        this.hero.x = this.canvas.width / 2;
        this.hero.y = this.canvas.height / 2;

        this.setControls();
    },

    mainLoop: function () {
        setTimeout(function () {

            app.hero.move(app.key, app.touch);
            for (var i = 0; i < app.enemys.length; i++) {
                app.enemys[i].follow(app.hero);
            }

            app.drawnBackGround();
            app.drawnPlayer(app.hero);
            for (var i = 0; i < app.enemys.length; i++) {
                app.drawnPlayer(app.enemys[i]);
            }

            for (var i = 0; i < app.enemys.length; i++) {
                if (app.enemys[i].x === app.hero.x && app.enemys[i].y === app.hero.y) {
                    app.hero.dead = true;
                    i=app.enemys.length;
                }
            }

            if (!app.hero.dead) {
                window.requestAnimationFrame(app.mainLoop);
            } else {
                app.audio.play();
                app.openClose();
            }
        }, 1000 / this.fps);
    },

    drawnBackGround: function () {
        this.ctx.fillStyle = "black";
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
    },

    drawnPlayer: function (player) {
        this.ctx.fillStyle = player.color;
        this.ctx.fillRect(player.x, player.y, player.width, player.height);
    },

    openClose: function () {
        if ($('canvas').css('display') === 'none') {
            $('div').unbind('click');
            app.audio.play();
            $('div').fadeOut('slow', function () {
                $('canvas').fadeIn('fast', app.mainLoop);
                $('div').text('Game Over!!!');
            });
        } else {
            $('canvas').fadeOut('slow');
            $('div').css('color', 'red');
            $('div').css('font-size', '50px');
            $('div').fadeIn('slow', setTimeout(function () {
                app.exit();
            }, 3000));
        }
    },

    setControls: function () {
        $(document).keydown(function (e) {
            app.key = e.which;
            app.touch = null;
        });

        $(document).keyup(function (e) {
            app.key = 0;
            app.touch = null;
        });

        $('canvas').on("touchstart", function (e) {
            e.preventDefault();
            app.touch = e.originalEvent.changedTouches[0];
        });

        $('canvas').on("click", function (e) {
            e.preventDefault();
            app.touch = e;
            app.touch.pageX = e.clientX;
            app.touch.pageY = e.clientY;
        });
    },

    exit: function () {
        if (navigator.app) {
            navigator.app.exitApp();
        } else {
            window.open(location, '_self').close();//doen't close, just refresh. 
        }
    }
};