var svg = d3.select("svg");
var width = +svg.attr("width");
var height = +svg.attr("height");

var { V, E } = construct_complete_graph(6);
var nodes_data = V;
var links_data = E;

var nodes = svg.append("g")
	.attr("class", "nodes")
	.selectAll("circle")
	.data(nodes_data)
	.enter()
	.append("circle")
	.attr("r", 4)
	.attr("fill", d=> d.color);  

var links = svg.append("g")
	.attr("class", "links")
	.selectAll("line")
	.data(links_data)
	.enter().append("line")
	.attr("stroke-width", 0.3);  

var link_force = d3.forceLink(links_data)
	.id(d => d.id);
	// .distance(d => d.distance);

var simulation = d3.forceSimulation()
	.nodes(nodes_data)
	.force("charge_force", d3.forceManyBody())
	.force("center_force", d3.forceCenter(width / 2, height / 2))
	.force("links", link_force);      

simulation.on('tick', () => {
    nodes
        .attr("cx", d => d.x)
        .attr("cy", d => d.y);
 
    links
        .attr("x1", d => d.source.x)
        .attr("y1", d => d.source.y)
        .attr("x2", d => d.target.x)
        .attr("y2", d => d.target.y);
	}
);
