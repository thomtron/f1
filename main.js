import {vec2d} from './vec2d.js';

const container = document.getElementById("container");

const width = container.clientWidth;
const height = container.clientHeight;

const canvas = d3.select("#container")
                .append("svg")
                .attr("id","canvas")
                .attr("width",width)
                .attr("height",height);

const car = canvas.append("g");
const track = canvas.append("g");

//const center = unitVectors();


let pos = new vec2d(500,300);
let vel = new vec2d(0,0);
let dir = new vec2d(1,0);

let tail = d3.path();
tail.moveTo(pos.x,pos.y);

let tailpath = canvas.append("path")
    .attr("d",tail)
    .attr("stroke","black")
    .attr("fill","none");

car.attr("transform","translate(500,300) rotate(45)");


const chassis = car.append('image')
    .attr('xlink:href', 'img/turtle.svg')
    .attr('width', 50)
    .attr('height', 50)
    .attr('x',-25)
    .attr('y',-25)
    .attr('transform','rotate(90)');

const area = car.append('rect')
    .attr('class','area')
    .attr('x',-50)
    .attr('y',-50)
    .attr('width',100)
    .attr('height',100);

area.on("click",()=>{
    let mousepos = d3.mouse(container);
    mousepos = new vec2d(mousepos[0],mousepos[1]);

    tail.lineTo(mousepos.x,mousepos.y);
    console.log(tail);
    //tail.lineTo(pos.x,pos.y);

    //const trans = d3.transition()
    //trans.duration(750);
    //car.transition(trans).attr("transform","translate("+pos[0]+","+pos[1]+")");

    vel = mousepos.sub(pos);
    if(vel.norm()>0.0) {
        dir = new vec2d(vel);
        dir.normalize();
    }
    pos = mousepos;
    area.attr('visibility','hidden');
    update_car(car,pos,dir,()=>{
        area.attr('visibility','visible');
        tailpath.attr('d',tail);
    });
    update_area(area,vel);
})

function update_car(fahrzeug,pos,dir,callback) {
    const trans = d3.transition();
    trans.duration(750);
    fahrzeug.transition(trans).attr("transform",`matrix(${dir.x},${dir.y},${-dir.y},${dir.x},${pos.x},${pos.y})`)
        .on("end",callback);
}

function update_area(area,vel) {
    area.attr("transform","translate("+vel.norm()+",0)");
}