const graph = require('../graph-d3/construct');
const dijkstra = require('./dijkstra');
const INFINITY = Number.MAX_SAFE_INTEGER;


function test_algos() {
    let {V_struct, E_struct} = construct_map_graph(
       graph.construct_complete_graph(1000)
    );

    let num_v = Object.keys(V_struct).length; 
    let start_v = V_struct[Math.floor(Math.random() * num_v)];
    let end_v = V_struct[Math.floor(Math.random() * num_v)];
    
    console.log('============================================='); 
    console.log(`From Vertex: ${start_v.id} to Vertex: ${end_v.id}`);
    console.log('============================================='); 

    dijkstra(V_struct, E_struct, start_v, end_v);
}

function construct_map_graph({V, E}) {
    V_struct = construct_vertices(V);
    E_struct = construct_edges(E);

    Object.keys(E_struct).forEach(eId => {
        let e = E_struct[eId]; 
        e.from.edges.push(e);
    }); 

    return {V_struct, E_struct};
}

function construct_vertices(V) {
    let V_struct = {};

    let getNeighbors = function() {
        return this.edges.map(edge => {
            let vertex = edge.to.id === this.id ? edge.from : edge.to;
            return {vertex, edge};
        });
    }

    V = V.map(v => ({
        id: v.id,
        edges: [],
        isVisited: false,
        distFromSrc: INFINITY,
        prevVertex: null,
        prevEdge: null,
        getNeighbors
    }));

    V.forEach(v => V_struct[v.id] = v);
    return V_struct;
}

function construct_edges(E) {
    let E_struct = {}; 

    E = E.map((e, index) => ({
        id: index, 
        length: e.distance,
        from: V_struct[e.source],
        to: V_struct[e.target]
    }));

    E.forEach((e, index) => E_struct[index] = e);
    return E_struct;
}

test_algos()
