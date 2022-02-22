import { reloadSamples } from './reloadSamples.js'

export let sampleData = [
    //{ commonId: 1, name: "hello_world_python", displayName: "Hello World", fromLang: "python", fromCode: 'print("Hello, World!")' },
]

export const langByExtension = [
    { fileExt: 'c', lang: 'c' },
    { fileExt: 'cpp', lang: 'cpp' },
    { fileExt: 'java', lang: 'java' },
    { fileExt: 'py', lang: 'python' },
    { fileExt: 'rs', lang: 'rust' },
]

const filesToLoad = [ 
    { commonId: 1, fromFile: 'hello_world.c' },
    { commonId: 1, fromFile: 'hello_world.cpp' },
    { commonId: 1, fromFile: 'hello_world.java' },
    { commonId: 1, fromFile: 'hello_world.py' },
    { commonId: 1, fromFile: 'hello_world.rs' },
    { commonId: 2, fromFile: 'division_formula.cpp' },
    { commonId: 3, fromFile: 'expressions.rs' },
    { commonId: 4, fromFile: 'fizzbuzz.java' },
    { commonId: 5, fromFile: 'fizzbuzz.py' },
    { commonId: 6, fromFile: 'leap_year.cpp' },
    { commonId: 7, fromFile: 'primitives.rs' },
    { commonId: 8, fromFile: 'print_ascii.c' },
    { commonId: 9, fromFile: 'variable_bindings.rs' },
    { commonId: 10, fromFile: 'variable_size.c' }
]

const samplesLocation = 'https://pointzero.ai/samples/'

let loadedFiles = 0

filesToLoad.forEach((file) => {
    axios.get(samplesLocation + file.fromFile)
    .then((response) => {
        const { data } = response
        const fileExt = file.fromFile.split('.').pop()
        langByExtension.forEach((lang) => {
            if (fileExt === lang.fileExt) {
                sampleData.push({ commonId: file.commonId, name: file.fromFile, displayName: file.fromFile, fromLang: lang.lang, fromCode: data })
            }
        })
        loadedFiles ++
    })
    .then(() => {
        if (filesToLoad.length === loadedFiles) {
            reloadSamples(sampleData)
        }
    })
    .catch((e) => console.log(e))
})