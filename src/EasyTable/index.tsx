import { Box, Checkbox } from '@mui/material'
import { format } from 'date-fns'
import { get } from 'lodash'
import { ReactNode, RefObject, useMemo, useRef } from 'react'
import { FieldValues, Path } from 'react-hook-form'
import { useIO } from 'react-utils-ts'
import { EasyFilterSetting } from 'src/EasyFilter'
import { ColumnManage } from '../ColumnManage'
import { BODY_HEIGHT, EasyCell } from '../EasyCell'
import { EasyHead, EasyHeadSortProps, EasyPath } from '../EasyHead'
import { HEAD_HEIGHT } from '../EasyHeadCell'
import { EasyRow } from '../component/EasyRow'
import { sortData } from '../helper/sort'
import { ColumnState, UseTableReturn } from '../useTable'

export const CHECKBOX_WIDTH = 66

export type EasyTableProps<
  T extends FieldValues,
  Filter extends FieldValues | null = null,
> = {
  /**
   * @default undefined
   * */
  selectionMode?: 'single' | 'multiple'
  useTableReturn: UseTableReturn<T, Filter>
  columns: EasyColumnProps<T, Filter>[]
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
export type EasyColumnProps<
  T extends FieldValues,
  Filter extends FieldValues | null = null,
> = {
  path: EasyPath<T>
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
   * support date-fns format, money and custom render
   * */
  render?: EasyTableCellRender<T, Filter>
  /**
   * sum the column value
   * */
  sum?: boolean
  // eslint-disable-next-line
  filterSetting?: EasyFilterSetting<any>
}

export type EasyTableCellRender<T, Filter extends FieldValues | null = null> =
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
    useTableReturn: UseTableReturn<T, Filter>,
  ) => ReactNode)
export function EasyTable<
  T extends FieldValues,
  Filter extends FieldValues | null = null,
>(props: EasyTableProps<T, Filter>) {
  const {
    setting,
    isRowEqual,
    height,
    columns,
    selectionMode,
    useTableReturn,
  } = props
  const {
    rowKeyPath,
    selected,
    data,
    getRowDisabled,
    checkAll,
    handleSelect,
    columnState,
    updateColumnOrder,
    updateColumnHidden,
    updateColumnWidth,
    filter,
    setFilter,
  } = useTableReturn

  const {
    delete: deleteSelected,
    add: addSelected,
    addAll: addAllSelected,
    deleteAll: deleteAllSelected,
    switch: switchSelected,
  } = handleSelect

  const sortIO = useIO<EasyHeadSortProps<T>>(null)

  const visiableData: T[] = useMemo(() => {
    return sortData([...data], sortIO.value)
  }, [sortIO.value, data])

  const gridTemplateColumns: string = useMemo(() => {
    const columnWidth = columnState
      .filter((col) => !col.hidden)
      .map((col) => col.width + 'px')
      .join(' ')
    return selectionMode === 'multiple'
      ? CHECKBOX_WIDTH + 'px ' + columnWidth
      : columnWidth
  }, [columnState, selectionMode])

  const openIO = useIO(false)
  const anchorRef = useRef<HTMLLIElement>(null)
  return (
    <>
      <ColumnManage
        columns={columns}
        columnState={columnState}
        updateColumnHidden={updateColumnHidden}
        updateColumnOrder={updateColumnOrder}
        openIO={openIO}
        anchorRef={anchorRef as unknown as RefObject<HTMLButtonElement>}
      />
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
          filter={filter}
          setFilter={setFilter}
          openIO={openIO}
          anchorRef={anchorRef}
          setting={setting}
          sortIO={sortIO}
          columns={columns}
          columnState={columnState}
          updateColumnWidth={updateColumnWidth}
          updateColumnHidden={updateColumnHidden}
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
              {columnState.map(({ hidden, path }, colIndex) => {
                if (hidden) return null

                const col = columns.find((col) => col.path === path)
                if (!col) return null
                const { render, align } = col
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
        <Footer
          selectionMode={selectionMode}
          columnState={columnState}
          data={data}
          columns={columns}
        />
      </Box>
    </>
  )
}

function Footer<
  T extends FieldValues,
  Filter extends FieldValues | null = null,
>({
  selectionMode,
  data,
  columnState,
  columns,
}: Pick<EasyTableProps<T, Filter>, 'columns' | 'selectionMode'> & {
  data: T[]
  columnState: ColumnState<T>
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
      {columnState.map(({ hidden, path, width }) => {
        if (hidden) return null
        const col = columns.find((col) => col.path === path)
        if (!col) return null
        const { sum, align } = col
        return (
          <EasyCell
            cellBorder="top"
            align={align}
            key={path}
            width={width}
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

function renderCell<T, Filter extends FieldValues | null = null>(
  index: number,
  val: unknown,
  render: EasyTableCellRender<T, Filter>,
  row: T,
  useTableReturn: UseTableReturn<T, Filter>,
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
