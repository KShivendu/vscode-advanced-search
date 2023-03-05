package main

import (
	"fmt"
)

func add(x int, y int) int {
	return x + y
}

func main() {
	fmt.Println("Hello, World!")

	res := add(1, 2)
	fmt.Println(res)

	/* This is a comment so it won't get replaced
	   fmt.Println("Hello, World!");
	*/
}

// Search: add(:[1], :[2])
// Replace: add(:[2], :[1])
