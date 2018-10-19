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
	 let E = construct_edges(V, num_E);
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

function construct_edges(V, num_E) {
	let E = []; 
	let num_left = num_E + 1;

	let i; 
	for (i = 0; i < V.length && num_left > 0; i++) {
		v_e = Math.floor((1 / (V.length + 1)) * i * num_left);
		num_left = num_left - v_e;

		let E_i = [...Array(v_e)].map(e => pick_vertex(V));
		E_i.map(e_i => E.push(e_i));
	}

	return E;
}

function pick_vertex(V) {
	return {
		source: rand_one(V).id,
		target: rand_one(V).id,
		distance: Math.floor(Math.random() * 200)
	};
}

function rand_one(arr) {
	return arr[Math.floor(Math.random() * (arr.length))]; 
}
