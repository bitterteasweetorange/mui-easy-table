import type { Meta } from '@storybook/react'
import { useState } from 'react'
import { EasyHeadCell } from '.'

const meta = {
  title: 'component/EasyHeadCell',
  component: EasyHeadCell,
} satisfies Meta<typeof EasyHeadCell>

export default meta

export const Defalut = () => {
  return (
    <EasyHeadCell width={200}>
      height is 56, includes bottom border
    </EasyHeadCell>
  )
}

export const AlignRight = () => {
  return (
    <EasyHeadCell
      width={200}
      align="right"
    >
      align right
    </EasyHeadCell>
  )
}

export const Setting = () => {
  return (
    <EasyHeadCell
      width={200}
      showSettingIcon
      onHideColumn={() => {
        alert('hide column')
      }}
    >
      show setting icon on hover
    </EasyHeadCell>
  )
}

export const Sortable = () => {
  const [sort, setSort] = useState<'asc' | 'desc' | 'none'>('asc')
  return (
    <EasyHeadCell
      width={200}
      sortIO={{
        value: sort,
        onChange: setSort,
      }}
    >
      sort
    </EasyHeadCell>
  )
}

export const Resize = () => {
  const [width, setWidth] = useState<number>(100)
  return (
    <EasyHeadCell
      width={width}
      onWidthChange={setWidth}
    >
      resize me
    </EasyHeadCell>
  )
}

export const Filter = () => {
  const [filter, setFilter] = useState<('a' | 'b' | 'c')[]>([])
  return (
    <EasyHeadCell
      width={200}
      filterIO={{
        value: filter,
        onChange: setFilter,
        filterSetting: {
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
        },
      }}
    >
      sort
    </EasyHeadCell>
  )
}
