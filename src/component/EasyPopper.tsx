import { ClickAwayListener, Grow, Paper, Popper } from '@mui/material'
import React, { type ReactElement } from 'react'
import { type UseIOReturn } from 'react-utils-ts'

export function EasyPopper({
  children,
  anchorRef,
  openIO,
}: {
  children: ReactElement
  anchorRef: React.RefObject<HTMLButtonElement>
  openIO: UseIOReturn<boolean>
}) {
  const handleClose = (event: Event | React.SyntheticEvent) => {
    if (
      anchorRef.current &&
      anchorRef.current.contains(event.target as HTMLElement)
    ) {
      return
    }

    openIO.onChange(false)
  }

  return (
    <Popper
      sx={{
        zIndex: 1000,
      }}
      open={openIO.value}
      anchorEl={anchorRef.current}
      transition
      disablePortal
    >
      {({ TransitionProps, placement }) => (
        <Grow
          {...TransitionProps}
          style={{
            transformOrigin:
              placement === 'bottom-start' ? 'left top' : 'left bottom',
          }}
        >
          <Paper elevation={6}>
            <ClickAwayListener onClickAway={handleClose}>
              {children}
            </ClickAwayListener>
          </Paper>
        </Grow>
      )}
    </Popper>
  )
}
