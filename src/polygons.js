const ctx = canvas.getContext("2d");

// function creates a 3D point (vertex)
function vertex(x, y, z) { return { x, y, z}};
// an array of vertices
const vertices = []; // an array of vertices

// create the 8 vertices that make up a box
const boxSizeX = 10 * 4;   // size of the box x axis
const boxSizeY = 50 * 4;   // size of the box y axis
const boxSizeZ = 8 * 4;   // size of the box z axis
const hx = boxSizeX / 2; // half size shorthand for easier typing
const hy = boxSizeY / 2;
const hz = boxSizeZ / 2;

vertices.push(vertex(-hx,-hy,-hz)); // lower top left  index 0
vertices.push(vertex( hx,-hy,-hz)); // lower top right
vertices.push(vertex( hx, hy,-hz)); // lower bottom right
vertices.push(vertex(-hx, hy,-hz)); // lower bottom left
vertices.push(vertex(-hx,-hy, hz)); // upper top left  index 4
vertices.push(vertex( hx,-hy, hz)); // upper top right
vertices.push(vertex( hx, hy, hz)); // upper bottom right
vertices.push(vertex(-hx, hy, hz)); // upper  bottom left index 7

const colours = {
  dark: "#444",
  shade: "#666",
  light: "#aaa",
  bright: "#eee",
}

function createPoly(indexes, colour) {
  return {
    indexes,
    colour
  }
}
const polygons = [];
// always make the polygon vertices indexes in a clockwise direction
// when looking at the polygon from the outside of the object
polygons.push(createPoly([3, 2, 1, 0], colours.dark)); // bottom face
polygons.push(createPoly([0, 1, 5, 4], colours.dark)); // back face
polygons.push(createPoly([3, 0, 4, 7], colours.dark)); // left face
polygons.push(createPoly([1, 2, 6, 5], colours.shade)); // right face
polygons.push(createPoly([2, 3, 7, 6], colours.light)); // front face
polygons.push(createPoly([4, 5, 6, 7], colours.bright)); // top face

// From here in I use P2,P3 to create 2D and 3D points
const P3 = (x = 0, y = 0, z = 0) => ({x,y,z});
const P2 = (x = 0, y = 0) => ({ x, y});

// an object to handle the projection
const isoProjMat = {
  xAxis: P2(1, 0.5), // 3D x axis for every 1 pixel in x go down half a pixel in y
  yAxis: P2(-1, 0.5), // 3D y axis for every -1 pixel in x go down half a pixel in y
  zAxis: P2(0, -1), // 3D z axis go up 1 pixels
  origin: P2(150, 75), // where on the screen 3D coordinate (0,0,0) will be
  project(p, retP = P2()) {
    retP.x = p.x * this.xAxis.x + p.y * this.yAxis.x + p.z * this.zAxis.x + this.origin.x;
    retP.y = p.x * this.xAxis.y + p.y * this.yAxis.y + p.z * this.zAxis.y + this.origin.y;
    return retP;
  }
}

// create a new array of 2D projected verts
const projVerts = vertices.map(vert => isoProjMat.project(vert));
// and render
polygons.forEach(poly => {
  ctx.fillStyle = poly.colour;
  ctx.beginPath();
  poly.indexes.forEach(index => ctx.lineTo(projVerts[index].x, projVerts[index].y));
  ctx.fill();
});

function inside(point, vs) {
    // ray-casting algorithm based on
    // https://wrf.ecse.rpi.edu/Research/Short_Notes/pnpoly.html/pnpoly.html

    var x = point[0], y = point[1];

    var inside = false;
    for (var i = 0, j = vs.length - 1; i < vs.length; j = i++) {
        var xi = vs[i][0], yi = vs[i][1];
        var xj = vs[j][0], yj = vs[j][1];

        var intersect = ((yi > y) != (yj > y))
            && (x < (xj - xi) * (y - yi) / (yj - yi) + xi);
        if (intersect) inside = !inside;
    }

    return inside;
};

var polygon = [ [ 1, 1 ], [ 1, 2 ], [ 2, 2 ], [ 2, 1 ] ];
inside([ 1.5, 1.5 ], polygon); // true

