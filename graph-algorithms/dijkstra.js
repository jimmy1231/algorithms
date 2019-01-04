const PriorityQueue = require('../data-structures/priority_queue');
const INFINITY = Number.MAX_SAFE_INTEGER;


function dijkstra(V, E, v_src, v_dest) {
    v_src.d_src = 0;
    q = fillQueue(V);
    closed = [];

    while(!isBaseCase(q, v_dest)) {
        let v_curr = q.top;
        let neighbors = v_curr.neighbors();

        neighbors.forEach(neighbor => 
            relax(v_curr, neighbor)
        );

        v_curr.visited = true;
        closed.push(v_curr);
        q.pop();
    }

    return traceback(V, v_src, v_dest);
}

function fillQueue(V) {
    let comparator = (v1, v2) => {
        if (v1.d_src > v2.d_src) return 1; 
        if (v1.d_src < v2.d_src) return -1; 
        return 0;
    };

    let q = new PriorityQueue(comparator);
    Object.keys(V).forEach(key => q.push(V[key]));
    return q;
}

function relax(v_curr, neighbor) {
    let v_n = neighbor.v;
    let e_n = neighbor.e;

    let new_d_src = v_curr.d_src + e_n.length; 
    
    if (new_d_src < v_n.d_src) {
        v_n.d_src = new_d_src; 
        v_n.v_prev = v_curr; 
        v_n.e_prev = e_n;
    }
}

function isBaseCase(q, e) {
    if (q.size === 0) {
        return true;
    }

    if (q.top.d_src === INFINITY) {
        return true;
    }

    if (q.top.id === e.id) {
        return true;
    }

    return false;
}

function traceback(V, s, e) {
    let shortestPath = []; 

    if (!e.e_prev) {
        console.log('Path does not exist');
        return shortestPath; 
    }

    let v_curr = e;
    while(v_curr.id !== s.id) {
        shortestPath.unshift(v_curr.e_prev);
        v_curr = v_curr.v_prev;
    }

    return shortestPath;
}


module.exports = dijkstra;