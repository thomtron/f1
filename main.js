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


car.attr("transform","translate(500,300) rotate(45)");


const chassis = car.append('image')
    .attr('xlink:href', 'img/turtle.svg')
    .attr('width', 50)
    .attr('height', 50)
    .attr('x',-25)
    .attr('y',-25)
    .attr('transform','rotate(90)');

const area = car.append('circle')
    .attr('class','area')
    .attr('cx',100)
    .attr('r',50);

area.on("click",()=>{
    let mousepos = d3.mouse(container);
    mousepos = new vec2d(mousepos[0],mousepos[1]);

    //const trans = d3.transition()
    //trans.duration(750);
    //car.transition(trans).attr("transform","translate("+pos[0]+","+pos[1]+")");

    vel = mousepos.sub(pos);
    dir = new vec2d(vel);
    dir.normalize();
    pos = mousepos;
    update_car(car,pos,dir);
    update_area(area,vel);
})

function update_car(fahrzeug,pos,dir) {
    const trans = d3.transition()
    trans.duration(750);
    fahrzeug.transition(trans).attr("transform",`matrix(${dir.x},${dir.y},${-dir.y},${dir.x},${pos.x},${pos.y})`);
    console.log(`matrix(${dir.x},${dir.y},${-dir.y},${dir.x},${pos.x},${pos.y})`);
}

function update_area(area,vel) {
    area.attr("cx",vel.norm());
}