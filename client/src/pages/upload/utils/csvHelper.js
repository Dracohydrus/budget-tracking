import dateformat from 'dateformat'

export const csvFileProcess = (fileText, currency = 'CAD', key = 1) => {
    let fileLines = fileText.split(/\n|\r\n|\r/gi)
    var resultTransactions = []
    for (var line in fileLines) {
        let lineContent = fileLines[line].split(',')
        // const { date, description, credit, debit } = processTDDebit(lineContent)
        const { date, description, credit, debit } = processCryptoCredit(lineContent)
        let transactionValue = credit && (Math.abs(Number(credit)) * -1)
        if (!transactionValue) transactionValue = debit && Number(debit)
        if (!transactionValue) continue
        resultTransactions.push({
            key: Number(key) + Number(line),
            description: description,
            currency: currency,
            value: transactionValue.toFixed(2) || 0,
            categories: [],
            transactionDate: dateformat(date, 'yyyy-mm-dd'),
        })
    }
    return resultTransactions;
}

// function processTDDebit(csvLine) {
//     const [date, description, credit, debit] = csvLine
//     return { date, description, credit, debit }
// }

// function processTDCredit(csvLine) {
//     const [date, description, credit] = csvLine
//     return { date, description, credit }
// }

function processCryptoCredit(csvLine) {
    const [date, description, , amount] = csvLine
    let credit = 0
    let debit = 0
    if (amount < 0) credit = amount;
    return { date, description, credit, debit }
}