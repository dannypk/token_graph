/**
 * Created by daniel.pacurici on 21.09.2015.
 */
var game = require('../app/graph_game');

describe("Given we have a board", function () {
    var graph;
    beforeEach(function () {
        graph = {
            1: [2, 3, 4],
            2: [3, 4], 3: [4],
            visited: [],
            currentVertex: -1
        };
    });

    describe("When player1 chooses a starting vertex", function () {
        var startingVertex;
        beforeEach(function () {
            startingVertex = 1;
            game.setStartingPoint(graph, startingVertex);
        });

        it("starting point should be the chosen vertex", function () {
            expect(graph.visited).toContain(startingVertex);
        });


        it("current vertex should be the chosen vertex", function () {
            expect(graph.currentVertex).toBe(startingVertex);
        });


        describe("Then player2 makes the first move", function () {
            var nextVertex, hasPath;
            beforeEach(function () {
                nextVertex = 2;
                hasPath = game.hasPath(graph, nextVertex);
                game.move(graph, nextVertex);

            });

            it("vertex should have a link to the move the player does", function () {
                expect(hasPath).toBe(true);
            });

            it("should add the current vertex to visited array", function () {
                expect(graph.visited).toEqual([1, 2]);
            });
        });
    });
});


/*

 1:[2,3]
 2:[4]


 */