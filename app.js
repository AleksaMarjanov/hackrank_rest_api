
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
// import axios from "axios"

// if(typeof window !== document ) {
//     console.log('running in nodejs')
// } else {
//     console.log('running in Browser')
//     const body = document.querySelector('.paragraph')
// }

const BASE_URL = 'https://jsonmock.hackerrank.com/api/transactions/search?userId='

const getUserTransaction = async (uid, txnType, monthYear) => {
    // const result = []
    const { data } = await axios.get(`${BASE_URL}`)
    const fetchedData = data.data
    console.log(fetchedData); 
    fetchedData.map(user => {
            if(user.id === uid) {
                let milliseconds = user.timestamp
                let date = new Date(milliseconds).toLocaleDateString('en-us', {year: "numeric", month: "2-digit"})
                const monthYear = date.replace('/', '-')
                console.log('here is the timestamp', monthYear)
            }   
        })     
        // calculate average spending of the user in the Month year 


    }



// async function main() {
//     const ws = fs.createWriteStream(process.env.OUTPUT_PATH);

//     const uid = parseInt(readLine().trim(), 10);

//     const txnType = readLine();

//     const monthYear = readLine();

//     const result = await getUserTransaction(uid, txnType, monthYear);

//     ws.write(result.join('\n') + '\n');

//     ws.end();
// }
// test case
getUserTransaction(4, 'debit', '02-2019')

// try
        // if(result.length === 0) return -1
        // try {
        //     const response = await axios.get(`${BASE_URL}`)    
        //     let fetchedData = response.data
        //     // console.log(fetchedData)
        // } catch(error) {
        //     console.log(error)
        // } 