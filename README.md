# VS code advanced search and replace

This extension allows you to do a structured search on the code and replace it. This is much more powerful than the built-in search and replace which is limited to regex at the best.

## Setup:

1. Follow https://pnpm.io/installation to install pnpm.
2. Run `pnpm install` to install dependencies.
3. Go to `packages/webview` and run `pnpm dev`. This will build the UI of the extension.
4. Install comby from https://comby.dev/docs/get-started
5. Open the "Run and debug" panel in VS code and click "Run Extension" to run the extension

## Basic example 

Here is a simple go program
```
package main 
import "fmt" 

func main() {
	fmt.Println("foo")
	
}
``` 
Now if you want to replace the argument of `Println("foo")` with Println("foo", "bar") 

By using our extension you can achive this by

insert `fmt.Println(:[arg])` this text in search query box of the extension 

and in the insert query box  `fmt.Println(:[arg], "baar")` 
 
and press  `replace` button. 

in the left pane we can see the applied change:
```
package main 
import "fmt" 

func main() {
	fmt.Println("foo", "bar")
	
} 
```
we're using Comby. Please refer comby docs: https://comby.dev/docs/overview 


## Citation: 
https://github.com/comby-tools/comby
