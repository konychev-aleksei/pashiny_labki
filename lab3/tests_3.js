import convert from 'xml-js'
import readline from 'readline'


const testSet = [
    //TEST 1
    {
        type: 'XML',
        data: 
`<Input> 
    <K>10</K> 
    <Sums> 
        <decimal>1.01</decimal> 
        <decimal>2.02</decimal> 
    </Sums> 
    <Muls> 
        <int>1</int> 
        <int>4</int> 
    </Muls> 
</Input>`
    },

    //TEST 2
    {
        type: 'XML',
        data: 
`<Input> 
    <K>12</K> 
    <Sums> 
        <decimal>1.01</decimal> 
        <decimal>2.02</decimal> 
        <decimal>1.01</decimal> 
        <decimal>4.82</decimal> 
        <decimal>9.12</decimal> 
        <decimal>11.11</decimal>                 
    </Sums> 
    <Muls> 
        <int>1</int> 
        <int>2</int> 
        <int>3</int> 
        <int>4</int> 
        <int>5</int> 
    </Muls> 
</Input>`
    },  
    
    //TEST 3
    {
        type: 'XML',
        data: 
`<Input> 
    <K>12</K> 
    <Sums> 
        <decimal>7.32</decimal> 
        <decimal>6.53</decimal> 
        <decimal>15.59</decimal> 
        <decimal>24.48</decimal> 
        <decimal>0</decimal>                 
    </Sums> 
    <Muls> 
        <int>9.87</int>
        <int>12.6</int>
        <int>54.36</int>
        <int>14.32</int>
        <int>60.13</int>
        <int>29.85</int>
    </Muls> 
</Input>`
    },      

    //TEST 4
    {
        type: 'XML',
        data: 
`<Input> 
    <K>12</K> 
    <Sums> 
        <decimal>17.32</decimal> 
        <decimal>36.73</decimal> 
        <decimal>86.57</decimal> 
        <decimal>24.08</decimal> 
        <decimal>23.54</decimal>                 
    </Sums> 
    <Muls> 
        <int>1.31</int>
        <int>11.4</int>
    </Muls> 
</Input>`
    },          

    //TEST 5
    {
        type: 'XML',
        data: 
`<Input> 
    <K>12</K> 
    <Sums> 
        <decimal>6.22</decimal> 
        <decimal>32.13</decimal> 
        <decimal>86.47</decimal> 
        <decimal>24.48</decimal> 
        <decimal>23.29</decimal>                 
    </Sums> 
    <Muls> 
        <int>1.31</int>
        <int>11.4</int>
    </Muls> 
</Input>`
    },             
    
    //TEST 6
    {
        type: 'JSON',
        data: {
            K: 10,
            Sums: [1.01, 2.02],
            Muls: [1, 4]
        }
    },             
    
    //TEST 7
    {
        type: 'JSON',
        data: {
            K: 13,
            Sums: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
            Muls: [6, 7, 4, 3, 8]
        }
    },      
    
    //TEST 8
    {
        type: 'JSON',
        data: {
            K: 2,
            Sums: [100000],
            Muls: [21, 23, 65, 32, 67, 87]
        }
    },                 

    //TEST 9
    {
        type: 'XML',
        data: 
`<Input> 
    <K>text</K> 
    <Sums> 
        <decimal>text</decimal> 
        <decimal>text</decimal> 
    </Sums> 
    <Muls> 
        <int>text</int> 
        <int>text</int> 
    </Muls> 
</Input>`
    },                     

    //TEST 10
    {
        type: 'XML',
        data: 
`<Input> 
    <Field1>10</Field1> 
    <Field2> 
        <decimal>1.01</decimal> 
        <decimal>2.02</decimal> 
    </Field2> 
    <Field3> 
        <int>1</int> 
        <int>4</int> 
    </Field3> 
</Input>`
    },          
]



const processData = (data) => {
    try {
        data = JSON.parse(data).Input
        return {
            K: +data.K._text,
            Sums: data.Sums.decimal.map(item => +item._text),
            Muls: data.Muls.int.map(item => +item._text)
        }
    }
    catch (e) {
        return {}
    }
}

const serialize = (inputData, type, index) => {
    const data = type === 'XML' ? 
        processData(convert.xml2json(inputData, {compact: true, spaces: 4})) 
    : 
        JSON.parse(JSON.stringify(inputData))

    let result
    const { K, Sums, Muls } = data

    try {
        if (!K || isNaN(K) || !Array.isArray(Sums) || !Array.isArray(Muls)) {
            throw new Error()
        }

        const SumResult = +(Sums.reduce((count, item) => count + item, 0) * K)
                            .toFixed(2)
        const MulResult = +(Muls.reduce((count, item) => count * item, 1))
                            .toFixed(2)
        const SortedInputs = [...[...Sums].sort((a, b) => a - b), ...[...Muls].sort((a, b) => b - a)]

        result = { 
            SumResult,
            MulResult,
            SortedInputs: {
                decimal: SortedInputs
            }
        }

        if (type === 'XML') {
            result = convert.json2xml({ Output: result }, {compact: true, ignoreComment: true, spaces: 4})
        }
    }
    catch (e) {
        result = 'Bad Request'
    }
    
    console.log(`\n\nTEST ${index + 1}`)
    console.log('@Request\n')
    console.log(inputData)
    console.log('@Response\n')
    console.log(result)
}

(
    () => {
        testSet.forEach((testData, i) => {
            serialize(testData.data, testData.type, i)
        })
    }
)()