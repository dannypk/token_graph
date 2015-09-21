/**
 * Created by daniel.pacurici on 21.09.2015.
 */
module.exports = {
    setStartingPoint: setStartingPoint,
    hasPath: hasPath,
    move: move
};

function setStartingPoint(graph, startingVertex) {
    graph.visited.push(startingVertex);
    graph.currentVertex = startingVertex
}

function hasPath(graph, nextVertex) {
    return !!(graph[graph.currentVertex].indexOf(nextVertex) >= 0 || graph[nextVertex].indexOf(graph.currentVertex) >= 0);
}

function move(graph, nextVertex) {
    if (hasPath(graph, nextVertex)){
        graph.visited.push(nextVertex);
    }
}
