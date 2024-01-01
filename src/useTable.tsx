import { get, isEqual, isNil } from 'lodash'
import { Dispatch, SetStateAction, useCallback, useMemo, useState } from 'react'
import { FieldValues, Path } from 'react-hook-form'
import { useIO } from 'react-utils-ts'
import { DEFAULT_WIDTH, EasyPath } from './EasyHead'

type ColumnItemState<Row> = Required<DefaultColumnItemState<Row>>
export type ColumnState<Row> = ColumnItemState<Row>[]
export type UseTableReturn<Row, Filter extends FieldValues | null = null> = {
  filter: Filter
  setFilter: Dispatch<SetStateAction<Filter>>
  // visibale data
  data: Row[]
  resetRawData: (nextData: Row[]) => void
  handleData: {
    add: (row: Row) => void
    delete: (index: number) => void
    update: (index: number, row: Row) => void
  }
  selected: Row[]
  handleSelect: {
    add: (row: Row) => void
    delete: (row: Row) => void
    /**
     * switch selected for single mode
     * */
    switch: (row: Row) => void
    /**
     * without disabled
     * */
    addAll: () => void
    /**
     * without disabled
     * */
    deleteAll: () => void
  }
  /**
   * when getRowDisabled is defined, toggle checkbox
   * */
  checkAll: boolean
  columnState: ColumnState<Row>
  /**
   * update column hidden
   */
  updateColumnHidden: (path: EasyPath<Row>, nextHidden: boolean) => void
  /**
   * update column width
   */
  updateColumnWidth: (path: EasyPath<Row>, nextWidth: number) => void
  /**
   * order column
   */
  updateColumnOrder: (startIndex: number, endIndex: number) => void
} & All<Row>

export type DefaultColumnItemState<Row> = {
  path: EasyPath<Row>
  /**
   * @default 100
   * */
  width?: number
  /**
   * @default false
   * */
  hidden?: boolean
}
export type UseTableProps<Row, Filter extends FieldValues | null = null> = {
  defaultRawData: Row[]
  defaultSelected?: Row[]
  defaultColumnState: DefaultColumnItemState<Row>[]
  defaultFilter?: Filter
} & All<Row>

type All<Row> = {
  /**
   * declare the key path of row
   * */
  rowKeyPath: Path<Row>
  getRowDisabled?: (row: Row) => boolean
}

