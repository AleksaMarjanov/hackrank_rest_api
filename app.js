/*
 * Complete the 'getUserTransaction' function below.
 *
 * The function is expected to return an INTEGER_ARRAY.
 * The function accepts following parameters:
 *  1. INTEGER uid
 *  2. STRING txnType
 *  3. STRING monthYear
 *
 *  https://jsonmock.hackerrank.com/api/transactions/search?userId=
 */

const axios = require('axios');
const { curry } = require('lodash');

const BASE_URL = 'https://jsonmock.hackerrank.com/api/transactions/search?userId='

const convertDate = (input) => {
    // converting input date from Milliseconds to Date
    let milliseconds = input;
    let date = new Date(milliseconds).toLocaleDateString('en-us', {year: "numeric", month: "2-digit"})
    return convertedDate = date.replace('/', '-')
    // [m, y] = input.split("-");
    // return [y, m - 1]

}
// Solution 2
// helper function for extracting data from object in array
// const extractObject = (obj, properties ) => {
//     return properties.reduce((result, prop) => {
//         if(obj.hasOwnProperty(prop)) {
//             result[prop] = obj[prop]
//         }
//         return result
//     }, {})
// }

const getUserTransaction = async (uid, txnType, monthYear) => {
    let result = []
    let num = 0;
    const {data}  = await axios.get(`${BASE_URL}${uid}`)
    const totalPages = data.total_pages
    for(let i = 0; i < totalPages; i++) {
        num++
        const dataForPages = await axios.get(`${BASE_URL}${uid}&page=${num}`)
        const allDataForUserId = dataForPages.data.data
        const mappedArray = allDataForUserId.map((item) => {
            const timestamp = convertDate(item.timestamp)
            const id = item.id
            const amountNoComm = item.amount.replace(/,/, '');
            const amountNo$ = amountNoComm.replace('$', '')
            const amount = Number(amountNo$)
            const txnType = item.txnType
            return {id, amount, txnType, timestamp}
        })
        //  console.log(results)
        // Solution 2
        // console.log(mappedArray)
        // const extractedArray = mappedArray.map((item) => {
        //     return extractObject(item, ['txnType', 'timestamp', 'amount' ])
        // })
        const filteredByTxn = mappedArray.filter(item => item.txnType === txnType)
        const filteredByTimestamp = filteredByTxn.filter(item => item.timestamp === monthYear)
        // console.log(filteredByTimestamp)
        const average = filteredByTimestamp.reduce((total, next) => total + next.amount, 0) / filteredByTimestamp.length;
        // console.log(average)
        // const averageMonthlySpending = filteredByTimestamp.reduce((total, item) => (total + item.amount) / filteredByTimestamp.length, 0)
        // console.log(averageMonthlySpending)
        for ( let item of filteredByTimestamp) {
            if(item.amount > average ) {
                result.push(item.id)
                console.log(result)
            }
        }
    }
    
}


// test case
getUserTransaction(4, 'debit', '02-2019')

