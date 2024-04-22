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

    add_self(other) {
        this.x += other.x;
        this.y += other.y;
    }
    
    sub_self(other) {
        this.x -= other.x;
        this.y -= other.y;
    }
    
    mul_self(scalar) {
        this.x *= scalar;
        this.y *= scalar;
    }
    
    norm() {
        return Math.sqrt(this.x*this.x + this.y*this.y);
    }
    
    normalize() {
        let L = this.norm();
        console.log(L);
        if(L>0.0) this.mul_self(1.0/L);
    }

    add(other) {
        let x = new vec2d(this);
        x.add_self(other);
        return x;
    }
    
    sub(other) {
        let x = new vec2d(this);
        x.sub_self(other);
        return x;
    }
    
    mul(other) {
        let x = new vec2d(this);
        x.mul_self(other);
        return x;
    }
};
