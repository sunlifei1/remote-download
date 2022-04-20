const fs = require('fs')
const request = require('request')

/**
 * 下载文件并写入本地磁盘
 * @param fileLink  文件URL地址
 * @param filePath  文件路径,如: c:xx/xx.jpg
 */
function getFile(fileLink, filePath) {
    if (fileLink ?? '' !== '') {
        return new Promise(resolve => {
            request({
                url: fileLink,
                method: 'GET', // 根据实际情况改变请求方式
                encoding: null
            }, (err, response, body) => {
                if (!err && response.statusCode === 200) {
                    fs.writeFileSync(filePath, body, { encoding: "binary" })
                    resolve(filePath)
                } else {
                    reject(err)
                }
            })
        })
    }
}
getFile("https://downk.psieaxy.com/dl.php?NjczZWFYTFJTdzlBTGU3QTdLVDJKU014eTNLbnBNQUlWbVBUelF4STVRaFlWcFhSSmFBbEZGZXZFY0R2cmZUeE85TUxvY0tSTEwxNlRwdmVDcVdkSEVEOFZaOWJ0U3Z5WUMwQkwzQmFHSjRybnJHUEduTXlRbDRSK211cEd3KzhDUWZKV0lFR2lQQ3lReUlSVzBKRlR0Mktlb2NZMmZzSUtIdEU2a2JTVjJHVGt2MUV5bHgyaXhuY2N2VXhVRUNPWWVPVlZPSDA5Mmtzanp2Nk0rNC9acHZBKzVVaFZWZlFkT1lYUU02RDB2OWY3SStQVVB3", "C:/project/remote-download/test.txt")