export const sampleData = [
    { commonId: 1, name: "hello_world_python", displayName: "Hello World", fromLang: "python", fromCode: 'print("Hello, World!")' },
    { commonId: 1, name: "hello_world_java", displayName: "Hello World", fromLang: "java", fromCode: 'System.out.println("Hello, World!");' },
    { commonId: 1, name: "hello_world_c", displayName: "Hello World", fromLang: "c", 
    fromCode: 
`#include <stdio.h>
int main()
{
    printf("Hello World");
    return 0;
}`,
    },
    { commonId: 1, name: "hello_world_cpp", displayName: "Hello World", fromLang: "cpp", 
    fromCode: 
`#include <iostream>

int main() {
    std::cout << "Hello World!";
    return 0;
}`,
    },
    { commonId: 1, name: "hello_world_rust", displayName: "Hello World", fromLang: "rust", 
    fromCode: 
`fn main() {
    println!("Hello World!");
}`,
    },
]