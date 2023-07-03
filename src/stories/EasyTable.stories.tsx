import { Button } from '@mui/material'
import type { Meta } from '@storybook/react'
import { EasyTable } from '../EasyTable'
import { useTable } from '../useTable'
import { MockShape, columns, mockData } from './mock'

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
  })

  const { selected } = useTableReturn
  return (
    <>
      <Button
        variant="outlined"
        onClick={() => {
          alert(JSON.stringify(selected))
        }}
      >
        {selected.length} selected
      </Button>
      <EasyTable<MockShape>
        height={`calc(100vh - ${34 + 37}px)`}
        selectionMode="multiple"
        useTableReturn={useTableReturn}
        columns={columns}
        isRowEqual={(a, b) => a.id === b.id}
      />
    </>
  )
}

export const SingleSelected = () => {
  const useTableReturn = useTable<MockShape, Record<string, any>>({
    rowKeyPath: 'id',
    rawData: mockData,
    defaultSelected: [mockData[0]],
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
