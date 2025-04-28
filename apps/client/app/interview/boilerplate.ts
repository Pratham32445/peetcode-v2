export const boilerPlates = {
  cpp: `#include <iostream>
using namespace std;

int main() {
    // Your code here
    return 0;
}`,

  python: `if __name__ == "__main__":
    # Your code here
    print("Hello, World!")`,

  javascript: `console.log("Hello, World!");`,

  typescript: `const greet = (): void => {
    console.log("Hello, World!");
};

greet();`,

  java: `public class Main {
    public static void main(String[] args) {
        // Your code here
        System.out.println("Hello, World!");
    }
}`,

  csharp: `using System;

class Program {
    static void Main(string[] args) {
        // Your code here
        Console.WriteLine("Hello, World!");
    }
}`,

  go: `package main

import "fmt"

func main() {
    fmt.Println("Hello, World!")
}`,

  ruby: `puts "Hello, World!"`,

  php: `<?php
// Your code here
echo "Hello, World!";
?>`,

  swift: `import Foundation

print("Hello, World!")`,

  kotlin: `fun main() {
    println("Hello, World!")
}`,
};
