export class vec2d 
{
    constructor(x,y) {
        if(y === undefined && typeof(x) === "object")
        {
            this.x = x.x;
            this.y = x.y;
        } else {
            this.x = x;
            this.y = y;
        }
    }

    add(other) {
        this.x += other.x;
        this.y += other.y;
    }
    
    subtract(other) {
        this.x -= other.x;
        this.y -= other.y;
    }
    
    multiply(scalar) {
        this.x *= scalar;
        this.y *= scalar;
    }
    
    norm() {
        return Math.sqrt(this.x*this.x + this.y*this.y);
    }
    
    normalize() {
        var L = norm();
        if(L>0.0) mult(1.0/L);
    }
    
    subtr(other) {
        var x = new vec2d(this);
        x.subtract(other);
        return x;
    }
    
    mult(other) {
        var x = new vec2d(this);
        x.multiply(other);
        return x;
    }
};
