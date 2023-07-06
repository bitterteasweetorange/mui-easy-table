import { Box, BoxProps } from '@mui/material'

export type EasyRowProps = BoxProps & {
  isSelected?: boolean
}
export function EasyRow(props: EasyRowProps) {
  const { children, isSelected, ...rest } = props
  return (
    <Box
      {...rest}
      sx={{
        display: 'contents',
        backgroundColor: isSelected ? '#eee' : 'white',
        '&:hover': {
          backgroundColor: isSelected ? '#d9d9d9' : '#f6f6f6',
        },
      }}
    >
      {children}
    </Box>
  )
}
