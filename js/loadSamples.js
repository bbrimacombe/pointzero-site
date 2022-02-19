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
]

const updateSample = (sampleName) => {
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

const langSampleChange = (fromLang) => {
    inputEditor.setOption('mode', langs.filter((lang) => lang.name === fromLang)[0].mode)
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
    langSampleChange(fromLang)
})

document.querySelector('#toLang').addEventListener('change', () => {
    const toLang = document.querySelector('#toLang').value
    outputEditor.setOption('mode', langs.filter((lang) => lang.name === toLang)[0].mode)
})

document.querySelector('#samplesList').addEventListener('change', () => {
    const sampleName = document.querySelector('#samplesList').value
    updateSample(sampleName)
})