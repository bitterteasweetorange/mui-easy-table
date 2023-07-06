import { Box } from '@mui/material'
import { Meta } from '@storybook/react'
import { useIO } from 'react-utils-ts'
import { CHECKBOX_WIDTH } from 'src/EasyTable'
import { EasyHead, EasyHeadSortProps, EasyHeadWidthProps, EasyPath } from '.'

const meta = {
  title: 'component/EasyHead',
  component: EasyHead,
} satisfies Meta<typeof EasyHead>

export default meta

type Shape = {
  id: number
  name: string
  age: number
}
export const Default = () => {
  const sortIO = useIO<EasyHeadSortProps<Shape>>({
    path: 'age',
    direction: 'asc',
  })

  const widthIO = useIO<EasyHeadWidthProps<Shape>>({
    id: 150,
    name: 300,
    age: 100,
  })

  const checkedIO = useIO<boolean>(false)
  const hideListIO = useIO<EasyPath<Shape>[]>([])

  return (
    <Box
      sx={{
        display: 'grid',
        gridTemplateColumns: `${CHECKBOX_WIDTH}px auto auto auto`,
        justifyContent: 'start',
      }}
    >
      <EasyHead<Shape>
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
            align: 'center',
          },
          {
            path: 'age',
            headerName: 'Age',
            sortable: true,
            align: 'right',
          },
        ]}
        sortIO={sortIO}
        widthIO={widthIO}
        checkedIO={checkedIO}
      />
    </Box>
  )
}
