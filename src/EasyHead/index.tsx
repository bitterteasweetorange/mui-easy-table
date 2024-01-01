import { Box, Checkbox } from '@mui/material'
import { isNil } from 'lodash'
import { Dispatch, SetStateAction } from 'react'
import { FieldValues, Path, get } from 'react-hook-form'
import { UseIOReturn } from 'react-utils-ts'
import { EasyCell } from '../EasyCell'
import { EasyHeadCell, HEAD_HEIGHT } from '../EasyHeadCell'
import { CHECKBOX_WIDTH, EasyColumnProps } from '../EasyTable'
import { ColumnState } from '../useTable'

export type EasyPath<T> = Path<T> | 'actions'

export type EasyHeadSortProps<T extends FieldValues> = {
  path: EasyPath<T>
  direction: 'asc' | 'desc'
} | null

export type EasyHeadWidthProps<T extends FieldValues> = Partial<
  Record<EasyPath<T>, number>
>

export type EasyHeadProps<
  Row extends FieldValues,
  Filter extends FieldValues | null = null,
> = {
  openIO: UseIOReturn<boolean>
  anchorRef: React.RefObject<HTMLLIElement>
  columnState: ColumnState<Row>
  columns: EasyColumnProps<Row, Filter>[]
  /**
   * if passed, the column will be sortable
   * */
  sortIO?: UseIOReturn<EasyHeadSortProps<Row>>
  /**
   * update column width
   */
  updateColumnWidth: (path: EasyPath<Row>, nextWidth: number) => void
  /**
   * update column hidden
   */
  updateColumnHidden: (path: EasyPath<Row>, nextHidden: boolean) => void
  /**
   * checkbox checked state
   * */
  checkedIO?: UseIOReturn<boolean>
  indeterminate?: boolean
  /**
   * if true, setting button will be shown on hover line
   * include hide column
   * */
  setting?: boolean
  filter?: Filter
  setFilter?: Dispatch<SetStateAction<Filter>>
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

export function EasyHead<
  T extends FieldValues,
  Filter extends FieldValues | null = null,
>(props: EasyHeadProps<T, Filter>) {
  const {
    anchorRef,
    openIO,
    indeterminate,
    setting,
    columns,
    sortIO,
    checkedIO,
    columnState,
    updateColumnHidden,
    updateColumnWidth,
    filter,
    setFilter,
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
      {columnState
        // .filter((columnItemState) => !columnItemState.hidden)
        .map((columnItemState, colIndex) => {
          const { hidden, path, width } = columnItemState
          if (hidden) return null
          const column = columns.find((col) => col.path === path)
          if (!column) return null
          const { sortable, headerName, filterSetting, align } = column
          //eslint-disable-next-line
          const filterValue = get(filter, path) as any
          return (
            <EasyHeadCell
              filterIO={
                filterSetting
                  ? {
                      value:
                        filterSetting?.type === 'multiSelect'
                          ? isNil(filterValue)
                            ? []
                            : filterValue
                          : isNil(filterValue)
                          ? []
                          : [filterValue],
                      //eslint-disable-next-line
                      onChange: (v: any) => {
                        setFilter?.((pre) => ({
                          ...pre,
                          [path]:
                            filterSetting?.type === 'multiSelect' ? v : v?.[0],
                        }))
                      },
                      filterSetting,
                    }
                  : undefined
              }
              openIO={openIO}
              anchorRef={colIndex === 0 ? anchorRef : undefined}
              key={path}
              align={align}
              width={width}
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
                updateColumnWidth(path, nextWidth)
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
                updateColumnHidden(path, true)
              }}
            >
              {headerName}
            </EasyHeadCell>
          )
        })}
    </Box>
  )
}
