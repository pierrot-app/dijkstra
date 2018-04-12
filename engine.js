let ug = require('ug');
let graph = new ug.Graph();

let classification = graph.createNode('classification', {name: 'Sharing Economy'});

let corps = {
  uber: graph.createNode('corporation', {name: 'Uber'}),
  storefront: graph.createNode('corporation', {name: 'Storefront'}),
  airbnb: graph.createNode('corporation', {name: 'AirBnB'})
};

let industries = {
  vc: graph.createNode('industry', {name: 'Venture Capital'}),
  hospitality: graph.createNode('industry', {name: 'Hospitality'}),
  taxi: graph.createNode('industry', {name: 'Taxi'})
};

graph.createEdge('business_model').link(corps.uber, classification);
graph.createEdge('business_model').link(corps.airbnb, classification);
graph.createEdge('business_model').link(corps.storefront, classification);
graph.createEdge('emotion', {type: 'happy'}).link(industries.vc, classification);
graph.createEdge('emotion', {type: 'sad'}).link(industries.hospitality, classification);
graph.createEdge('emotion', {type: 'sad'}).link(industries.taxi, classification);

graph.closest(
  graph.nodes('classification').query().first(), // grab Sharing Economy node
  {
    compare: function(node) {
      // forget industries and uber!
      return node.entity !== 'industry' && node.get('name') !== 'Uber';
    },
    direction: -1 // only track nodes that feed in to this one
  }
);

// returns two paths, one from Sharing Economy << (business_model) << AirBnB
//    and Sharing Economy << business_model << Storefront,
//    ordered by their distance