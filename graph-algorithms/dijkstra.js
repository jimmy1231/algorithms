const INFINITY = Number.MAX_SAFE_INTEGER;

const vertex = {
    id: vId,
    edges: [edge, edge],
    isVisited: false, 
    distFromSrc: INFINITY, 
    prevVertex: vertex, 
    prevEdge: edge,
    getNeighbors: function() {
        return this.edges.map(edge => {
            let edge.to.id === this.id ? edge.from : edge.to;
            return {vertex, edge};
        });
    }
};

const edge = {
    id: eId, 
    length: 0, 
    from: vertex, 
    to: vertex, 
    isBidirectional: false 
};


function dijkstra(V, E, s_vertex, e_vertex) {
    q = fillQueue(V);
    closed = [];

    while(!isBaseCase(q, e)) {
        let currVertex = q.top;
        let neighbors = currVertex.getNeighbors();

        neighbors.forEach(neighbor => 
            relax(currVertex, neighbor)
        );

        currVertex.isVisited = true;
        closed.push(currVertex);
        q.pop();
    }

    return traceback(V, e);
}

function fillQueue(V) {
    let q = new PriorityQueue();
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
    if (q.isEmpty()) {
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

    let currVertex = e;
    while(currVertex.id !== s.id) {
        shortestPath.push(e.prevEdge);
        currVertex =currVertex.prevVertex;
    }

    return shortestPath;
}