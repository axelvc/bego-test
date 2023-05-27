function getLocale() {
  return navigator.languages?.[0] || navigator.language
}

const makeFormatter = (defaultOpts: Intl.DateTimeFormatOptions) => {
  return (date: number | Date, options: Intl.DateTimeFormatOptions = {}) => {
    return new Intl.DateTimeFormat(getLocale(), { ...defaultOpts, ...options }).format(date)
  }
}

export const formatDate = makeFormatter({ dateStyle: 'long' })
export const formatTime = makeFormatter({ hour: 'numeric', minute: 'numeric', hourCycle: 'h12' })
