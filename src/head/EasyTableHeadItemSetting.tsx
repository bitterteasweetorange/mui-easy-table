import MoreVertIcon from '@mui/icons-material/MoreVert'
import ViewColumnRoundedIcon from '@mui/icons-material/ViewColumnRounded'
import { IconButton, ListItemIcon, ListItemText, MenuItem, MenuList, SxProps } from '@mui/material'
import React from 'react'
import { useIO } from 'react-utils-ts'
import { EasyPopper } from '../component/EasyPopper'

export function EasyTableHeadItemSetting({ sx }: { sx?: SxProps }) {
  const openIO = useIO(false)

  const anchorRef = React.useRef<HTMLButtonElement>(null)
  return (
    <>
      <IconButton size='small' sx={sx}>
        <MoreVertIcon fontSize='small' />
      </IconButton>
      <EasyPopper anchorRef={anchorRef} openIO={openIO}>
        <MenuList>
          <MenuItem>
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
