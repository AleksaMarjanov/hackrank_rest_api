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

const BASE_URL = 'https://jsonmock.hackerrank.com/api/transactions/search?userId='

const convertDate = (input) => {
    // converting input date from Milliseconds to Date
    let milliseconds = input;
    let date = new Date(milliseconds).toLocaleDateString('en-us', {year: "numeric", month: "2-digit"})
    return convertedDate = date.replace('/', '-')
    // [m, y] = input.split("-");
    // return [y, m - 1]

}
const extractObject = (obj, properties ) => {
    return properties.reduce((result, prop) => {
        if(obj.hasOwnProperty(prop)) {
            result[prop] = obj[prop]
        }
        return result
    }, {})
}

const getUserTransaction = async (uid, txnType, monthYear) => {
    let result = []
    let num = 0;
    const {data}  = await axios.get(`${BASE_URL}${uid}`)
    const totalPages = data.total_pages
    for(let i = 0; i < totalPages; i++) {
        num++
        const dataForPages = await axios.get(`${BASE_URL}${uid}&page=${num}`)
        const allDataForUser = dataForPages.data.data
        // let time =  new Date(...convertDate(monthYear));
        // const convertedDate = time.getTime()
        // console.log(convertedDate)
        // console.log(allDataForUser)
        // const extracted = allDataForUser.filter((obj) => {
        //     return obj.txnType === 'debit';
        // })
        const extractedArray = allDataForUser.map((item) => {
            return extractObject(item, ['txnType', 'timestamp', 'amount' ])
        })
        // console.log(extractTransactionAndTimestamp)
        const filteredArray = extractedArray.filter(item => item.txnType === txnType)
        console.log(filteredArray)
        // const exactTime = filteredArray.map((time) => {
        //     return time.timestamp === convertedDate
        // })
            // console.log(exactTime)
        // console.log(mappedArray)
        // // console.log(extractedArray)
        // const debitAndTimestamp = extractedArray.find(transaction => transaction.txnType === 'debit')
        // const result = debitAndTimestamp['debit']
        // console.log(debitAndTimestamp)
        
    }}

// test case
getUserTransaction(4, 'debit', '02-2019')

