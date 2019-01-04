const RAND_MULTIPLIER = 1000;


function construct_rand_graph(num_V, num_E) {
	/* 
	 * Exhaustively different number of edges --> 
	 * Divide number of vertices into 100%. 100 / |V|. v1 will get 100 / |V| * 1
	 * percent of total number of edges, v2_edges = (100 / |V|) * 2, all the way
	 * 
	 * let v_i = the current vertex we are considering number of edges for
	 * let v_e = the number of edges v_i has
	 * let e_l = the number of edges that are left
	 * 
	 * v_e = (100 / |V|) * i * e_l
	 */
	 let V = construct_vertices(num_V); 
	 let E = construct_rand_edges(V, num_E);
	 return { V, E };
}

function construct_complete_graph(num_V) {
	/* 
	 * A complete graph is a graph where a vertex has an edge to all other 
	 * vertices for all vertices. This graph will be undirected.
	 * 
	 * num_E = (num_V - 1)^2 / 2
	 */
	let V = construct_vertices(num_V);
	let E = construct_complete_edges(V);
	return { V, E };
}

function construct_vertices(num_V) {
	let V = []; 

	let i; 
	for (i = 0; i < num_V; i++) {
		V.push({'id': i, 'color': 'blue'});
	}

	return V;
}

function construct_rand_edges(V, num_E) {
	let E = []; 
	let num_left = num_E + 1;

	let i; 
	for (i = 0; i < V.length && num_left > 0; i++) {
		v_e = Math.floor((1 / (V.length + 1)) * i * num_left);
		num_left = num_left - v_e;

		let E_i = [...Array(v_e)].map((e, index) => 
			pick_vertex(V, i)
		);
		E_i.map(e_i => E.push(e_i));
	}

	return E;
}

function construct_complete_edges(V) {
	let E = []; 

	let i; 
	for (i = 0; i < V.length; i++) {
		[...Array(V.length)].map((_, index) => {
			if (index !== i) {
				let obj = {
					source: V[i].id, 
					target: V[index].id, 
					distance: calculate_geometric_dist(i, index)
				}; 
				E.push(obj);
			}
		});
	}

	return E;
}

function pick_vertex(V, i) {
	return {
		source: rand_one(V).id,
		target: rand_one(V).id,
		distance: Math.floor(Math.random() * RAND_MULTIPLIER)
	};
}

function rand_one(arr) {
	return arr[Math.floor(Math.random() * (arr.length))]; 
}

function calculate_geometric_dist(ind1, ind2) {
	return Math.floor(Math.random() * RAND_MULTIPLIER);
}


module.exports = {
	construct_rand_graph, 
	construct_complete_graph
};