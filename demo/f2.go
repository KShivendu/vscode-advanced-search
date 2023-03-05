package main

import "fmt"

func UpperCamelCase1() {
	fmt.Println("foo")
}
func UpperCamelCase2() {
	fmt.Println("baar")
}
func main() {
	UpperCamelCase1()
	UpperCamelCase2()
}

// Search: `:[[fn]]()`
// Replace: `:[[fn]].lowerCamelCase()`