import express from 'express'
import bodyParser from 'body-parser'
import { Input, Output } from './classes.js'

const args = process.argv.slice(2)
const PORT = args.length && +args[0] ? +args[0] : 5000

const app = express()

let inputObj, outputObj

const getRandom = (range = 10) => Math.floor(Math.random() * range) + 1


app.use(bodyParser.json({ limit: '30mb', extended: true}))

app.get('/Ping', (_, res) => res.sendStatus(200)) +

app.get('/GetInputData', (_, res) => {
    try {
        const K = getRandom(50)
        const Sums = new Array(getRandom()).fill().map(() => getRandom(100))
        const Muls = new Array(getRandom()).fill().map(() => getRandom(100))

        inputObj = new Input(K, Sums, Muls)
        res.status(200).json(inputObj)
    }
    catch (e) {
        res.sendStatus(500)
    }
})

app.post('/WriteAnswer', (req, res) => {
    try {
        const { SumResult, MulResult, SortedInputs } = req.body
        const { K, Sums, Muls } = inputObj

        const __SumResult = (Sums.reduce((count, item) => count + item, 0) * K)
                            .toFixed(2)
        const __MulResult = (Muls.reduce((count, item) => count * item, 1))
                            .toFixed(2)
        const __SortedInputs = [...Sums, ...Muls].sort((a, b) => a - b)

        outputObj = new Output(__SumResult, __MulResult, __SortedInputs)

        let statusCode = 200
        if (
            SumResult !== __SumResult ||
            __MulResult.length !== MulResult.length ||
            __MulResult.forEach((item, i) => item !== MulResult[i]) ||
            __SortedInputs.length !== SortedInputs.length ||
            __SortedInputs.forEach((item, i) => item !== SortedInputs[i])         
        ) {
            statusCode = 400
        }

        res.status(statusCode).json(outputObj)
    }
    catch (e) {
        res.status(500)
        console.error(e)
    }
})

app.listen(PORT, 
() => console.log(`Сервер запущен на порте ${PORT}`))