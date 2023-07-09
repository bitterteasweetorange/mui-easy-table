import type { Meta } from '@storybook/react'
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
