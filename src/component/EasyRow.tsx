import { alpha, Box, BoxProps, useTheme } from '@mui/material'

export type EasyRowProps = BoxProps & {
  isSelected?: boolean
}
export function EasyRow(props: EasyRowProps) {
  const { children, isSelected, ...rest } = props
  const { palette } = useTheme()
  return (
    <Box
      {...rest}
      sx={{
        display: 'flex',
        justifyContent: 'start',
        alignItems: 'center',
        height: 51,
        backgroundColor: isSelected ? palette.action.selected : undefined,
        '&:hover': {
          backgroundColor: isSelected ? alpha(palette.action.selected, 0.3) : palette.action.hover,
        },
      }}
    >
      {children}
    </Box>
  )
}
