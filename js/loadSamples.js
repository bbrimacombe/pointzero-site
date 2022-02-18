const sampleData = [
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
    { commonId: 2, name: "fizzbuzz_python", displayName: "Fizzbuzz", fromLang: "python", 
        fromCode: 
`# Enter some python code to translate
def main():
for i in range(20):
    if (i % 15):
    print(i, "fizzbuzz")
    elif i % 3 == 0:
    print(i, "fizz")
    elif i % 5 == 0:
    print(i, "buzz")
    else:
    print(i)`,
    },
    { commonId: 2, name: "fizzbuzz_java", displayName: "Fizzbuzz", fromLang: "java", 
        fromCode: 
`import java.util.*;
class FizzBuzz {
    public static void main(String args[]) {
        int n = 100;

        for (int i=0; i&lt;20; i++) {
            if (i%15==0)
                System.out.print(i + " fizzbuzz");
            else if (i%3==0)
                System.out.print(i + " fizz");
            else if (i%5==0)
                System.out.print(i + " buzz");
            else
                System.out.print(i);
        }
    }
}`,
    },
]

const updateSample = (sampleName) => {
    const inputEditor = $('#inputText').data('inputEditor')
    const outputEditor = $('#outputText').data('outputEditor')
    if (sampleName === 'none') {
        inputEditor.setValue('-- No Code --')
        outputEditor.setValue('-- No Code --')
        return false
    }
    console.log(sampleName)
    const fromCode = sampleData.filter((sample) => sample.name === sampleName)[0].fromCode
    inputEditor.setValue(fromCode)
    outputEditor.setValue('Waiting...')
}

const langSampleChange = (fromLang, toLang) => {
    const inputEditor = $('#inputText').data('inputEditor')
    const outputEditor = $('#outputText').data('outputEditor')
    inputEditor.setOption('mode', langs.filter((lang) => lang.name === fromLang)[0].mode)
    outputEditor.setOption('mode', langs.filter((lang) => lang.name === toLang)[0].mode)
    console.log(fromLang, toLang)
    let sampleNames = []
    sampleData.forEach((sample) => {
        if (sample.fromLang === fromLang) {
            const displayName = sample.displayName
            const name = sample.name
            sampleNames.push({displayName, name})
        }
    })
    let newSampleList = ""
    if (sampleNames.length) {
        sampleNames.forEach((sample) => {
            newSampleList += `<option value=${sample.name}>${sample.displayName}</option>`
        })
        document.querySelector('#samplesList').innerHTML = newSampleList
        updateSample(sampleNames[0].name)
    } else {
        document.querySelector('#samplesList').innerHTML = `<option value="none">No Samples</option>`
        updateSample('none')
    }
}

document.querySelector('#fromLang').addEventListener('change', () => {
    const fromLang = document.querySelector('#fromLang').value
    const toLang = document.querySelector('#toLang').value
    langSampleChange(fromLang, toLang)
})

document.querySelector('#toLang').addEventListener('change', () => {
    const fromLang = document.querySelector('#fromLang').value
    const toLang = document.querySelector('#toLang').value
    langSampleChange(fromLang, toLang)
})

document.querySelector('#samplesList').addEventListener('change', () => {
    const sampleName = document.querySelector('#samplesList').value
    updateSample(sampleName)
})