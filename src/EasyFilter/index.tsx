import { FilterAlt } from '@mui/icons-material'
import { IconButton } from '@mui/material'
import { useRef } from 'react'
import { useIO } from 'react-utils-ts'
import { EasyPopper } from 'src/component'

export function EasyFilter() {
  const openIO = useIO(false)
  const anchorRef = useRef<HTMLButtonElement | null>(null)
  return (
    <>
      <IconButton
        ref={anchorRef}
        onClick={() => {
          openIO.onChange((pre) => !pre)
        }}
      >
        <FilterAlt fontSize="small" color="disabled" />
      </IconButton>
      <EasyPopper openIO={openIO} anchorRef={anchorRef}>
        <div>123</div>
      </EasyPopper>
    </>
  )
}
