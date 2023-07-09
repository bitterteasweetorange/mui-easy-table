import { Box, Checkbox } from '@mui/material'
import { format } from 'date-fns'
import { get } from 'lodash'
import { ReactNode, useMemo } from 'react'
import { FieldValues, Path } from 'react-hook-form'
import { UseIOReturn, useIO } from 'react-utils-ts'
import { ColumnManage } from './ColumnManage'
import { BODY_HEIGHT, EasyCell } from './EasyCell'
import {
  DEFAULT_WIDTH,
  EasyHead,
  EasyHeadSortProps,
  EasyHeadWidthProps,
} from './EasyHead'
import { HEAD_HEIGHT } from './EasyHeadCell'
import { EasyRow } from './component/EasyRow'
import { sortData } from './helper/sort'
import { UseTableReturn } from './useTable'

export const CHECKBOX_WIDTH = 66

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
  /**
   * hide column's path
   * */
  defautltHide?: (Path<T> | 'actions')[]
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
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
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
    defautltHide = [],
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

  const widthIO = useIO<EasyHeadWidthProps<T>>(() => {
    const res: EasyHeadWidthProps<T> = {}
    columns.forEach((x) => {
      res[x.path] = x.width || DEFAULT_WIDTH
    })
    return res
  })

  const sortIO = useIO<EasyHeadSortProps<T>>(null)

  const visiableData: T[] = useMemo(() => {
    return sortData([...data], sortIO.value)
  }, [sortIO.value, data])

  const hideListIO = useIO<(Path<T> | 'actions')[]>(defautltHide)

  const gridTemplateColumns: string = useMemo(() => {
    const columnWidth = columns
      .filter((col) => !hideListIO.value.includes(col.path))
      .map((col) => (get(widthIO.value, col.path) || DEFAULT_WIDTH) + 'px')
      .join(' ')
    return selectionMode === 'multiple'
      ? CHECKBOX_WIDTH + 'px ' + columnWidth
      : columnWidth
  }, [widthIO.value, columns, hideListIO.value, selectionMode])

  return (
    <>
      <ColumnManage hideListIO={hideListIO} columns={columns} />
      <Box
        sx={{
          border: '1px solid #E5E5E5',
          borderRadius: 1,
          boxSizing: 'border-box',
          height,
          overflow: 'auto',
          display: 'grid',
          gridTemplateRows: `${HEAD_HEIGHT}px repeat(${visiableData.length},${BODY_HEIGHT}px)`,
          gridTemplateColumns,
        }}
      >
        <EasyHead
          setting={setting}
          hideListIO={hideListIO}
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
                    boxShadow: '2px 0 5px -2px #8888884d',
                  }}
                  height={BODY_HEIGHT}
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
                      height={BODY_HEIGHT}
                      sx={
                        colIndex === columns.length - 1
                          ? {
                              position: 'sticky',
                              right: 0,
                              zIndex: 1,
                              boxShadow:
                                '0px 3px 14px 2px rgba(26, 59, 164, 0.06)',
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
    </>
  )
}

function Footer<T extends FieldValues>({
  selectionMode,
  columns,
  widthIO,
  data,
}: Pick<EasyTableProps<T>, 'columns' | 'selectionMode'> & {
  widthIO: UseIOReturn<EasyHeadWidthProps<T>>
  data: T[]
}) {
  return (
    <EasyRow>
      {selectionMode === 'multiple' && (
        <EasyCell
          cellBorder="top"
          sx={{
            position: 'sticky',
            bottom: 0,
            zIndex: 2,
          }}
          height={BODY_HEIGHT}
          width={CHECKBOX_WIDTH}
        ></EasyCell>
      )}
      {columns.map(({ sum, path, align }) => {
        return (
          <EasyCell
            cellBorder="top"
            align={align}
            key={path}
            width={widthIO.value?.[path] || DEFAULT_WIDTH}
            height={BODY_HEIGHT}
            sx={{
              position: 'sticky',
              bottom: 0,
              zIndex: 2,
            }}
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
