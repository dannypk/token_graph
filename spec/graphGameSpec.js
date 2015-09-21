/**
 * Created by daniel.pacurici on 21.09.2015.
 */
var game = require('../app/graph_game');

describe("Given we have a board", function () {
    var graph;
    beforeEach(function () {
        graph = {
            nodes: {
                1: [2, 3, 4],
                2: [3, 4], 3: [4]
            },
            visited: [],
            currentVertex: -1,
            nodesCount: 4,
            playerTurn: 0
        }
    });

    describe("for node 3", function () {
        var neighbours;
        beforeEach(function () {
            neighbours = game.getNeighbours(graph, 3);
        });
        it("should return neighbours 1,2,4", function () {
            expect(neighbours).toEqual([4, 1, 2]);
        })
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


        describe("When player2 makes the first move", function () {
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


            describe("and then player1 makes the next move to the previous visited step", function () {
                beforeEach(function () {
                    nextVertex = 1;
                    game.move(graph, nextVertex);
                });

                it("the move should not be possible", function () {
                    expect(graph.visited).toEqual([1, 2]);
                });
            });

            describe("Then player1 makes the next move", function () {
                beforeEach(function () {
                    nextVertex = 3;
                    game.move(graph, nextVertex);
                });

                it("should add the current vertex to visited array", function () {
                    expect(graph.visited).toEqual([1, 2, 3]);
                });


                describe("Then player2 makes the next move", function () {
                    beforeEach(function () {
                        nextVertex = 4;
                        game.move(graph, nextVertex);
                    });

                    it("should add the current vertex to visited array", function () {
                        expect(graph.visited).toEqual([1, 2, 3, 4]);
                    });

                    describe("Then player1 ran out of moves", function () {
                        var haveMoves;
                        beforeEach(function () {
                            haveMoves = game.haveMoves(graph);
                        });

                        it("should not have any available moves", function () {
                            expect(haveMoves).toBe(false);
                        });
                    });
                });
            });
        });
    });
});


describe("Given we have a random board", function () {
    var graph, result;
    beforeEach(function () {
        graph = {
            nodes: {
                1: [2, 3, 4],
                2: [3, 4], 3: [4]
            },
            visited: [1, 2, 3, 4],
            currentVertex: -1,
            playerTurn: 0
        };

        game.setStartingPoint(graph, 3);
        result = game.play(graph);
    });


    it("should calculate a proper path to visit the tree", function () {
        expect(result.length).toBeGreaterThan(-1);
    });
});


/*

 1:[2,3]
 2:[4]


 */