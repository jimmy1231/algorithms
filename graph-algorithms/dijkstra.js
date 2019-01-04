const PriorityQueue = require('../data-structures/priority_queue');
const INFINITY = Number.MAX_SAFE_INTEGER;


function dijkstra(V, E, s_vertex, e_vertex) {
    s_vertex.distFromSrc = 0;
    q = fillQueue(V);
    closed = [];

    while(!isBaseCase(q, e_vertex)) {
        let currVertex = q.top;
        let neighbors = currVertex.getNeighbors();

        neighbors.forEach(neighbor => 
            relax(currVertex, neighbor)
        );

        currVertex.isVisited = true;
        closed.push(currVertex);
        q.pop();
    }

    return traceback(V, s_vertex, e_vertex);
}

function fillQueue(V) {
    let comparator = (v1, v2) => {
        if (v1.distFromSrc > v2.distFromSrc) return 1; 
        if (v1.distFromSrc < v2.distFromSrc) return -1; 
        return 0;
    };

    let q = new PriorityQueue(comparator);
    Object.keys(V).forEach(key => q.push(V[key]));
    return q;
}

function relax(currVertex, neighbor) {
    let newDistFromSrc = currVertex.distFromSrc + neighbor.edge.length; 
    
    if (newDistFromSrc < neighbor.vertex.distFromSrc) {
        neighbor.vertex.distFromSrc = newDistFromSrc; 
        neighbor.vertex.prevVertex = currVertex; 
        neighbor.vertex.prevEdge = neighbor.edge;
    }
}

function isBaseCase(q, e) {
    if (q.size === 0) {
        return true;
    }

    if (q.top.distFromSrc === INFINITY) {
        return true;
    }

    if (q.top.id === e.id) {
        return true;
    }

    return false;
}

function traceback(V, s, e) {
    let shortestPath = []; 

    if (!e.prevEdge) {
        console.log('Path does not exist');
        return shortestPath; 
    }

    let currVertex = e;
    while(currVertex.id !== s.id) {
        shortestPath.unshift(currVertex.prevEdge);
        currVertex = currVertex.prevVertex;
    }

    console.log('Shortest Path:', formatEdges(shortestPath));
    return shortestPath;
}

function formatEdges(edges) {
    return edges.map(edge => {
        return {
            id: edge.id,
            from: edge.from.id,
            to: edge.to.id,
            length: edge.length
        }; 
    }); 
}

function formatVertices(vertices) {
    return Object.keys(vertices).map(vId => {
        let v = vertices[vId]; 
        let edgeIds = v.edges.map(edge => edge.id);
        return {
            id: v.id, 
            edgeIds: edgeIds, 
            isVisited: v.isVisited, 
            distFromSrc: v.distFromSrc, 
            prevVertex: v.prevVertex ? v.prevVertex.id : null,
            prevEdge: v.prevEdge ? v.prevEdge.id : null
        }; 
    }); 
}

module.exports = dijkstra;