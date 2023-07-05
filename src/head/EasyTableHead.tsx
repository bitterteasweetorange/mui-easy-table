import { Box, Checkbox } from '@mui/material'
import { useState } from 'react'
import { FieldValues, Path } from 'react-hook-form'
import { UseIOReturn } from 'react-utils-ts'
import { EasyColumnProps } from '../EasyTable'
import { EasyCell } from '../component/EasyCell'
import { EasyTableHeadItem, HEAD_HEIGHT } from './EasyTableHeadItem'

export type EasyTableHeadSortProps<T extends FieldValues> = {
  path: Path<T>
  direction: 'asc' | 'desc'
} | null

export type EasyTableHeadWidthProps<T extends FieldValues> = Partial<
  Record<Path<T> | 'actions', number>
>

export type EasyTableHeadProps<T extends FieldValues> = {
  columns: EasyColumnProps<T>[]
  /**
   * if passed, the column will be sortable,
   * */
  sortIO?: UseIOReturn<EasyTableHeadSortProps<T>>
  /**
   * if passed, the column will be resizable,
   * default width is 100
   * */
  widthIO?: UseIOReturn<EasyTableHeadWidthProps<T>>
  /**
   * checkbox checked state
   * */
  checkedIO?: UseIOReturn<boolean>
  indeterminate?: boolean
  /**
   * if true, setting button will be shown,
   * */
  setting?: boolean
  /**
   * if passed, the column will be hidden
   * */
  hideListIO?: UseIOReturn<(Path<T> | 'actions')[]>
}

export const defaultWidth = 100
export function EasyTableHead<T extends FieldValues>(
  props: EasyTableHeadProps<T>,
) {
  const {
    hideListIO,
    indeterminate,
    widthIO,
    setting,
    columns,
    sortIO,
    checkedIO,
  } = props
  const [hover, setHover] = useState(false)
  return (
    <>
      <Box
        sx={{
          display: 'contents',
        }}
        onMouseEnter={() => {
          setHover(true)
        }}
        onMouseLeave={() => {
          setHover(false)
        }}
      >
        {checkedIO && (
          <EasyCell
            width={58}
            height={HEAD_HEIGHT}
            sx={{
              position: 'sticky',
              left: 0,
              top: 0,
              zIndex: 2,
              background: 'white',
              boxShadow: '2px 0 5px -2px #8888884d',
            }}
          >
            <Checkbox
              checked={checkedIO?.value === true}
              indeterminate={indeterminate}
              onChange={(e) => {
                checkedIO?.onChange(e.target.checked ? true : false)
              }}
            />
          </EasyCell>
        )}
        {columns
          .filter((col) => !hideListIO?.value.includes(col.path))
          .map(({ sortable, headerName, path, align }, colIndex) => (
            <EasyTableHeadItem
              key={path}
              headerName={headerName}
              align={align}
              showResizeIcon={hover}
              width={widthIO?.value?.[path] || defaultWidth}
              sx={
                colIndex === columns.length - 1
                  ? {
                    position: 'sticky',
                    right: 0,
                    top: 0,
                    zIndex: 2,
                    background: 'white',
                    boxShadow: '2px 0 5px 2px #8888884d',
                  }
                  : undefined
              }
              onWidthChange={(nextWidth) => {
                widthIO?.onChange((pre) => ({
                  ...pre,
                  [path]: nextWidth,
                }))
              }}
              sortIO={
                sortable
                  ? {
                    value:
                      sortIO?.value?.path === path
                        ? sortIO.value?.direction
                        : 'none',
                    onChange: (nextSort) => {
                      if (nextSort === 'none') {
                        sortIO?.onChange(null)
                      } else if (path !== 'actions') {
                        sortIO?.onChange({
                          path,
                          direction: nextSort as any,
                        })
                      }
                    },
                  }
                  : undefined
              }
              showSettingIcon={setting}
              onHideColumn={() => {
                hideListIO?.onChange((pre) => [...pre, path])
              }}
            ></EasyTableHeadItem>
          ))}
      </Box>
    </>
  )
}
