import { Box, Checkbox } from '@mui/material'
import { format } from 'date-fns'
import { get } from 'lodash'
import { ReactNode, useMemo } from 'react'
import { FieldValues, Path } from 'react-hook-form'
import { UseIOReturn, useIO } from 'react-utils-ts'
import { EasyCell } from './component/EasyCell'
import { EasyRow } from './component/EasyRow'
import {
  EasyTableHead,
  EasyTableHeadSortProps,
  EasyTableHeadWidthProps,
  defaultWidth,
} from './head/EasyTableHead'
import { sortData } from './helper/sort'
import { UseTableReturn } from './useTable'

export const CHECKBOX_WIDTH = 58
const LINE_HEIGHT = 51

export type EasyTableProps<T extends FieldValues> = {
  /**
   * @default undefined
   * */
  selectionMode?: 'single' | 'multiple'
  useTableReturn: UseTableReturn<T>
  columns: EasyColumnProps<T>[]
  /**
   * height of table
   * @default undefined
   * */
  height?: string | number
  /**
   * performs a deep comparison between two values to determine if they are equivalent.
   * */
  isRowEqual?: (a: T, b: T) => boolean
  /**
   * @default false
   * setting of columns
   * */
  setting?: boolean
}
export type EasyColumnProps<T extends FieldValues> = {
  path: Path<T> | 'actions'
  headerName: string
  /**
   * @default 'left'
   * */
  align?: 'left' | 'center' | 'right'
  /**
   * @default false
   * */
  sortable?: boolean
  /**
   * @default 100
   * */
  width?: number
  /**
   * support date-fns format, money and custom render
   * */
  render?: EasyTableCellRender<T>
  /**
   * sum the column value
   * */
  sum?: boolean
}
export type EasyTableCellRender<T> =
  | 'yyyy-MM-dd'
  | 'yyyy-MM-dd HH:mm:ss'
  | 'money'
  /**
   * index: row index
   */
  | ((
    val: any,
    row: T,
    index: number,
    useTableReturn: UseTableReturn<T>,
  ) => ReactNode)
