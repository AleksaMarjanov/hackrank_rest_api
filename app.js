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
// const _ = require('lodash')

const BASE_URL = 'https://jsonmock.hackerrank.com/api/transactions/search?'

// converting input date from Milliseconds to Date
const convertDate = (input) => {
    let date = new Date(input).toLocaleDateString('en-us', {year: "numeric", month: "2-digit"})
    return date.replace('/', '-')
}    

const getUserTransaction = async (uid, txnType, monthYear) => {
    const result = [];
    const totalPages = await axios.get(`${BASE_URL}userId=${uid}&txnType=${txnType}`).then((result) => result.data.total_pages);

    for(let i = 1; i <= totalPages; i++) {
        const results = await axios.get(`${BASE_URL}userId=${uid}&txnType=${txnType}&page=${i}`).then((result) => result.data);

        results?.data?.map((item) => {
            const resultObject = {
                timestamp: convertDate(item.timestamp),
                id: item.id,
                txnType: item.txnType,
                amount: Number(item.amount.replace(/,/, '').replace('$', ''))
            }
            result.push(resultObject);
        })
        
    }
    console.log("REZ");
    let finalResult = []
    const filteredArray = result.filter((item) => item.timestamp == monthYear); 
    const average = filteredArray.reduce((total, {amount}) => total + amount, 0) / filteredArray.length
    console.log(average);

        for(let item of filteredArray ) {
            if( item.amount > average) {
                finalResult.push(item.id)
            }
        }
        console.log(finalResult)
}

// test case
getUserTransaction(4, 'debit', "02-2019")

