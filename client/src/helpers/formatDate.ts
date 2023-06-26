import { format } from 'date-fns'

export default function formatDate(date: string) {
  return format(new Date(date), 'MMMM d, yyyy')
}
