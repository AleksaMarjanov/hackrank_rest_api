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
    // let milliseconds = input;
    // let date = new Date(milliseconds).toLocaleDateString('en-us', {year: "numeric", month: "2-digit"})
    // return convertedDate = date.replace('/', '-')
    [m, y] = input.split("-");
    return [y, m - 1]

}

const getUserTransaction = async (uid, txnType, monthYear) => {
    let num = 0;
    const {data}  = await axios.get(`${BASE_URL}${uid}`)
    // const fetchedData = data.data
    const totalPages = data.total_pages
    for(let i = 0; i < totalPages; i++) {
        num++
        const dataForPages = await axios.get(`${BASE_URL}${uid}&page=${num}`)
        const allDataForUser = dataForPages.data.data
        let time =  new Date(...convertDate(monthYear));
        const convertedDate = time.getTime()
        // convert user input for monthYear example: 02-2019 to milliseconds
        let transaction = txnType;
        console.log(convertedDate)
        const monthYearRequested = allDataForUser.findIndex((date) => date.transaction == 'debit')
        console.log(monthYearRequested)
        // const filteredAllUserData = allDataForUser.filter(date => {
        //     date.timestamp = convertedDate
        // })
        // console.log(filteredAllUserData)
        
    }
        // calculate average spending of the user in the Month year 
    }

// test case
getUserTransaction(4, 'debit', '02-2019')

