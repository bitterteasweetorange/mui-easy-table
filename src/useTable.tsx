import { get, isEqual } from 'lodash'
import { useCallback, useState } from 'react'
import { Path } from 'react-hook-form'
import { useIO } from 'react-utils-ts'
import useDeepCompareEffect from 'use-deep-compare-effect'
import { DEFAULT_WIDTH, EasyPath } from './EasyHead'

type ColumnItemState<Row> = Required<DefaultColumnItemState<Row>>
export type ColumnState<Row> = ColumnItemState<Row>[]
export type UseTableReturn<Row> = {
  data: Row[]
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
// eslint-disable-next-line
export type UseTableProps<Row, _Filter> = {
  rawData: Row[]
  defaultSelected?: Row[]
  defaultColumnState: DefaultColumnItemState<Row>[]
} & All<Row>

type All<Row> = {
  /**
   * declare the key path of row
   * */
  rowKeyPath: Path<Row>
  getRowDisabled?: (row: Row) => boolean
}

export function useTable<Row, Filter>(
  props: UseTableProps<Row, Filter>,
): UseTableReturn<Row> {
  const { defaultSelected, defaultColumnState, rawData, ...all } = props
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

  const dataIO = useIO(rawData)

  useDeepCompareEffect(() => {
    dataIO.onChange(rawData)
  }, [rawData])
  const addRow = useCallback(
    (row: Row) => {
      dataIO.onChange(dataIO.value.concat([row]))
    },
    [dataIO],
  )
  const deleteRow = useCallback(
    (index: number) => {
      const deletedRow = dataIO.value[index]
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
      dataIO.onChange(dataIO.value.filter((_, i) => i !== index))
    },
    [dataIO, rowKeyPath, selectedIO],
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
      dataIO.onChange(dataIO.value.map((r, i) => (i === index ? row : r)))
    },
    [dataIO, rowKeyPath, selectedIO],
  )

  const [columnState, setColumnState] = useState<ColumnState<Row>>(() => {
    return defaultColumnState.map((col) => ({
      path: col.path,
      width: col.width ?? DEFAULT_WIDTH,
      hidden: col.hidden ?? false,
    }))
  })

  const updateColumnOrder: UseTableReturn<Row>['updateColumnOrder'] =
    useCallback((startIndex, endIndex) => {
      setColumnState((pre) => {
        const result = Array.from(pre)
        const [removed] = result.splice(startIndex, 1)
        result.splice(endIndex, 0, removed)

        return result
      })
    }, [])

  const updateColumnHidden: UseTableReturn<Row>['updateColumnHidden'] =
    useCallback((path, nextHidden) => {
      setColumnState((pre) => {
        const result = Array.from(pre)
        const index = result.findIndex((col) => isEqual(col.path, path))
        result[index].hidden = nextHidden

        return result
      })
    }, [])

  const updateColumnWidth: UseTableReturn<Row>['updateColumnWidth'] =
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
    data: dataIO.value,
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
