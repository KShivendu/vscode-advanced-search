result = foo(bar(x)) + foobar(baz(x));

// Search: `(:[1])`
// Matches: `(bar(x))` and `(baz(x))`

// Conventioned serach query (regex): \(.*\)
// Matches: `(bar(x)) + foobar(baz(x))`. But this isn't what we wanted. 
