var result = foo(bar(x /* arg 1) */)) + foobar("(");


// Search: `(:[1])`
// Matches: `(bar(x /* arg 1) */))` and `("(")`

// It is infeasible to write a regex that can handle such cases.
