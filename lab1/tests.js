import axios from 'axios'

const GET = 'GET', POST = 'POST', basename = 'http://localhost:5000'

const getRandomValue = (range = 15) => +(Math.random() * range).toFixed(2)

const testSet = [
    //TEST 1
    {
        url: '/Ping', 
        method: GET, 
        data: {}
    },

    //TEST 2
    {
        url: '/PostInputData', 
        method: POST, 
        data: {
            K: 10, 
            Sums: [1.01, 2.02], 
            Muls: [1, 4]
        }
    },
    //TEST 3
    {
        url: '/GetAnswer',
        method: GET, 
        data: {}
    },

    //TEST 4
    {
        url: '/PostInputData', 
        method: POST, 
        data: {
            K: getRandomValue(15), 
            Sums: new Array(Math.floor(getRandomValue())).fill().map(() => getRandomValue(100)), 
            Muls: new Array(Math.floor(getRandomValue())).fill().map(() => getRandomValue(100))
        }
    },
    //TEST 5
    {
        url: '/GetAnswer', 
        method: GET, 
        data: {}
    },

    //TEST 6
    {
        url: '/PostInputData', 
        method: POST, 
        data: {
            K: getRandomValue(15), 
            Sums: new Array(Math.floor(getRandomValue())).fill().map(() => getRandomValue(100)), 
            Muls: new Array(Math.floor(getRandomValue())).fill().map(() => getRandomValue(100))
        }
    },
    //TEST 7
    {
        url: '/GetAnswer', 
        method: GET, 
        data: {}
    },
    
    //TEST 8
    {
        url: '/PostInputData', 
        method: POST, 
        data: {
            K: getRandomValue(15), 
            Sums: new Array(Math.floor(getRandomValue())).fill().map(() => getRandomValue(100)), 
            Muls: new Array(Math.floor(getRandomValue())).fill().map(() => getRandomValue(100))
        }
    },
    //TEST 9
    {
        url: '/GetAnswer', 
        method: GET, 
        data: {}
    },    

    //TEST 10
    {
        url: '/PostInputData', 
        method: POST, 
        data: {
            K: null, 
            Sums: 'NOT ARRAY', 
            Muls: undefined
        }
    },
    //TEST 11
    {
        url: '/GetAnswer', 
        method: GET, 
        data: {}
    },   

    //TEST 12
    {
        url: '/PostInputData', 
        method: POST, 
        data: {
            WrongKey: 'WrongKey'
        }
    },
    //TEST 13
    {
        url: '/GetAnswer', 
        method: GET, 
        data: {}
    },       

    //TEST 14
    {
        url: '/Stop', 
        method: GET, 
        data: {}
    },    
]

//@test
const runTest = async (testData) => {
    const { url, method, data } = testData

    try {
        const response = await axios({
            url: `${basename}${url}`,
            method,
            data
        })
    
        return response
    }
    catch (e) {
        return e.response
    }
}

(
    async () => {
        const serverRequests = []
        testSet.forEach(testData => serverRequests.push(runTest(testData)))
        
        const responses = await Promise.all(serverRequests)
        responses.forEach((response, i) => {
            console.log(`\n\n@TEST ${i + 1}`)

            console.log('Request', {
                Url: testSet[i].url, 
                Method: testSet[i].method,
                Data: testSet[i].data,
            })
            
            console.log('Response', {
                Status: response.status, 
                Data: response.data                
            })                    
        })

    }
)()
