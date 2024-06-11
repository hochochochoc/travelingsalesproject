
// 1. What is the optimal solution?

    // after a certain number of nodes it becomes impossible to calculate the 
    // optimal solution

// 2. How to calculate the lower bound instead?

// For this the MST (MINIMUM SPANNING TREE) is used

// no loops, minimum weight 
// it HAS polynominal time algorithms

    // PRIM'S ALGORITHM is used to calculate the MST

    // starts with random node. 
    // finds nearest node.
    // looks for nearest node from either node already selected, connects.
    // continues like that for all of them.

        // here, the greedy approach does provide the optimal solution
        // and the tree is always a 'lower bound' to the TSP


        // however, it's possible to improve on this lower bound

        // the ONE-TREE where exactly one loop is introduced (9:10)
        // and you can search through all the loops for the largest one
            // getting closer to the actual lower bound/ optimal solution


// So now algorithms are rated by how close they get to the 
// one-tree lower bound

// for the greedy/Nearest-Neighbor heuristic it's about 1.25 times the distance

// there's actually a different algorithm called the greedy heuristic (11:20)
    // which searches for the lowest weight vectors overall
    // 1.17 compared to 1tree


// next is the Christofides Method, which is based somewhat on the MST








