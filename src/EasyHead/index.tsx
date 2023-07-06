import { Box, Checkbox } from '@mui/material'
import { FieldValues, Path, get } from 'react-hook-form'
import { UseIOReturn } from 'react-utils-ts'
import { EasyCell } from '../EasyCell'
import { EasyHeadCell, HEAD_HEIGHT } from '../EasyHeadCell'
import { CHECKBOX_WIDTH, EasyColumnProps } from '../EasyTable'

export type EasyPath<T> = Path<T> | 'actions'

export type EasyHeadSortProps<T extends FieldValues> = {
  path: EasyPath<T>
  direction: 'asc' | 'desc'
} | null

export type EasyHeadWidthProps<T extends FieldValues> = Partial<
  Record<EasyPath<T>, number>
>

export type EasyHeadProps<T extends FieldValues> = {
  columns: EasyColumnProps<T>[]
  /**
   * if passed, the column will be sortable
   * */
  sortIO?: UseIOReturn<EasyHeadSortProps<T>>
  /**
   * if passed, the column will be resizable
   * default width is 100
   * */
  widthIO?: UseIOReturn<EasyHeadWidthProps<T>>
  /**
   * checkbox checked state
   * */
  checkedIO?: UseIOReturn<boolean>
  indeterminate?: boolean
  /**
   * if true, setting button will be shown on hover line
   * */
  setting?: boolean
  /**
   * if passed, the column will be hidden
   * */
  hideListIO?: UseIOReturn<(Path<T> | 'actions')[]>
}

export const DEFAULT_WIDTH = 100

export function getGridTemplateColumns<T extends FieldValues>(
  columns: EasyColumnProps<T>[],
  widthValue: EasyHeadWidthProps<T>,
  selectionMode?: 'single' | 'multiple',
) {
  const columnWidth = columns
    .map((col) => (get(widthValue, col.path) || DEFAULT_WIDTH) + 'px')
    .join(' ')
  return selectionMode === 'multiple'
    ? CHECKBOX_WIDTH + 'px ' + columnWidth
    : columnWidth
}

export function EasyHead<T extends FieldValues>(props: EasyHeadProps<T>) {
  const {
    hideListIO,
    indeterminate,
    widthIO,
    setting,
    columns,
    sortIO,
    checkedIO,
  } = props
  return (
    <Box
      sx={{
        display: 'contents',
      }}
    >
      {checkedIO && (
        <EasyCell
          width={CHECKBOX_WIDTH}
          height={HEAD_HEIGHT}
          sx={{
            position: 'sticky',
            left: 0,
            top: 0,
            zIndex: 3,
            background: 'white',
            boxShadow: '2px 0 5px -2px #8888884d',
          }}
        >
          <Checkbox
            checked={!!checkedIO?.value}
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
          <EasyHeadCell
            key={path}
            align={align}
            width={widthIO?.value?.[path] || DEFAULT_WIDTH}
            sx={{
              position: 'sticky',
              right: colIndex === columns.length - 1 ? 0 : undefined,
              top: 0,
              zIndex: 2,
              background: 'white',
              boxShadow:
                colIndex === columns.length - 1
                  ? '0px 3px 14px 2px rgba(26, 59, 164, 0.06)'
                  : undefined,
            }}
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
                          direction: nextSort as 'asc' | 'desc',
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
          >
            {headerName}
          </EasyHeadCell>
        ))}
    </Box>
  )
}
