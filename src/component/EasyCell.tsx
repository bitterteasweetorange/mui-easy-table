import { Box, BoxProps, useTheme } from '@mui/material'

export interface EasyCellProps extends BoxProps {
  /**
   * @default 'left'
   * */
  align?: 'left' | 'center' | 'right'
}

const padding = 8
export function EasyCell({ height, width, align = 'left', children, sx, ...boxProps }: EasyCellProps) {
  const { palette } = useTheme()
  return (
    <Box
      {...boxProps}
      sx={{
        maxWidth: width,
        minWidth: width,
        width: width,
        borderBottom: `1px solid ${palette.divider}`,
        position: 'relative',
        height,
        boxSizing: 'border-box',
        padding: `0 ${padding}px`,
        display: 'flex',
        alignItems: 'center',
        justifyContent: align === 'left' ? 'start' : align === 'center' ? 'center' : 'end',
        ...sx,
      }}
    >
      {children}
    </Box>
  )
}
