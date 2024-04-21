import { vec2d } from './vec2d.js';

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


let x_pos = new vec2d(0,0);


car.attr("transform","translate(500,300) rotate(45)");


const chassis = car.append('image')
    .attr('xlink:href', 'img/turtle.svg')
    .attr('width', 50)
    .attr('height', 50)
    .attr('x',-25)
    .attr('y',-25);

const point = car.append('circle')
    .attr('r',5)
    .attr('fill','red');

canvas.on("click",()=>{
    let pos = d3.mouse(container);
    const trans = d3.transition()
    trans.duration(750);
    car.transition(trans).attr("transform","translate("+pos[0]+","+pos[1]+")");
})