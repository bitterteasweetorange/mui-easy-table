import { Sex, faker } from '@faker-js/faker'
import { FemaleOutlined, MaleOutlined } from '@mui/icons-material'
import { LoadingButton } from '@mui/lab'
import { Tooltip } from '@mui/material'
import React from 'react'
import { EasyColumnProps } from '../EasyTable'
import { UseTableReturn } from '../useTable'

export type MockShape = {
  id: number
  name: {
    lastName: string
    firstName: string | null
  }
  money: number | null
  gender: 'female' | 'male'
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
      gender: faker.person.sexType(),
    }
  })

export const columns: EasyColumnProps<MockShape>[] = [
  {
    path: 'id',
    headerName: 'ID',
    width: 150,
  },
  {
    path: 'name.firstName',
    width: 200,
    headerName: 'FirstName',
  },
  {
    path: 'name.lastName',
    width: 200,
    headerName: 'LastName',
  },
  {
    path: 'gender',
    width: 80,
    headerName: 'Gender',
    render: (val: Sex) => {
      return val === 'female' ? (
        <FemaleOutlined color="success" />
      ) : (
        <MaleOutlined color="warning" />
      )
    },
  },
  {
    path: 'name',
    width: 500,
    headerName: 'Name',
    render: (value: MockShape['name']) =>
      (value.firstName || '') + ' ' + value.lastName,
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
    width: 250,
    headerName: 'Actions',
    align: 'right',
    render: (_, row, index, useTableReturn) => (
      <>
        <UpdateRow
          updateRecord={useTableReturn.handleData.update}
          row={row}
          index={index}
        />
        <DeleteRow
          deleteRecord={useTableReturn.handleData.delete}
          index={index}
        />
      </>
    ),
  },
]

function UpdateRow({
  index,
  row,
  updateRecord,
}: {
  updateRecord: UseTableReturn<MockShape>['handleData']['update']
  row: MockShape
  index: number
}) {
  const [loading, setLoading] = React.useState(false)
  return (
    <LoadingButton
      loading={loading}
      color="success"
      onClick={async (e) => {
        e.stopPropagation()
        setLoading(true)
        await sleep(1000)
        setLoading(false)
        updateRecord(index, {
          ...row,
          name: {
            firstName: 'Momo',
            lastName: row.name.lastName,
          },
        })
      }}
    >
      update
    </LoadingButton>
  )
}

function DeleteRow({
  index,
  deleteRecord,
}: {
  deleteRecord: UseTableReturn<MockShape>['handleData']['delete']
  index: number
}) {
  const [loading, setLoading] = React.useState(false)
  return (
    <Tooltip title="delete this record">
      <LoadingButton
        loading={loading}
        color="warning"
        onClick={async (e) => {
          e.stopPropagation()
          setLoading(true)
          await sleep(1000)
          setLoading(false)
          deleteRecord(index)
        }}
      >
        delete
      </LoadingButton>
    </Tooltip>
  )
}

function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms))
}
