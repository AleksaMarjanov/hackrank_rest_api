
// 'use strict';

// const fs = require('fs');

// process.stdin.resume();
// process.stdin.setEncoding('utf-8');

// let inputString = '';
// let currentLine = 0;

// process.stdin.on('data', function(inputStdin) {
//     inputString += inputStdin;
// });

// process.stdin.on('end', function() {
//     inputString = inputString.split('\n');

//     main();
// });

// function readLine() {
//     return inputString[currentLine++];
// }


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
    // const result = []
    const { data } = await axios.get(`${BASE_URL}${uid}`)
    const fetchedData = data.data
    console.log(fetchedData); 




    // fetchedData.filter(user => {
    //             user.monthYear;
    //             let milliseconds = user.timestamp
    //             let date = new Date(milliseconds).toLocaleDateString('en-us', {year: "numeric", month: "2-digit"})
    //             const monthYear = date.replace('/', '-')
    //             console.log('here is the timestamp', monthYear)
    //     })     
        // calculate average spending of the user in the Month year 
    }

// test case
getUserTransaction(4, 'debit', '02-2019')

