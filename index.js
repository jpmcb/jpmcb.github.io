function runGraph() {
  
  var w = window.innerWidth * 0.9;
  var h = window.innerHeight * 0.8;
  
  var data = {
    nodes : [
      {id: 'center', radius: 15},
      {id: 'social', radius: 5},
      {id: 'github', radius: 5},
      {id: 'twitter', radius: 5},
      {id: 'linkedin', radius: 20}
    ],
    
    links : [
      {source: 'social', target: 'github'},
      {source: 'social', target: 'twitter'},
      {source: 'center', target: 'social'},
      {source: 'social', target: 'linkedin'}
    ]
  }
  var svg = d3.select('.root').append('svg')
    .attr('width', w)
    .attr('height', h);

  var simulation = d3.forceSimulation()
    .force('link', d3.forceLink().id(function(d) { return d.id; }))
    .force('charge', d3.forceManyBody()
            .strength([-50])
            .distanceMax([300])
            .distanceMin([230]))
    .force('center', d3.forceCenter(w/2, h/2));
  
  function dragStart(d){
    if(!d3.event.active) simulation.alphaTarget(0.3).restart();
      d.fx = d.x;
      d.fy = d.y;     
    }
  
  function dragged(d){
    d.fx = d3.event.x;
    d.fy = d3.event.y;
  }
  
  function dragEnd(d) {
    if (!d3.event.active) simulation.alphaTarget(0);
      d.fx = null;
      d.fy = null;
  }

  var link = svg.append('g')
    .attr('class', 'links')
    .attr('width', w)
    .attr('height', h)
      .selectAll('link')
        .data(data.links)
        .enter().append('line');
  
  var nodes = svg.append('g')
    .attr('class', 'nodes')
    .attr('width', w)
    .attr('height', h)
      .selectAll('circle')
        .data(data.nodes)
        .enter().append('circle')
          .attr('r', function(d) { return d.radius; })
          
          .call(d3.drag()
                .on('start', dragStart)
                .on('drag', dragged)
                .on('end', dragEnd));
  
  var images = nodes.append("svg:image")
      .attr("xlink:href", "https://github.com/favicon.ico")
      .attr("x", -8)
      .attr("y", -8)
      .attr("width", 16)
      .attr("height", 16);
  
  simulation
    .nodes(data.nodes)
    .on('tick', ticked);
  
  simulation
    .force('link')
    .links(data.links);
  
  function ticked() {
    link
      .attr('x1', function(d) { return d.source.x; })
      .attr('y1', function(d) { return d.source.y; })
      .attr('x2', function(d) { return d.target.x; })
      .attr('y2', function(d) { return d.target.y; });
    
    nodes
      .attr('cx', function(d) { return d.x; })
      .attr('cy', function(d) { return d.y; })
  }
  
  
}

window.onload = function() {
  runGraph();
}
