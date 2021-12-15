import convert from 'xml-js'
import readline from 'readline'

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
})

const processData = (data) => {
    data = JSON.parse(data).Input
    return {
        K: +data.K._text,
        Sums: data.Sums.decimal.map(item => +item._text),
        Muls: data.Muls.int.map(item => +item._text)
    }
} 

rl.question("Введите тип сериализации: ", type => {
    rl.question("Введите входные данные: ", inputData => {
        const data = type === 'XML' ? 
            processData(convert.xml2json(inputData, {compact: true, spaces: 4})) 
        : 
            JSON.parse(inputData)

        const { K, Sums, Muls } = data

        const SumResult = +(Sums.reduce((count, item) => count + item, 0) * K)
                            .toFixed(2)
        const MulResult = +(Muls.reduce((count, item) => count * item, 1))
                            .toFixed(2)
        const SortedInputs = [...Sums, ...Muls].sort((a, b) => a - b)

        let result = { 
          SumResult,
          MulResult,
          SortedInputs: {
              decimal: SortedInputs
          }
        }

        if (type === 'XML') {
            result = convert.json2xml({ Output: result }, {compact: true, ignoreComment: true, spaces: 4})
        }
        
        console.log(result)
        rl.close()
    })
})

rl.on("close", () => process.exit(0))
