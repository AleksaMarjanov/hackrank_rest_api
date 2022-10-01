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
        const mappedArray = allDataForUser.map((itemInObj) => {
            const timestamp = convertDate(itemInObj.timestamp)
            return {...itemInObj, timestamp}
        })
        const extractedArray = mappedArray.map((item) => {
            return extractObject(item, ['txnType', 'timestamp', 'amount' ])
        })
        const filteredByTxn = extractedArray.filter(item => item.txnType === txnType)
        const filteredByTimestamp = filteredByTxn.filter(item => item.timestamp === monthYear)  
        console.log(filteredByTimestamp)
    }}

// test case
getUserTransaction(4, 'debit', '02-2019')

