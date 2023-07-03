import { Button, Typography } from '@mui/material'
import type { Meta } from '@storybook/react'
import { useIO } from 'react-utils-ts'
import { EasyTable } from '../EasyTable'
import { EasyTableProvider } from '../Provider'
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
  })

  return (
    <EasyTable<MockShape>
      height="calc(100vh - 34px)"
      selectionMode="multiple"
      useTableReturn={useTableReturn}
      columns={columns}
      isRowEqual={(a, b) => a.id === b.id}
    />
  )
}

export const Operation = () => {
  const io = useIO(mockData)
  const useTableReturn = useTable<MockShape, Record<string, any>>({
    rawData: io.value,
    rowKeyPath: 'id',
  })

  const { selected, handleData, data } = useTableReturn
  const { add: addRow, delete: deleteRow, update: updateRow } = handleData

  return (
    <>
      <Button
        onClick={() => {
          console.log(selected)
        }}
      >
        selected
      </Button>
      <Button
        onClick={() => {
          io.onChange([
            {
              id: 100000,
              money: 10000,
              name: {
                lastName: 'Doe',
                firstName: 'John',
              },
            },
          ])
        }}
      >
        toggle data
      </Button>
      <Button
        onClick={() => {
          addRow({
            id: Date.now(),
            money: 10000,
            name: {
              firstName: 'John',
              lastName: 'Doe',
            },
          })
        }}
      >
        add
      </Button>
      <Button
        onClick={() => {
          deleteRow(0)
        }}
      >
        delete first
      </Button>
      <Button
        onClick={() => {
          const first = data?.[0]
          if (first) {
            updateRow(0, { ...first })
          }
        }}
      >
        update first row{"'"}s age
      </Button>
      <EasyTableProvider value={useTableReturn}>
        <EasyTable<MockShape>
          height="300px"
          selectionMode="multiple"
          useTableReturn={useTableReturn}
          columns={columns}
        />
      </EasyTableProvider>
    </>
  )
}

export const Disabled = () => {
  const useTableReturn = useTable<MockShape, Record<string, any>>({
    rawData: mockData,
    defaultSelected: [mockData[0], mockData[2]],
    getRowDisabled: (row) =>
      row.id === 2 || row.name.firstName === 'Melisandre',
    rowKeyPath: 'id',
  })

  const { selected } = useTableReturn
  return (
    <>
      <EasyTableProvider value={useTableReturn}>
        <EasyTable<MockShape>
          useTableReturn={useTableReturn}
          columns={columns}
          selectionMode="multiple"
        />
      </EasyTableProvider>
      <Button>{selected.length} selected</Button>
    </>
  )
}

export const SingleSelected = () => {
  const useTableReturn = useTable<MockShape, Record<string, any>>({
    rowKeyPath: 'id',
    rawData: mockData,
    defaultSelected: [mockData[0]],
  })

  const { selected } = useTableReturn
  return (
    <>
      <EasyTableProvider value={useTableReturn}>
        <EasyTable<MockShape>
          useTableReturn={useTableReturn}
          columns={columns}
          selectionMode="single"
        />
      </EasyTableProvider>
      <Typography>selected: {selected?.[0]?.name.lastName}</Typography>
    </>
  )
}
