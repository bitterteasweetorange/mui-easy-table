import { faker } from '@faker-js/faker'
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
  money: number | null
}

export const mockData: MockShape[] = new Array(100)
  .fill(null)
  .map((_, index) => {
    faker.seed(index)
    return {
      id: index,
      name: {
        lastName: faker.person.lastName(),
        firstName: faker.person.firstName(),
      },
      money: faker.number.int({
        min: 1000,
        max: 20000,
      }),
    }
  })

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
    render: (value: MockShape['name']) =>
      (value.firstName || '') + ' ' + value.lastName,
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
      color="success"
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
      color="error"
      onClick={(e) => {
        e.stopPropagation()
        useTableReturn.handleData.delete(index)
      }}
    >
      <DeleteForeverOutlined />
    </IconButton>
  )
}
