import { HideSourceOutlined } from '@mui/icons-material'
import MoreVertIcon from '@mui/icons-material/MoreVert'
import ViewColumnRoundedIcon from '@mui/icons-material/ViewColumnRounded'
import {
  IconButton,
  ListItemIcon,
  ListItemText,
  MenuItem,
  MenuList,
  SxProps,
} from '@mui/material'
import React from 'react'
import { useIO } from 'react-utils-ts'
import { EasyPopper } from '../component/EasyPopper'

export function EasyTableHeadItemSetting({
  sx,
  onHideColumn,
  onManageColumns,
  anchorRef,
}: {
  anchorRef: React.RefObject<HTMLLIElement>
  sx?: SxProps
  onHideColumn?: () => void
  onManageColumns: () => void
}) {
  const openIO = useIO(false)

  const anchorRefTrigger = React.useRef<HTMLButtonElement>(null)
  return (
    <>
      <IconButton
        onClick={() => {
          openIO.onChange((state) => !state)
        }}
        size="small"
        sx={sx}
        ref={anchorRefTrigger}
      >
        <MoreVertIcon fontSize="small" />
      </IconButton>
      <EasyPopper anchorRef={anchorRefTrigger} openIO={openIO}>
        <MenuList>
          <MenuItem
            onClick={() => {
              onHideColumn?.()
              openIO.onChange(false)
            }}
          >
            <ListItemIcon>
              <HideSourceOutlined />
            </ListItemIcon>
            <ListItemText>hide column</ListItemText>
          </MenuItem>
          <MenuItem
            ref={anchorRef}
            onClick={() => {
              onManageColumns()
              openIO.onChange(false)
            }}
          >
            <ListItemIcon>
              <ViewColumnRoundedIcon />
            </ListItemIcon>
            <ListItemText>manage columns</ListItemText>
          </MenuItem>
        </MenuList>
      </EasyPopper>
    </>
  )
}
