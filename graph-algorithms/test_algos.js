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

    console.log('====================================='); 
    console.log(`From: ${start_v.id} to: ${end_v.id}`);
    console.log('====================================='); 

    let shortest = dijkstra(V_struct, E_struct, start_v, end_v);
    console.log('Shortest Path:', formatEdges(shortest));
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
        return this.edges.map(e => {
            let v = e.to.id === this.id ? e.from : e.to;
            return {v, e};
        });
    }

    V = V.map(v => ({
        id: v.id,
        edges: [],
        visited: false,
        d_src: INFINITY,
        v_prev: null,
        e_prev: null,
        neighbors: getNeighbors
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
            visited: v.isVisited, 
            d_src: v.distFromSrc, 
            v_prev: v.v_prev ? v.v_prev.id : null,
            e_prev: v.e_prev ? v.e_prev.id : null
        }; 
    }); 
}

test_algos()
