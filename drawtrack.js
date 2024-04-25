import {vec2d} from './vec2d.js';

const container = document.getElementById("container_track");

const width = container.clientWidth;
const height = container.clientHeight;

const canvas = d3.select("#container_track")
                .append("svg")
                .attr("id","canvas")
                .attr("width",width)
                .attr("height",height);

const track_outline = canvas.append('g');
const inner_track = track_outline.append('path')
    .attr('stroke', ' black')
    .attr('fill', 'none');

class track {
    constructor() {
      this.outer_curve = [];
      this.inner_curve = [];
      this.inner_curve_closed = 0;
    }

    add_inner(x, y){
        this.inner_curve.push([x, y]);
        console.log(this.inner_curve);
    }

    create_ziczac(){
      if (this.inner_curve.length === 0) {
          console.log('hahaha');
          return "";
      }
      let pathString = `M${this.inner_curve[0][0]},${this.inner_curve[0][1]}`;
      for (let i = 1; i < this.inner_curve.length; i++) {
          pathString += ` L${this.inner_curve[i][0]},${this.inner_curve[i][1]}`;
      }
      if (this.inner_curve_closed === 1) {
          pathString += ' Z';
      }
      inner_track.attr('d', pathString);
      console.log(pathString);
  }
}

const monza = new track();

canvas.on("click",()=>{
  if (monza.inner_curve_closed == 0){
    let mousepos = d3.mouse(container);
    let x = mousepos[0]
    let y = mousepos[1]
    if (monza.inner_curve.length > 0) {
      if (Math.abs(x - monza.inner_curve[0][0]) < 10 && 
        Math.abs(y - monza.inner_curve[0][1]) < 10 &&
        monza.inner_curve.length > 2) {
        monza.inner_curve_closed = 1;
        monza.create_ziczac();
        return;
      }
    }

    monza.add_inner(x, y);
    monza.create_ziczac();
    track_outline.append('circle')
        .attr('class', 'area')
        .attr('r', 10)
        .attr('cx', x)
        .attr('cy', y);
  }
})