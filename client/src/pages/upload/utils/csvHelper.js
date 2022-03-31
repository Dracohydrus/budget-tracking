import dateformat from 'dateformat'

export const csvFileProcess = (fileText, currency = 'CAD', key = 1, parsingValues) => {
    let fileLines = fileText.split(/\n|\r\n|\r/gi)
    var resultTransactions = []
    for (var line in fileLines) {
        let lineContent = fileLines[line].split(',')
        const { date, description, credit, debit } = genericCSVProcess(lineContent, parsingValues)
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

function genericCSVProcess(csvLine, parsingValues) {
    let results = {}
    parsingValues.forEach(data => {
        let csvIndex = data.index - 1
        if (!data.index || !data.value) return
        if (!csvLine[csvIndex]) return
        if (data.value === 'both') {
            if (csvLine[csvIndex] < 0) return results['credit'] = csvLine[csvIndex]
            return results['debit'] = csvLine[csvIndex]
        }
        if (data.value === 'transactionDate') {
            results['date'] = csvLine[csvIndex]
            return
        }
        results[data.value] = csvLine[csvIndex]
    })
    return results
}