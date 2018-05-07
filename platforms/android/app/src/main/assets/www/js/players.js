function Player(x, y, color, width, height) {
    
    this.x = x;
    this.y = y;
    this.speed = 5;
    this.color = color;
    this.width = width;
    this.height = height;
    this.state = 'stop';
    this.dead = false;
    
    this.move = function (key,touch) {
        if (key === 38) {
            this.state = 'up';
            if (this.y <= 0) {
                this.y = 0;
            } else {
                this.y -= this.speed;
            }
        } else if (key === 40) {
            this.state = 'down';
            this.y += this.speed;
        } else if (key === 37) {
            this.state = 'left';
            this.x -= this.speed;
        } else if (key === 39) {
            this.state = 'right';
            this.x += this.speed;
        }
        
        if(touch && !(touch.pageY === this.y && touch.pageX === this.x)){
            if(touch.pageX < this.x){
                this.x -= this.speed;
                if( this.x < touch.pageX){
                    this.x = touch.pageX;
                }
            }else if(touch.pageX > this.x){
                this.x += this.speed;
                if( this.x > touch.pageX){
                    this.x = touch.pageX;
                }
            }
            
            if(touch.pageY < this.y){
                this.y -= this.speed;
                if( this.y < touch.pageY){
                    this.y = touch.pageY;
                }
            }else if(touch.pageY > this.y){
                this.y += this.speed;
                if( this.y > touch.pageY){
                    this.y = touch.pageY;
                }
            }
        }
    };
    
    this.follow = function (otherPlayer){
        if(!(otherPlayer.y === this.y && otherPlayer.x === this.x)){
            if(otherPlayer.x < this.x){
                this.x -= this.speed;
                if( this.x < otherPlayer.x){
                    this.x = otherPlayer.x;
                }
            }else if(otherPlayer.x > this.x){
                this.x += this.speed;
                if( this.x > otherPlayer.x){
                    this.x = otherPlayer.x;
                }
            }
            
            if(otherPlayer.y < this.y){
                this.y -= this.speed;
                if( this.y < otherPlayer.y){
                    this.y = otherPlayer.y;
                }
            }else if(otherPlayer.y > this.y){
                this.y += this.speed;
                if( this.y > otherPlayer.y){
                    this.y = otherPlayer.y;
                }
            }
        }
    };
}