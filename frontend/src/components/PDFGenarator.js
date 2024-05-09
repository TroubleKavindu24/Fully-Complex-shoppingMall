import jsPDF from 'jspdf'
import autoTable from 'jspdf-autotable'

const geanaratePDF =  (data, columns, name) => {
    data = data.map(item => {
        return Object.values(item)
    })
    console.log(data)

    const doc = new jsPDF()
    doc.setFontSize(12) 
    autoTable(doc, {
        head: [columns],
        body: data,
        didDrawPage: function (data) {
            doc.setFontSize(12)
            doc.text('Page ' + data.pageCount, 180, 285)
        }
    })
    doc.save(name + 'report.pdf')
}

export default geanaratePDF;