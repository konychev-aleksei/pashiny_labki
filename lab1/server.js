import express from 'express'
import bodyParser from 'body-parser'
import { Input, Output } from './classes.js'

const args = process.argv.slice(2)
const PORT = args.length && +args[0] ? +args[0] : 5000

const app = express()

let inputObj, outputObj


app.use(bodyParser.json({ limit: '30mb', extended: true}))

app.get('/Ping', (_, res) => res.sendStatus(200))

app.post('/PostInputData', (req, res) => {
    try {
        const { K, Sums, Muls } = req.body

        inputObj = new Input(K, Sums, Muls)
        res.sendStatus(200)
    }
    catch (e) {
        res.sendStatus(400)
    }
})

app.get('/GetAnswer', (_, res) => {
    try {
        const { K, Sums, Muls } = inputObj

        const SumResult = (Sums.reduce((count, item) => count + item, 0) * K)
                            .toFixed(2)
        const MulResult = (Muls.reduce((count, item) => count * item, 1))
                            .toFixed(2)
        const SortedInputs = [...Sums, ...Muls].sort((a, b) => a - b)

        outputObj = new Output(SumResult, MulResult, SortedInputs)
        res.status(200).json(outputObj)
    }
    catch (e) {
        res.status(500)
        console.error(e)
    }
})

app.get('/Stop', (_, res) => {
    try {
        if (server) {
            res.sendStatus(200)
            server.close()        

            console.log('Сервер успешно завершил свою работу')
        }
        else {
            throw new Error()
        }
    }
    catch (e) {
        res.sendStatus(500)
        console.error(e)
    }
})


const server = app.listen(PORT, 
() => console.log(`Сервер запущен на порте ${PORT}`))