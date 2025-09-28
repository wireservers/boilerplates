
import { ButtonHTMLAttributes } from 'react'
import clsx from 'clsx'

export function Button({ className, ...props }: ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      className={clsx('ws-btn', className)}
      style={{
        padding: '8px 12px',
        borderRadius: '12px',
        border: '1px solid rgba(0,0,0,0.1)',
        background: 'transparent',
        cursor: 'pointer'
      }}
      {...props}
    />
  )
}
