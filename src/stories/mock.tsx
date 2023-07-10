import { Sex, faker } from '@faker-js/faker'
import {
  DeleteOutline,
  EditOutlined,
  FemaleOutlined,
  MaleOutlined,
} from '@mui/icons-material'
import { LoadingButton } from '@mui/lab'
import { IconButton, Tooltip } from '@mui/material'
import React from 'react'
import { EasyColumnProps } from '../EasyTable'
import { DefaultColumnItemState, UseTableReturn } from '../useTable'

export type MockShape = {
  id: number
  name: {
    lastName: string
    firstName: string | null
  }
  money: number | null
  gender: MockGender
}

export type MockGender = 'female' | 'male'

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

export const defaultColumnState: DefaultColumnItemState<MockShape>[] = [
  {
    path: 'id',
  },
  {
    path: 'name.firstName',
    width: 200,
  },
  {
    path: 'gender',
  },
  {
    path: 'money',
    width: 150,
  },
  {
    path: 'name',
    width: 800,
  },
  {
    path: 'name.lastName',
    hidden: true,
    width: 200,
  },
  {
    path: 'actions',
    width: 150,
  },
]

export type MockFilter = {
  // firstname / lastname
  search?: string
  gender?: MockGender
}

export const columns: EasyColumnProps<MockShape, MockFilter>[] = [
  {
    path: 'id',
    headerName: 'ID',
  },
  {
    path: 'name.firstName',
    headerName: 'FirstName',
  },
  {
    path: 'gender',
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
    path: 'money',
    headerName: 'Money',
    align: 'right',
    render: 'money',
    sortable: true,
    sum: true,
  },
  {
    path: 'name',
    headerName: 'Name',
    render: (value: MockShape['name']) =>
      (value.firstName || '') + ' ' + value.lastName,
  },
  {
    path: 'name.lastName',
    headerName: 'LastName',
  },
  {
    path: 'actions',
    headerName: 'Actions',
    align: 'right',
    render: (_, row, index, useTableReturn) =>
      index !== 1 && (
        <>
          <UpdateRow
            disabled={index === 0}
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
  disabled,
}: {
  updateRecord: UseTableReturn<MockShape, MockFilter>['handleData']['update']
  row: MockShape
  index: number
  disabled?: boolean
}) {
  const [loading, setLoading] = React.useState(false)
  return loading ? (
    <LoadingButton loading></LoadingButton>
  ) : (
    <Tooltip title="update firstname as Momo">
      <IconButton
        disabled={disabled}
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
        <EditOutlined />
      </IconButton>
    </Tooltip>
  )
}

function DeleteRow({
  index,
  deleteRecord,
}: {
  deleteRecord: UseTableReturn<MockShape, MockFilter>['handleData']['delete']
  index: number
}) {
  const [loading, setLoading] = React.useState(false)
  return loading ? (
    <LoadingButton loading></LoadingButton>
  ) : (
    <Tooltip title="update firstname as Momo">
      <IconButton
        color="warning"
        onClick={async (e) => {
          e.stopPropagation()
          setLoading(true)
          await sleep(1000)
          setLoading(false)
          deleteRecord(index)
        }}
      >
        <DeleteOutline />
      </IconButton>
    </Tooltip>
  )
}

function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms))
}
