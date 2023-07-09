import { ViewWeekRounded } from '@mui/icons-material'
import { Button } from '@mui/material'
import type { Meta } from '@storybook/react'
import React from 'react'
import { useIO } from 'react-utils-ts'
import { ColumnManage } from '../ColumnManage'
import { EasyTable } from '../EasyTable'
import { useTable } from '../useTable'
import { MockShape, columns, defaultColumnState, mockData } from './mock'

const meta = {
  title: 'EasyTable',
  component: EasyTable,
} satisfies Meta<typeof EasyTable>

export default meta

export const Defalut = () => {
  const useTableReturn = useTable<MockShape, Record<string, any>>({
    rawData: mockData,
    rowKeyPath: 'id',
    defaultSelected: [mockData[0], mockData[2]],
    getRowDisabled: (row) => row.id === 2 || row.id === 3,
    defaultColumnState,
  })

  const { selected } = useTableReturn
  return (
    <>
      <EasyTable<MockShape>
        setting
        height={`calc(100vh - 120px)`}
        selectionMode="multiple"
        useTableReturn={useTableReturn}
        columns={columns}
        isRowEqual={(a, b) => a.id === b.id}
      />
      {selected.length} selected:
      {selected.map((user) => user.name.firstName).join(', ')}
    </>
  )
}

export const SingleSelected = () => {
  const useTableReturn = useTable<MockShape, Record<string, any>>({
    rowKeyPath: 'id',
    rawData: mockData,
    defaultSelected: [mockData[0]],
    defaultColumnState,
  })

  return (
    <EasyTable<MockShape>
      height="calc(100vh - 34px)"
      useTableReturn={useTableReturn}
      columns={columns}
      selectionMode="single"
    />
  )
}

export const CustomColumnManage = () => {
  const openIO = useIO(false)
  const anchorRef = React.useRef<HTMLButtonElement>(null)

  const useTableReturn = useTable<MockShape, Record<string, any>>({
    rawData: mockData,
    rowKeyPath: 'id',
    defaultSelected: [mockData[0], mockData[2]],
    getRowDisabled: (row) => row.id === 2 || row.id === 3,
    defaultColumnState,
  })

  const { columnState } = useTableReturn
  const hideColumnsLength = columnState.filter((col) => col.hidden).length

  return (
    <>
      <Button
        variant={hideColumnsLength ? 'contained' : 'outlined'}
        onClick={() => {
          openIO.onChange((state) => !state)
        }}
        ref={anchorRef}
        startIcon={<ViewWeekRounded />}
      >
        Columns
      </Button>
      <ColumnManage
        columns={columns}
        openIO={openIO}
        anchorRef={anchorRef}
        {...useTableReturn}
      />
      <EasyTable<MockShape>
        setting
        height={`calc(100vh - 120px)`}
        selectionMode="multiple"
        useTableReturn={useTableReturn}
        columns={columns}
        isRowEqual={(a, b) => a.id === b.id}
      />
    </>
  )
}
