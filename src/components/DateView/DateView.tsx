import { ReactNode } from 'react'

interface Props {
  timestamp: number
  children?: ReactNode
  className?: string
}

export default function Time({ timestamp, children, className }: Props) {
  const date = new Date(timestamp)

  return (
    <time dateTime={date.toISOString()} className={className}>
      {children}
    </time>
  )
}
