import { ContentCut, FilterAlt } from '@mui/icons-material'
import {
  Checkbox,
  IconButton,
  ListItemIcon,
  ListItemText,
  MenuItem,
} from '@mui/material'
import { Dispatch, SetStateAction, useRef } from 'react'
import { useIO } from 'react-utils-ts'
import { FilterConfig } from 'src/EasyTable'
import { EasyPopper } from 'src/component'

type EasyFilterProsp<T> = {
  value: T[]
  onChange: Dispatch<SetStateAction<T[]>>
  filterSetting: FilterConfig
}
export function EasyFilter<T>(props: EasyFilterProsp<T>) {
  const openIO = useIO(false)
  const anchorRef = useRef<HTMLButtonElement | null>(null)
  const { filterSetting, value, onChange } = props
  const { type, options, render } = filterSetting
  return (
    <>
      <IconButton
        ref={anchorRef}
        onClick={() => {
          openIO.onChange((pre) => !pre)
        }}
      >
        <FilterAlt
          fontSize="small"
          color="disabled"
        />
      </IconButton>
      <EasyPopper
        openIO={openIO}
        anchorRef={anchorRef}
      >
        {type === 'multiSelect' || type === 'singleSelect' ? (
          <>
            {options.map((op, index) => {
              const checked = value.includes(op)
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
                  <ListItemText> {render?.(op) ?? op}</ListItemText>
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
