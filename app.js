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

const getUserTransaction = async (uid, txnType, monthYear) => {
    let num = 0;
    const {data}  = await axios.get(`${BASE_URL}${uid}`)
    const fetchedData = data.data
    const totalPages = data.total_pages
    for(let i = 0; i < totalPages; i++) {
        num++
        const dataForPages = await axios.get(`${BASE_URL}${uid}&page=${num}`)
        const allDataForUser = dataForPages.data.data
        // console.log('fetched data for total pages', allDataForUser)
        // const filteredAllUserData = allDataForUser.filter(user => {
        //     user.timestamp === monthYear
        //     let milliseconds =  user.timestamp
        //     let date = new Date(milliseconds).toLocaleDateString('en-us', {year: "numeric", month: "2-digit"})
        //     const userMonthInput = date.replace('/', '-')
        //     // console.log(userMonthInput)
        // })
        // console.log(filteredAllUserData)
        
    }
        // calculate average spending of the user in the Month year 
    }

// test case
getUserTransaction(4, 'debit', '02-2019')

