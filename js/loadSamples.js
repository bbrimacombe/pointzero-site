const sampleData = [
    { name: "Fizzbuzz", fromLang: "python", 
        fromCode: `# Enter some python code to translate
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
    { name: "Fizzbuzz 2", fromLang: "python", 
        fromCode: `# Enter some python code to translate
        def main():
        for i in range(20):
            if (i % 15):
            print(i, "fizzbuzz 2")
            elif i % 3 == 0:
            print(i, "fizz 2")
            elif i % 5 == 0:
            print(i, "buzz 2")
            else:
            print(i)`,
    },
    { name: "Fizzbuzz 3", fromLang: "java", 
        fromCode: `import java.util.*;
        class FizzBuzz {
            public static void main(String args[]) {
                int n = 100;
        
                for (int i=0; i&lt;20; i++) {
                    if (i%15==0)
                        System.out.print(i + " fizzbuzz 3");
                    else if (i%3==0)
                        System.out.print(i + " fizz 3");
                    else if (i%5==0)
                        System.out.print(i + " buzz 3");
                    else
                        System.out.print(i);
                }
            }
        }`,
        }
]

const updateSample = (sampleName) => {
    const inputEditor = $('#inputText').data('inputEditor')
    const outputEditor = $('#outputText').data('outputEditor')
    if (sampleName === 'none') {
        inputEditor.setValue('-- No Code --')
        outputEditor.setValue('-- No Code --')
        return false
    }
    const fromCode = sampleData.filter((sample) => sample.name === sampleName)[0].fromCode
    inputEditor.setValue(fromCode)
    outputEditor.setValue('Waiting...')
}

const langSampleChange = (fromLang, toLang) => {
    const inputEditor = $('#inputText').data('inputEditor')
    const outputEditor = $('#outputText').data('outputEditor')
    inputEditor.setOption('mode', langs.filter((lang) => lang.name === fromLang.toLowerCase())[0].mode)
    outputEditor.setOption('mode', langs.filter((lang) => lang.name === toLang.toLowerCase())[0].mode)
    console.log(fromLang, toLang)
    let sampleNames = []
    sampleData.forEach((sample) => {
        if (sample.fromLang === fromLang.toLowerCase()) {
            sampleNames.push(sample.name)
        }
    })
    let newSampleList = ""
    if (sampleNames.length) {
        sampleNames.forEach((sample) => {
            newSampleList += `<option>${sample}</option>`
        })
        document.querySelector('#samplesList').innerHTML = newSampleList
        updateSample(sampleNames[0])
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