function runGraph() {
  
  var w = window.innerWidth;
  var h = window.innerHeight;
  
  var data = {
    nodes : [
      {id: 'a', radius: 3},
      {id: 'b', radius: ((Math.random() * 15) + 5)},
      {id: 'c', radius: ((Math.random() * 15) + 5)},
      {id: 'd', radius: ((Math.random() * 15) + 5)},
      {id: 'e', radius: ((Math.random() * 15) + 5)},
      {id: 'f', radius: ((Math.random() * 15) + 5)},
      {id: 'g', radius: ((Math.random() * 15) + 5)},
      {id: 'h', radius: ((Math.random() * 15) + 5)},
      {id: 'i', radius: ((Math.random() * 15) + 5)},
      {id: 'j', radius: ((Math.random() * 15) + 5)},
      {id: 'k', radius: ((Math.random() * 15) + 5)},
      {id: 'l', radius: ((Math.random() * 15) + 5)},
      {id: 'm', radius: ((Math.random() * 15) + 5)},
      {id: 'n', radius: ((Math.random() * 15) + 5)},
      {id: 'o', radius: ((Math.random() * 15) + 5)},
      {id: 'p', radius: ((Math.random() * 15) + 5)},
    ],
    
    links : [
    ]
  }
  var svg = d3.select('.root').append('svg')
    .attr('width', w)
    .attr('height', h);

  var simulation = d3.forceSimulation()
    .force('link', d3.forceLink().id(function(d) { return d.id; }))
    .force('charge', d3.forceManyBody()
            .strength([-18])
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
    if (!d3.event.active) simulation.alphaTarget(1);
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
  
  svg.append('text')
    .attr('class', 'header1')
    .attr('x', w/2)
    .attr('y', 100)
    .attr('text-anchor', 'middle')
    .text('John McBride');
    
  svg.append('text')
    .attr('x', w/2)
    .attr('y', 130)
    .attr('text-anchor', 'middle')
    .text('Full-Stack Developer')
  
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
