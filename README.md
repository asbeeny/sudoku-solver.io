## Sudoku Solver

This site explores sudoku solving methods and computer algorithms. Currently this is under construction, so my sincerest apologies for all of the missing pieces. I hope you find it entertaining!

## Basic rules for terms

A sudoku puzzle consists of a 9&times;9 square grid with smaller 3&times;3 subgrids, which we will call **blocks**. Since columns are just rotated rows, and vice versa, I usually refer to these generally as **lines**. So every line and block has 9 **cells**, each of which contain a numeral from 1-9. The goal of a sudoku is to fill in the empty cells so that each numeral appears in a line or block exactly once. Sudoku puzzles are given with a number of cells already filled in - these are called **clues**. If a numeral may be placed in a particular cell with the information available, then we say this numeral is a **candidate** in that cell. A proper sudoku has one and only one solution, that is, it is **unique**. If a sudoku cannot be solved, then we say it is has **no solution** (duh).

## Human-solving methods

The human brain is excellent at recognizing patterns, and this is probably why sudoku can be so addicting. We fill in numbers using various deductive methods, the simplest of which is done by looking at a line or a block with one empty cell. In this case, we start counting 1, 2, 3, ... checking off numerals that appear. If a number isn't present, then we fill the cell with this number. We build on this method by looking at a row, column or block, consider multiple candidates, then eliminate numbers that fail to work for intersecting rows, columns, or blocks.


<iframe src="./src/app.html"></iframe>
