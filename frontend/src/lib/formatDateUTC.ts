export const formatDateUTC = (date: string | Date) => {
    const format: string = 'dd/MM/yyyy HH:mm:ss'

    const d = new Date(date)

    const day = d.getUTCDate().toString().padStart(2, '0')
    const month = (d.getUTCMonth() + 1).toString().padStart(2, '0')
    const year = d.getUTCFullYear().toString()
    const hours = d.getUTCHours().toString().padStart(2, '0')
    const minutes = d.getUTCMinutes().toString().padStart(2, '0')
    const seconds = d.getUTCSeconds().toString().padStart(2, '0')

    return format
        .replace('dd', day)
        .replace('MM', month)
        .replace('yyyy', year)
        .replace('HH', hours)
        .replace('mm', minutes)
        .replace('ss', seconds)
}