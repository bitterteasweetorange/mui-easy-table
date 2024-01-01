import { FilterAlt } from '@mui/icons-material'
import {
  Checkbox,
  IconButton,
  ListItemIcon,
  ListItemText,
  MenuItem,
  Paper,
} from '@mui/material'
import React, { ReactNode, useState } from 'react'
import { EasyPopper } from 'src/component'

export type EasyFilterSetting<T> = {
  type: 'singleSelect' | 'multiSelect'
  options: {
    label: ReactNode
    value: T
  }[]
}

export type EasyFilterProsp<T> = {
  value: T[]
  onChange: (nextValue: T[]) => void
  filterSetting: EasyFilterSetting<T>
}
export function EasyFilter<T>(props: EasyFilterProsp<T>) {
  const [open, setOpen] = useState(false)
  const anchorRef = React.useRef<HTMLButtonElement>(null)

  const { filterSetting, value, onChange } = props

  if (!filterSetting) return null
  const { type, options } = filterSetting
  return (
    <>
      <EasyPopper
        anchorRef={anchorRef}
        open={open}
        onClose={() => {
          setOpen(false)
        }}
      >
        <Paper>
          {type === 'multiSelect' || type === 'singleSelect' ? (
            <>
              {options.map(({ label, value: op }, index) => {
                const selected = value?.includes?.(op)
                return (
                  <MenuItem
                    key={index}
                    selected={selected}
                    onClick={() => {
                      if (type === 'multiSelect') {
                        if (selected) {
                          onChange(value.filter((v) => v !== op))
                        } else {
                          onChange([...value, op])
                        }
                      } else {
                        onChange(selected ? [] : [op])
                        setOpen(false)
                      }
                    }}
                  >
                    {type === 'multiSelect' && (
                      <ListItemIcon>
                        <Checkbox checked={selected} />
                      </ListItemIcon>
                    )}
                    <ListItemText>{label}</ListItemText>
                  </MenuItem>
                )
              })}
            </>
          ) : null}
        </Paper>
      </EasyPopper>
      <IconButton
        color={value.length === 0 ? 'default' : 'success'}
        ref={anchorRef}
        onClick={() => {
          setOpen(true)
        }}
      >
        <FilterAlt fontSize="small" />
      </IconButton>
    </>
  )
}
