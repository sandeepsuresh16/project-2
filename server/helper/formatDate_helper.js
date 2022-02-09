function format(date){
    let day = date.getDate()
    let month = date.getMonth()+1
    let year = date.getFullYear()

    return ""+year+"-"+(month<=9?"0"+month:month)+"-"+(day<=9?"0"+day:day)
}

module.exports = format;