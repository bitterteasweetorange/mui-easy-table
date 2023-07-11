import { FilterAlt } from '@mui/icons-material'
import {
  Checkbox,
  IconButton,
  ListItemIcon,
  ListItemText,
  MenuItem,
} from '@mui/material'
import { Dispatch, ReactNode, SetStateAction, useRef } from 'react'
import { useIO } from 'react-utils-ts'
import { EasyPopper } from 'src/component'

export type EasyFilterSetting<T> = {
  type: 'singleSelect' | 'multiSelect'
  options: T[]
  renderOption?: (value: T) => ReactNode
}

export type EasyFilterProsp<T> = {
  value: T[]
  onChange: Dispatch<SetStateAction<T[]>>
  filterSetting: EasyFilterSetting<T>
}
export function EasyFilter<T>(props: EasyFilterProsp<T>) {
  const openIO = useIO(false)
  const anchorRef = useRef<HTMLButtonElement | null>(null)
  const { filterSetting, value, onChange } = props
  if (!filterSetting) return null
  const { type, options, renderOption } = filterSetting
  return (
    <>
      <IconButton
        color={value.length === 0 ? 'default' : 'success'}
        ref={anchorRef}
        onClick={() => {
          openIO.onChange((pre) => !pre)
        }}
      >
        <FilterAlt fontSize="small" />
      </IconButton>
      <EasyPopper openIO={openIO} anchorRef={anchorRef}>
        {type === 'multiSelect' || type === 'singleSelect' ? (
          <>
            {options.map((op, index) => {
              const checked = value?.includes?.(op)
              return (
                <MenuItem
                  key={index}
                  selected={checked}
                  onClick={() => {
                    if (type === 'multiSelect') {
                      onChange((pre) => {
                        if (checked) {
                          return pre.filter((v) => v !== op)
                        } else {
                          return [...pre, op]
                        }
                      })
                    } else {
                      onChange(checked ? [] : [op])
                      openIO.onChange(false)
                    }
                  }}
                >
                  {type === 'multiSelect' && (
                    <ListItemIcon>
                      <Checkbox checked={checked} />
                    </ListItemIcon>
                  )}
                  <ListItemText>
                    {renderOption?.(op) ?? JSON.stringify(op)}
                  </ListItemText>
                </MenuItem>
              )
            })}
          </>
        ) : (
          <div>null</div>
        )}
      </EasyPopper>
    </>
  )
}
