import { PropsWithChildren } from 'react'

export type ButtonProps = PropsWithChildren<{
  /**
   * The color of the button
   * @default 'primary'
   * */
  variant?: 'primary' | 'secondary'
}>
export function Button(props: ButtonProps) {
  return (
    <button>
      {props.children}
      {props.variant}
    </button>
  )
}
