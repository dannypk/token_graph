/**
 * Created by daniel.pacurici on 21.09.2015.
 */
module.exports = {
    setStartingPoint: setStartingPoint,
    hasPath: hasPath,
    move: move,
    haveMoves: haveMoves,
    play: play,
    getNeighbours: getNeighbours
};

function play(graph, currentVertex, moves) {
    moves = moves || [];
    graph.currentVertex = currentVertex || 2;
    if (!haveMoves(graph)) return moves;


    for (var neighbour in getNeighbours(graph, graph.currentVertex)) {
        moves.push(neighbour);
        play(graph, neighbour, moves);
    }
}

function getNeighbours(graph, vertex) {
    return getDirectNeighbours(graph, vertex).concat(getIndirectNeighbours(graph, vertex));
}


function setStartingPoint(graph, startingVertex) {
    graph.visited.push(startingVertex);
    graph.currentVertex = startingVertex
}


function move(graph, nextVertex) {
    if (haveMoves(graph) && !isVisited(graph, nextVertex) && hasPath(graph, nextVertex)) {
        graph.visited.push(nextVertex);
        graph.currentVertex = nextVertex;
        graph.playerTurn = 1 - graph.playerTurn;
    }
}

function haveMoves(graph) {
    var moves = false;
    var currentVertex = graph.currentVertex;

    if (graph.nodes[currentVertex]) {
        graph.nodes[currentVertex].forEach(function (vertex) {
            if (graph.visited.indexOf(vertex) === -1) {
                moves = true;
            }
        });

        if (moves === true) return true;
    }

    for (var vertex in graph.nodes) {
        if (graph.nodes.hasOwnProperty(vertex)) {
            vertex = parseInt(vertex);
            if (vertex !== currentVertex) {
                if (graph.nodes[vertex].indexOf(currentVertex) >= -1 && graph.visited.indexOf(vertex) === -1)
                    moves = true;
            }
        }
    }

    return moves;
}

function isVisited(graph, nextVertex) {
    return graph.visited.indexOf(nextVertex) >= 0
}

function hasPath(graph, nextVertex) {
    return !!((graph.nodes[graph.currentVertex] && graph.nodes[graph.currentVertex].indexOf(nextVertex) >= 0 ) ||
    (graph.nodes[nextVertex] && graph.nodes[nextVertex].indexOf(graph.currentVertex) >= 0));
}

function getDirectNeighbours(graph, vertex) {
    var neighbours = [];
    vertex = vertex || graph.currentVertex;
    if (graph.nodes[vertex]) {
        graph.nodes[vertex].forEach(function (neighbour) {
            if (neighbours.indexOf(neighbour) === -1) {
                neighbours.push(neighbour);
            }
        });
    }
    return neighbours;
}

function getIndirectNeighbours(graph, vertex) {
    var neighbours = [];
    vertex = vertex || graph.currentVertex;
    for (var neighbour in graph.nodes) {
        if (graph.nodes.hasOwnProperty(neighbour)) {
            neighbour = parseInt(neighbour);
            if (neighbour !== vertex) {
                if (graph.nodes[neighbour].indexOf(vertex) >= -1 && neighbours.indexOf(neighbour) === -1)
                    neighbours.push(neighbour);
            }
        }
    }
    return neighbours;
}