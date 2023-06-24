import { DeleteForeverOutlined, UpdateOutlined } from '@mui/icons-material'
import { IconButton } from '@mui/material'
import { useContext } from 'react'
import { EasyColumnProps } from '../EasyTable'
import { EasyTableContext } from '../Provider'

export type MockShape = {
  id: number
  name: {
    lastName: string
    firstName: string | null
  }
  age: number | null
  money: number | null
}

export const mockData: MockShape[] = [
  { id: 1, name: { lastName: 'Snow', firstName: 'Jon' }, money: 20000, age: 35 },
  { id: 2, name: { lastName: 'Lannister', firstName: 'Cersei' }, money: 1000, age: 42 },
  { id: 3, name: { lastName: 'Lannister', firstName: 'Jaime' }, money: 2000, age: 45 },
  { id: 4, name: { lastName: 'Stark', firstName: 'Arya' }, money: 3000, age: 16 },
  { id: 5, name: { lastName: 'Targaryen', firstName: 'Daenerys' }, money: 4000, age: null },
  { id: 6, name: { lastName: 'Melisandre', firstName: null }, money: 5000, age: 150 },
  { id: 7, name: { lastName: 'Clifford', firstName: 'Ferrara' }, money: 6000, age: 44 },
  { id: 8, name: { lastName: 'Frances', firstName: 'Rossini' }, money: null, age: 36 },
  { id: 9, name: { lastName: 'Roxie', firstName: 'Harvey' }, money: 20000000, age: 65 },
]

export const columns: EasyColumnProps<MockShape>[] = [
  {
    path: 'id',
    headerName: 'ID',
    width: 150,
  },
  {
    path: 'name',
    width: 300,
    headerName: 'Name',
    render: (value: MockShape['name']) => (value.firstName || '') + ' ' + value.lastName,
  },
  {
    path: 'name.lastName',
    width: 200,
    headerName: 'LastName',
  },
  {
    path: 'name.firstName',
    width: 200,
    headerName: 'FirstName',
  },
  {
    path: 'age',
    headerName: 'Age',
    align: 'right',
    sortable: true,
    sum: true,
  },
  {
    path: 'money',
    headerName: 'Money',
    align: 'right',
    render: 'money',
    sortable: true,
    sum: true,
  },
  {
    path: 'actions',
    headerName: 'Actions',
    render: (_, row, index) => (
      <>
        <UpdateRow row={row} index={index} />
        <DeleteRow index={index} />
      </>
    ),
  },
]

function UpdateRow({ index, row }: { row: MockShape; index: number }) {
  const useTableReturn = useContext(EasyTableContext)

  return (
    <IconButton
      color='success'
      onClick={(e) => {
        e.stopPropagation()
        useTableReturn.handleData.update(index, { ...row, age: Date.now() })
      }}
    >
      <UpdateOutlined />
    </IconButton>
  )
}

function DeleteRow({ index }: { index: number }) {
  const useTableReturn = useContext(EasyTableContext)

  return (
    <IconButton
      color='error'
      onClick={(e) => {
        e.stopPropagation()
        useTableReturn.handleData.delete(index)
      }}
    >
      <DeleteForeverOutlined />
    </IconButton>
  )
}
