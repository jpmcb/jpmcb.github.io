var myScore = 0;

function runGraph() {
  
  var w = window.innerWidth * 0.9;
  var h = window.innerHeight;
  
  var data = {
    nodes : [
      {id: 'a', text: 'Portfolio', state: 'off', link: '#portfolio', linkTarget: ''},
      {id: 'b', text: 'About', state: 'off', link: '#about', linkTarget: ''},
      {id: 'c', text: 'JavaScript', state: 'off', link: 'https://github.com/jpmcb/JavaScript-Calculator', linkTarget: '_blank'},
      {id: 'd', text: 'Contact', state: 'off', link: '#contact', linkTarget: ''},
      {id: 'e', text: 'D3.js', state: 'off'},
      {id: 'f', text: 'React', state: 'off'},
      {id: 'g', text: 'JavaScript', state: 'off'},
      {id: 'h', text: 'JavaScript', state: 'off'},
      {id: 'i', text: 'JavaScript', state: 'off'},
      // {id: 'j', radius: ((Math.random() * 15) + 5)},
      // {id: 'k', radius: ((Math.random() * 15) + 5)},
      // {id: 'l', radius: ((Math.random() * 15) + 5)},
      // {id: 'm', radius: ((Math.random() * 15) + 5)},
      // {id: 'n', radius: ((Math.random() * 15) + 5)},
      // {id: 'o', radius: ((Math.random() * 15) + 5)},
      // {id: 'p', radius: ((Math.random() * 15) + 5)},
    ],
    
    links : [
      // {source: 'c', target: 'a'},
      // {source: 'c', target: 'b'},
      // {source: 'c', target: 'd'}
    ]
  }
  var svg = d3.select('.root').append('svg')
    .attr('width', w)
    .attr('height', h);

  var simulation = d3.forceSimulation()
    .force('link', d3.forceLink().id(function(d) { return d.id; }).distance([200]))
    .force('charge', d3.forceManyBody()
            .strength([-20])
            .distanceMax([300])
            .distanceMin([200]))
    .force('center', d3.forceCenter(w/2, (h/2 + 60)));
  
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
  
  var nodeBox = svg.append('g')
    .attr('class', 'nodes')
    .attr('width', w)
    .attr('height', h);
  
  
  var nodes = nodeBox.selectAll('.nodes')
        .data(data.nodes)
        .enter().append('g')
          //.attr('r', function(d) { return d.radius; })
          .on('click', function(d) { 
            (d.state == 'on') ? (d.state = 'off') : (d.state = 'on'); 
            
            if(d.state == 'on') {
               d3.select(this.firstChild).transition()
                .duration(2000)
                  .attr('width', 30)
                  .style('fill', '#00173d');
              
              d3.select(this.children[1])
                .transition()
                .duration(500)
                  .style('opacity', 0);
              
            } else {
              d3.select(this.firstChild).transition()
              .duration(1000)
                .attr('width', 100)
                .style('fill', '#b7b7b7');
              
               d3.select(this.children[1])
                .transition()
                .duration(500)
                .delay(1000)
                  .style('opacity', 1);
            }
    })
          .call(d3.drag()
                .on('start', dragStart)
                .on('drag', dragged)
                .on('end', dragEnd));  
  
  //var circleNodes = nodes.append('circle')
  
  var textbox = nodes.append('rect')
    .attr('width', 100)
    .attr('height', 30)
    .attr('rx', 20)
    .attr('ry', 20);
  
  var anchors = nodes.append('a')
    .attr("href", function(d){ return d.link; })
    .attr('target', function(d){ return d.linkTarget; });
  
  var skillText = anchors.append('text')
      .attr('dx', 0)
      .attr('dy', 20)
      .attr('text-anchor', 'middle')
      .text(function(d) { return d.text; });
  
  svg.append('text')
    .attr('class', 'header1')
    .attr('x', w/2)
    .attr('y', 100)
    .attr('text-anchor', 'middle')
    .text('John McBride');
  
  // svg.append('text')
  //   .attr('class', 'header2')
  //   .attr('x', w/2)
  //   .attr('y', 160)
  //   .attr('text-anchor', 'middle')
  //   .text('Denver based');
    
  svg.append('text')
    .attr('x', w/2)
    .attr('y', 155)
    .attr('text-anchor', 'middle')
    .text('Denver based Full-Stack Developer')
  
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
      .attr('cx', function(d) { return d.x = Math.max(60, Math.min(w - 50, d.x)); })
      .attr('cy', function(d) { return d.y = Math.max(275, Math.min(h - 40, d.y)); });
    
    skillText
      .attr("transform", function(d) { return "translate(" + d.x + "," + d.y + ")"; });
    
    textbox
      .attr("transform", function(d) { return "translate(" + (d.x - 50) + "," + d.y + ")"; });
    
    // images
    //   .attr("transform", function(d) { return "translate(" + d.x + "," + d.y + ")"; });
  }
}

window.onload = function() {
  runGraph();
}