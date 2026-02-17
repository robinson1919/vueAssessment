import moment from 'moment';

export function formatDate(date) {
    if(!date) return 'N/A'
    return moment(date).format('MM-DD-YYYY h:mm a');
}