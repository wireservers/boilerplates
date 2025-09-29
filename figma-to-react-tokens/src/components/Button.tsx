import { ButtonHTMLAttributes } from 'react'
export function Button(props: ButtonHTMLAttributes<HTMLButtonElement>){ return <button className='ws-btn' {...props} /> }