import { Box, BoxProps, useTheme } from '@mui/material'

export interface EasyCellProps extends BoxProps {
  /**
   * @default 'left'
   * */
  align?: 'left' | 'center' | 'right'
  /**
   * @default: bottom
   * */
  cellBorder?: 'bottom' | 'top' | 'none'
}

const padding = 12
export const BODY_HEIGHT = 52
export function EasyCell({
  align = 'left',
  children,
  height,
  sx,
  cellBorder = 'bottom',
  ...boxProps
}: EasyCellProps) {
  const { palette } = useTheme()
  return (
    <Box
      {...boxProps}
      sx={{
        backgroundColor: 'inherit',
        height,
        borderBottom:
          cellBorder === 'bottom' ? `1px solid ${palette.divider}` : undefined,
        borderTop:
          cellBorder === 'top' ? `1px solid ${palette.divider}` : undefined,
        position: 'relative',
        boxSizing: 'border-box',
        padding: `0 ${padding}px`,
        display: 'flex',
        alignItems: 'center',
        justifyContent:
          align === 'left' ? 'start' : align === 'center' ? 'center' : 'end',
        ...sx,
      }}
    >
      {children}
    </Box>
  )
}
