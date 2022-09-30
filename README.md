# rivet_hackrank_interview
REST API challenge

### In this challenge, uSE HTTP GET method to retrieve infromation from a database of credit card transactions for users, Query https://jsonmock.hackerrank.com/api/transactions/search?userId=

The query response from the API is a JSON response with the following five fields:
-page: the current page
-per_page: the maximum number of results per page
-total: total number of records in the serach result
-total_pages: the total number of pages which must be queried to get all the results
-data: an array of JSON objects that constains transaction records

Function desc:
Complete the function getUserTransactions in the editor below.
getUserTransations has the following parametar(s):
int uid: the id for which records will be fetched, matched with user.id in the returned response from the API
string txnType: the transation type for which the recorsd will be filtered 
string monthYear: the month and year for which the records will be filtered in the format MM-YYYY
Returns:
int[]: an array of ids containing the records matching the above criteria and sorted ascending. If no records are matched, return [-1]


