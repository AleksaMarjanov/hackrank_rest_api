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
const axios = require("axios");

const BASE_URL = "https://jsonmock.hackerrank.com/api/transactions/search?";

const convertDate = (input) => {
  let date = new Date(input).toLocaleDateString("en-us", {
    year: "numeric",
    month: "2-digit",
  });
  return date.replace("/", "-"); 
};

const getUserTransaction = async (uid, txnType, monthYear) => {
  const firstResults = [];
  const totalPages = await axios
    .get(`${BASE_URL}userId=${uid}&txnType=${txnType}`)
    .then((response) => response.data.total_pages);

  if (totalPages === 0) {
    console.log('Test has failed')
    return [-1];
  } else {
    for (let i = 1; i <= totalPages; i++) {
      const response = await axios
        .get(`${BASE_URL}userId=${uid}&txnType=${txnType}&page=${i}`)
        .then((response) => response.data);

      response?.data?.map((item) => {
        const object = {
          timestamp: convertDate(item.timestamp),
          id: item.id,
          txnType: item.txnType,
          amount: Number(item.amount.replace(/,/, "").replace("$", "")),
        };
        firstResults.push(object);
      });
    }
    let finalResult = [];
    const filteredArray = firstResults.filter(
      (item) => item.timestamp == monthYear
    );

    console.log(filteredArray)
    const average =
    filteredArray.reduce((total, { amount }) => total + amount, 0) /
    filteredArray.length;
    for (var i = 0; i < filteredArray.length; i++) {
        if (filteredArray[i].amount > average) {
            finalResult.push(filteredArray[i].id);
        }
    }
    finalResult.sort((a, b) => {
        return a - b;
    });
    console.log(finalResult)
    return finalResult;
  }
};

getUserTransaction(4, "debit", '02-2019');