export function useTable<Row, Filter extends FieldValues | null = null>(
  props: UseTableProps<Row, Filter>,
): UseTableReturn<Row, Filter> {
  const {
    defaultFilter = null,
    defaultSelected,
    defaultColumnState,
    defaultRawData: rawData,
    ...all
  } = props
  const { rowKeyPath, getRowDisabled } = all
  const selectedIO = useIO<Row[]>(defaultSelected ?? [])
  const [checkAll, setCheckAll] = useState(
    defaultSelected?.length === rawData.length,
  )

  const addSelected = useCallback(
    (row: Row) => {
      if (selectedIO.value.length === rawData.length - 1) {
        setCheckAll(true)
      }
      selectedIO.onChange(selectedIO.value.concat([row]))
    },
    [selectedIO, rawData.length],
  )

  const deleteSelected = useCallback(
    (row: Row) => {
      if (selectedIO.value.length === 1) {
        setCheckAll(false)
      }
      selectedIO.onChange(selectedIO.value.filter((r) => !isEqual(r, row)))
    },
    [selectedIO],
  )

  const addAllSelected = useCallback(() => {
    selectedIO.onChange((pre) => [
      ...pre,
      ...rawData.filter((r) => !getRowDisabled?.(r) && !pre.includes(r)),
    ])
    setCheckAll(true)
  }, [rawData, getRowDisabled, selectedIO, setCheckAll])

  const deleteAllSelected = useCallback(() => {
    selectedIO.onChange((pre) => pre.filter((r) => getRowDisabled?.(r)))
    setCheckAll(false)
  }, [getRowDisabled, selectedIO, setCheckAll])

  const switchSelected = useCallback(
    (row: Row) => {
      selectedIO.onChange([row])
    },
    [selectedIO],
  )

  const rawDataIO = useIO(rawData)

  const addRow = useCallback(
    (row: Row) => {
      rawDataIO.onChange((pre) => [...pre, row])
    },
    [rawDataIO],
  )

  const [filter, setFilter] = useState<Filter>(
    defaultFilter as unknown as Filter,
  )

  const data: Row[] = useMemo(() => {
    if (isNil(filter)) return rawDataIO.value
    const res = rawDataIO.value.filter((row) => {
      let valid = true
      Object.entries(filter).forEach((item) => {
        const [key, value] = item

        if (value === undefined) return

        const realValue = get(row, key)
        if (Array.isArray(value)) {
          valid = value.includes(realValue)
          console.log(valid, value, realValue)
        } else {
          valid = realValue === value
        }
      })
      return valid
    })
    return res
  }, [filter, rawDataIO.value])

  const deleteRow = useCallback(
    (index: number) => {
      const deletedRow = rawDataIO.value[index]
      // if delete selected row
      if (
        selectedIO.value
          .map((row) => get(row, rowKeyPath))
          .includes(get(deletedRow, rowKeyPath))
      ) {
        selectedIO.onChange(
          selectedIO.value.filter(
            (row) => get(row, rowKeyPath) !== get(deletedRow, rowKeyPath),
          ),
        )
      }
      rawDataIO.onChange(rawDataIO.value.filter((_, i) => i !== index))
    },
    [rawDataIO, rowKeyPath, selectedIO],
  )
  const updateRow = useCallback(
    (index: number, row: Row) => {
      // if update selected row
      if (
        selectedIO.value
          .map((selectedRow) => get(selectedRow, rowKeyPath))
          .includes(get(row, rowKeyPath))
      ) {
        selectedIO.onChange(
          selectedIO.value.map((oldRow) => {
            if (get(oldRow, rowKeyPath) === get(row, rowKeyPath)) {
              return row
            }
            return oldRow
          }),
        )
      }
      rawDataIO.onChange(rawDataIO.value.map((r, i) => (i === index ? row : r)))
    },
    [rawDataIO, rowKeyPath, selectedIO],
  )

  const [columnState, setColumnState] = useState<ColumnState<Row>>(() => {
    return defaultColumnState.map((col) => ({
      path: col.path,
      width: col.width ?? DEFAULT_WIDTH,
      hidden: col.hidden ?? false,
    }))
  })

  const updateColumnOrder: UseTableReturn<Row, Filter>['updateColumnOrder'] =
    useCallback((startIndex, endIndex) => {
      setColumnState((pre) => {
        const result = Array.from(pre)
        const [removed] = result.splice(startIndex, 1)
        result.splice(endIndex, 0, removed)

        return result
      })
    }, [])

  const updateColumnHidden: UseTableReturn<Row, Filter>['updateColumnHidden'] =
    useCallback((path, nextHidden) => {
      setColumnState((pre) => {
        const result = Array.from(pre)
        const index = result.findIndex((col) => isEqual(col.path, path))
        result[index].hidden = nextHidden

        return result
      })
    }, [])

  const updateColumnWidth: UseTableReturn<Row, Filter>['updateColumnWidth'] =
    useCallback((path, nextWidth) => {
      setColumnState((pre) => {
        const result = Array.from(pre)
        const index = result.findIndex((col) => isEqual(col.path, path))
        result[index].width = nextWidth

        return result
      })
    }, [])

  return {
    ...all,
    resetRawData: rawDataIO.onChange,
    filter,
    setFilter,
    data,
    selected: selectedIO.value,
    columnState,
    updateColumnOrder,
    updateColumnHidden,
    updateColumnWidth,
    handleSelect: {
      add: addSelected,
      delete: deleteSelected,
      switch: switchSelected,
      addAll: addAllSelected,
      deleteAll: deleteAllSelected,
    },
    handleData: {
      add: addRow,
      delete: deleteRow,
      update: updateRow,
    },
    checkAll,
  }
}
