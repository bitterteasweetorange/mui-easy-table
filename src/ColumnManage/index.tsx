import { Box, Switch } from '@mui/material'
import React from 'react'
import {
  DragDropContext,
  Draggable,
  Droppable,
  OnDragEndResponder,
} from 'react-beautiful-dnd'
import { FieldValues } from 'react-hook-form'
import { UseIOReturn } from 'react-utils-ts'
import { EasyPath } from '../EasyHead'
import { EasyColumnProps } from '../EasyTable'
import { EasyPopper } from '../component'
import { ColumnState } from '../useTable'
import { useDraggableInPortal } from './useDraggableInPortal'

export type ColumnManageProps<
  Row extends FieldValues,
  Filter extends FieldValues | null = null,
> = {
  columnState: ColumnState<Row>
  columns: EasyColumnProps<Row, Filter>[]
  /**
   * update column hidden
   */
  updateColumnHidden: (path: EasyPath<Row>, nextHidden: boolean) => void
  /**
   * order column
   */
  updateColumnOrder: (startIndex: number, endIndex: number) => void
  openIO: UseIOReturn<boolean>
  anchorRef: React.RefObject<HTMLButtonElement>
}

export function ColumnManage<
  Row extends FieldValues,
  Filter extends FieldValues | null = null,
>(props: ColumnManageProps<Row, Filter>) {
  const {
    openIO,
    anchorRef,
    columnState,
    columns,
    updateColumnOrder,
    updateColumnHidden,
  } = props

  const renderDraggable = useDraggableInPortal()
  const onDragEnd: OnDragEndResponder = (result) => {
    if (!result.destination) {
      return
    }
    updateColumnOrder(result.source.index, result.destination.index)
  }

  return (
    <EasyPopper anchorRef={anchorRef} openIO={openIO}>
      <Box p={2}>
        <DragDropContext onDragEnd={onDragEnd}>
          <Droppable droppableId="1">
            {(provided) => (
              <Box {...provided.droppableProps} ref={provided.innerRef}>
                {columnState.map((col, index) => (
                  <Draggable
                    key={col.path}
                    draggableId={col.path}
                    index={index}
                  >
                    {renderDraggable((provided) => (
                      <Box
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        sx={{
                          border: '1px dotted theme.palette.divider',
                          background: 'white',
                        }}
                      >
                        <Switch
                          checked={!col.hidden}
                          onChange={(e) => {
                            const nextChecked = e.target.checked
                            updateColumnHidden(col.path, !nextChecked)
                          }}
                        />
                        {columns.find((x) => x.path === col.path)?.headerName}
                      </Box>
                    ))}
                  </Draggable>
                ))}
                {provided.placeholder}
              </Box>
            )}
          </Droppable>
        </DragDropContext>
      </Box>
    </EasyPopper>
  )
}
