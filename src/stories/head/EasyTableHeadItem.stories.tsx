import { Meta, StoryObj } from '@storybook/react'
import React, { useState } from 'react'
import { EasyTableHeadItem } from '../../head/EasyTableHeadItem'

const meta = {
  title: 'head/EasyTableHeadItem',
  component: EasyTableHeadItem,
} satisfies Meta<typeof EasyTableHeadItem>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    headerName: 'ID',
    width: 100,
  },
}

export const AlignRight: Story = {
  args: {
    headerName: 'ID',
    width: 100,
    align: 'right',
  },
}

export const Setting: Story = {
  args: {
    headerName: 'ID',
    width: 100,
    showSettingIcon: true,
  },
}

export const Sortable = () => {
  const [sort, setSort] = React.useState<'asc' | 'desc' | 'none'>('asc')
  return (
    <EasyTableHeadItem
      headerName='ID'
      width={100}
      sortIO={{
        value: sort,
        onChange: setSort,
      }}
      onWidthChange={undefined}
    />
  )
}

export const Resize = () => {
  const [width, setWidth] = React.useState<number>(100)
  const [hover, setHover] = useState(false)
  return (
    <EasyTableHeadItem
      showResizeIcon={hover}
      onMouseEnter={() => {
        setHover(true)
      }}
      onMouseLeave={() => {
        setHover(false)
      }}
      headerName='ID'
      width={width}
      onWidthChange={setWidth}
    />
  )
}
