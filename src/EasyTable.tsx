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

const CHECKBOX_WIDTH = 58
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
  | ((val: any, row: T, index: number) => ReactNode)
export function EasyTable<T extends FieldValues>(props: EasyTableProps<T>) {
  const { isRowEqual, height, columns, selectionMode, useTableReturn } = props
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
      if (x.path !== 'actions') {
        res[x.path] = x.width || defaultWidth
      }
    })
    return res
  })

  const sortIO = useIO<EasyTableHeadSortProps<T>>(null)

  const visiableData: T[] = useMemo(() => {
    return sortData([...data], sortIO.value)
  }, [sortIO.value, data])

  return (
    <Box
      sx={{
        border: '1px solid #E5E5E5',
        borderRadius: 1,
        height,
        display: 'grid',
        gridTemplateRows: 'auto 1fr auto',
      }}
    >
      <EasyTableHead
        sortIO={sortIO}
        widthIO={widthIO}
        columns={columns}
        indeterminate={selected.length > 0 && selected.length < data.length}
        checkedIO={
          selectionMode === 'multiple'
            ? {
                value: selected.length === data.length,
                onChange: () => {
                  if (!checkAll) {
                    addAllSelected()
                  } else {
                    deleteAllSelected()
                  }
                },
              }
            : undefined
        }
      />
      <Box
        sx={{
          overflow: 'auto',
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
                <EasyCell height={LINE_HEIGHT} width={CHECKBOX_WIDTH}>
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
              {columns.map(({ render, path, align }) => {
                const value = get(row, path)
                return (
                  <EasyCell
                    align={align}
                    key={path}
                    width={widthIO.value?.[path] || defaultWidth}
                    height={LINE_HEIGHT}
                  >
                    {render
                      ? renderCell(index, value, render, row)
                      : value === null
                      ? ''
                      : String(value)}
                  </EasyCell>
                )
              })}
            </EasyRow>
          )
        })}
      </Box>
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
  val: any,
  render: EasyTableCellRender<T>,
  row: T,
) {
  if (typeof render === 'function') {
    return render(val, row, index)
  }
  if (render === 'money') {
    return Number(val).toLocaleString()
  }
  if (render === 'yyyy-MM-dd') {
    return format(val, 'yyyy-MM-dd')
  }
  if (render === 'yyyy-MM-dd HH:mm:ss') {
    return format(val, 'yyyy-MM-dd HH:mm:ss')
  }
  return ''
}