export function EasyTable<T extends FieldValues>(props: EasyTableProps<T>) {
  const {
    setting,
    isRowEqual,
    height,
    columns,
    selectionMode,
    useTableReturn,
  } = props
  const { rowKeyPath, selected, data, getRowDisabled, checkAll, handleSelect } =
    useTableReturn

  const {
    delete: deleteSelected,
    add: addSelected,
    addAll: addAllSelected,
    deleteAll: deleteAllSelected,
    switch: switchSelected,
  } = handleSelect

  const widthIO = useIO<EasyTableHeadWidthProps<T>>(() => {
    const res: EasyTableHeadWidthProps<T> = {}
    columns.forEach((x) => {
      res[x.path] = x.width || defaultWidth
    })
    return res
  })

  const sortIO = useIO<EasyTableHeadSortProps<T>>(null)

  const visiableData: T[] = useMemo(() => {
    return sortData([...data], sortIO.value)
  }, [sortIO.value, data])

  const hideListIO = useIO<(Path<T> | 'actions')[]>([])

  const gridTemplateColumns: string = useMemo(() => {
    const columnWidth = columns
      .map((col) => (get(widthIO.value, col.path) || defaultWidth) + 'px')
      .join(' ')
    return selectionMode === 'multiple'
      ? CHECKBOX_WIDTH + 'px ' + columnWidth
      : columnWidth
  }, [widthIO.value])

  return (
    <Box
      sx={{
        border: '1px solid #E5E5E5',
        borderRadius: 1,
        height,
        overflow: 'auto',
        width: '100%',
        display: 'grid',
        gridTemplateRows: `repeat(${visiableData.length},${LINE_HEIGHT + 1}px)`,
        gridTemplateColumns,
      }}
    >
      {visiableData.map((row, index) => {
        const rowKey = get(row, rowKeyPath)
        const isSelected = selected.some(
          (selectedOne) =>
            isRowEqual?.(selectedOne, row) || selectedOne === row,
        )
        return (
          <EasyRow
            isSelected={isSelected}
            onClick={() => {
              if (getRowDisabled?.(row) || !selectionMode) {
                return
              }
              if (selectionMode === 'multiple') {
                if (isSelected) {
                  deleteSelected(row)
                } else {
                  addSelected(row)
                }
              } else if (selectionMode === 'single') {
                if (isSelected) {
                  deleteSelected(row)
                } else {
                  switchSelected(row)
                }
              }
            }}
            key={String(rowKey)}
          >
            {selectionMode === 'multiple' && (
              <EasyCell
                sx={{
                  position: 'sticky',
                  left: 0,
                  zIndex: 1,
                  background: 'white',
                  boxShadow: '2px 0 5px -2px #8888884d',
                }}
                height={LINE_HEIGHT}
              >
                <Checkbox
                  disabled={getRowDisabled?.(row)}
                  checked={isSelected}
                  onChange={(e) => {
                    const res = e.target.checked
                    if (res) {
                      addSelected(row)
                    } else {
                      deleteSelected(row)
                    }
                  }}
                />
              </EasyCell>
            )}
            {columns
              .filter((col) => !hideListIO.value.includes(col.path))
              .map(({ render, path, align }, colIndex) => {
                const value = get(row, path)
                return (
                  <EasyCell
                    align={align}
                    key={path}
                    height={LINE_HEIGHT}
                    sx={
                      colIndex === columns.length - 1
                        ? {
                          position: 'sticky',
                          right: 0,
                          zIndex: 1,
                          background: 'white',
                          boxShadow: '2px 0 5px 2px #8888884d',
                        }
                        : undefined
                    }
                  >
                    {render
                      ? renderCell(index, value, render, row, useTableReturn)
                      : value === null
                        ? ''
                        : String(value)}
                  </EasyCell>
                )
              })}
          </EasyRow>
        )
      })}
      <Footer {...props} data={data} widthIO={widthIO} />
    </Box>
  )
}

function Footer<T extends FieldValues>({
  selectionMode,
  columns,
  widthIO,
  data,
}: Pick<EasyTableProps<T>, 'columns' | 'selectionMode'> & {
  widthIO: UseIOReturn<EasyTableHeadWidthProps<T>>
  data: T[]
}) {
  return (
    <EasyRow>
      {selectionMode === 'multiple' && (
        <EasyCell height={LINE_HEIGHT} width={CHECKBOX_WIDTH}></EasyCell>
      )}
      {columns.map(({ sum, path, align }) => {
        return (
          <EasyCell
            align={align}
            key={path}
            width={widthIO.value?.[path] || defaultWidth}
            height={LINE_HEIGHT}
          >
            {sum ? sumColumnValue(data, path).toLocaleString() : ''}
          </EasyCell>
        )
      })}
    </EasyRow>
  )
}

function sumColumnValue<T>(data: T[], path: Path<T> | 'actions') {
  return data.reduce((prev, row) => {
    const val = get(row, path)
    if (typeof val === 'number') {
      return prev + val
    }
    return prev
  }, 0)
}

function renderCell<T>(
  index: number,
  val: unknown,
  render: EasyTableCellRender<T>,
  row: T,
  useTableReturn: UseTableReturn<T>,
) {
  if (typeof render === 'function') {
    return render(val, row, index, useTableReturn)
  }
  if (render === 'money') {
    return Number(val).toLocaleString()
  }
  if (render === 'yyyy-MM-dd') {
    if (typeof val === 'number') {
      return format(val, 'yyyy-MM-dd')
    }
    return null
  }
  if (render === 'yyyy-MM-dd HH:mm:ss') {
    if (typeof val === 'number') {
      return format(val, 'yyyy-MM-dd HH:mm:ss')
    }
    return null
  }
  return ''
}
