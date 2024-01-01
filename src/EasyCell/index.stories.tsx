import type { Meta } from '@storybook/react'
import { BODY_HEIGHT } from '../EasyCell'

const meta = {
  title: 'component/EasyCell',
  component: EasyCell,
} satisfies Meta<typeof EasyCell>

export default meta

export const Defalut = () => {
  return (
    <EasyCell height={BODY_HEIGHT}>
      height is 52, includes bottom border
    </EasyCell>
  )
}

export const AlignRight = () => {
  return (
    <EasyCell
      align="right"
      height={BODY_HEIGHT}
    >
      align right
    </EasyCell>
  )
}

export const TopBorder = () => {
  return (
    <EasyCell
      cellBorder="top"
      height={BODY_HEIGHT}
    >
      height is 52
    </EasyCell>
  )
}
