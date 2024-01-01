import { CheckOutlined, ClearRounded } from '@mui/icons-material'
import type { Meta } from '@storybook/react'
import { useState } from 'react'
import { EasyFilter } from '.'

const meta = {
  title: 'component/EasyFilter',
  component: EasyFilter,
} satisfies Meta<typeof EasyFilter>

export default meta

export const Boolean = () => {
  const [value, onChange] = useState<boolean[]>([false])
  return (
    <EasyFilter<boolean>
      value={value}
      onChange={onChange}
      filterSetting={{
        type: 'singleSelect',
        options: [
          {
            value: true,
            label: <CheckOutlined color="success"></CheckOutlined>,
          },
          {
            value: false,
            label: <ClearRounded color="error" />,
          },
        ],
      }}
    ></EasyFilter>
  )
}

type B = 'a' | 'b' | 'c'
export const Select = () => {
  const [value, onChange] = useState<B[]>(['a'])
  return (
    <EasyFilter<B>
      value={value}
      onChange={onChange}
      filterSetting={{
        type: 'multiSelect',
        options: [
          {
            value: 'a',
            label: 'a',
          },
          {
            value: 'b',
            label: 'b',
          },
          {
            value: 'c',
            label: 'c',
          },
        ],
      }}
    ></EasyFilter>
  )
}
