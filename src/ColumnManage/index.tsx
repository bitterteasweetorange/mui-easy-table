import { ViewWeekRounded } from '@mui/icons-material'
import { Box, Button, Switch } from '@mui/material'
import React from 'react'
import { FieldValues, Path } from 'react-hook-form'
import { UseIOReturn, useIO } from 'react-utils-ts'
import { EasyColumnProps } from '../EasyTable'
import { EasyPopper } from '../component'

export type ColumnManageProps<Row extends FieldValues> = {
  columns: EasyColumnProps<Row>[]
  hideListIO: UseIOReturn<(Path<Row> | 'actions')[]>
}
export function ColumnManage<Row extends FieldValues>(
  props: ColumnManageProps<Row>,
) {
  const { columns, hideListIO } = props

  const openIO = useIO(false)

  const anchorRef = React.useRef<HTMLButtonElement>(null)
  return (
    <>
      <Button
        variant="text"
        onClick={() => {
          openIO.onChange((state) => !state)
        }}
        ref={anchorRef}
        startIcon={<ViewWeekRounded />}
      >
        Columns
      </Button>
      <EasyPopper anchorRef={anchorRef} openIO={openIO}>
        <Box p={2}>
          {columns.map((col) => (
            <Box key={col.path}>
              <Switch
                checked={!hideListIO.value?.includes(col.path)}
                onChange={(e) => {
                  const next = e.target.checked
                  hideListIO.onChange((pre) => {
                    if (!next) {
                      return [...pre, col.path]
                    } else {
                      return pre.filter((path) => path !== col.path)
                    }
                  })
                }}
              />
              {col.headerName}
            </Box>
          ))}
        </Box>
      </EasyPopper>
    </>
  )
}
