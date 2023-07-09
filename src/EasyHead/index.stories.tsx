import { Box } from '@mui/material'
import { Meta } from '@storybook/react'
import { useCallback, useRef, useState } from 'react'
import { useIO } from 'react-utils-ts'
import { EasyHead, EasyHeadSortProps } from '.'
import { CHECKBOX_WIDTH } from '../EasyTable'
import { ColumnState, UseTableReturn } from '../useTable'

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

  const checkedIO = useIO<boolean>(false)
  const [columnState, setColumnState] = useState<ColumnState<Shape>>([
    {
      path: 'id',
      width: 150,
      hidden: false,
    },
    {
      path: 'name',
      width: 250,
      hidden: false,
    },
    {
      path: 'age',
      width: 350,
      hidden: false,
    },
  ])

  const updateColumnHidden: UseTableReturn<Shape>['updateColumnHidden'] =
    useCallback((path, nextHidden) => {
      setColumnState((pre) => {
        const result = Array.from(pre)
        const index = result.findIndex((col) => col.path === path)
        result[index].hidden = nextHidden

        return result
      })
    }, [])

  const updateColumnWidth: UseTableReturn<Shape>['updateColumnWidth'] =
    useCallback((path, nextWidth) => {
      setColumnState((pre) => {
        const result = Array.from(pre)
        const index = result.findIndex((col) => col.path === path)
        result[index].width = nextWidth

        return result
      })
    }, [])

  const openIO = useIO(false)
  const anchorRef = useRef<HTMLLIElement>(null)
  return (
    <Box
      sx={{
        display: 'grid',
        gridTemplateColumns: `${CHECKBOX_WIDTH}px auto auto auto`,
        justifyContent: 'start',
      }}
    >
      <EasyHead<Shape>
        anchorRef={anchorRef}
        openIO={openIO}
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
        checkedIO={checkedIO}
        updateColumnHidden={updateColumnHidden}
        updateColumnWidth={updateColumnWidth}
        columnState={columnState}
      />
    </Box>
  )
}
