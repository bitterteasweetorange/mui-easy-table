import { Meta } from '@storybook/react'
import { Path } from 'react-hook-form'
import { useIO } from 'react-utils-ts'
import {
  EasyTableHead,
  EasyTableHeadSortProps,
  EasyTableHeadWidthProps,
} from '../../head/EasyTableHead'

const meta = {
  title: 'head/EasyTableHead',
  component: EasyTableHead,
} satisfies Meta<typeof EasyTableHead>

export default meta

type Shape = {
  id: number
  name: string
  age: number
}
export const Template = () => {
  const sortIO = useIO<EasyTableHeadSortProps<Shape>>({
    path: 'age',
    direction: 'asc',
  })

  const widthIO = useIO<EasyTableHeadWidthProps<Shape>>({
    id: 150,
    name: 200,
    age: 100,
  })

  const checkedIO = useIO<boolean>(false)
  const hideListIO = useIO<(Path<Shape> | 'actions')[]>([])

  return (
    <EasyTableHead<Shape>
      hideListIO={hideListIO}
      setting
      columns={[
        {
          path: 'id',
          headerName: 'ID',
        },
        {
          path: 'name',
          headerName: 'Name',
          align: 'right',
          sortable: true,
        },
        {
          path: 'age',
          headerName: 'Age',
          sortable: true,
        },
      ]}
      sortIO={sortIO}
      widthIO={widthIO}
      checkedIO={checkedIO}
    />
  )
}
