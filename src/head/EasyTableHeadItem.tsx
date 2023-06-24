import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward'
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward'
import { Box, BoxProps, IconButton, useTheme } from '@mui/material'
import { ResizableBox } from 'react-resizable'
import { UseIOReturn } from 'react-utils-ts'
import { EasyCell } from '../component/EasyCell'
import { EasyTableHeadItemSetting } from './EasyTableHeadItemSetting'

export interface EasyTableHeadItemProps extends BoxProps {
  width: number
  /**
   * resize
   * */
  onWidthChange?: (width: number) => void
  headerName: string
  /**
   * @default 'left'
   * */
  align?: 'left' | 'center' | 'right'
  /**
   * if passed, the column will be sortable,
   * */
  sortIO?: UseIOReturn<EasyTableHeadItemSort>
  showSettingIcon?: boolean
  showResizeIcon?: boolean
}

export type EasyTableHeadItemSort = 'asc' | 'desc' | 'none'

export const headHeight = 56
export function EasyTableHeadItem({ showResizeIcon, width, onWidthChange, ...props }: EasyTableHeadItemProps) {
  const { palette } = useTheme()
  return onWidthChange ? (
    <ResizableBox
      style={{ position: 'relative' }}
      width={width}
      height={headHeight}
      minConstraints={[100, headHeight]}
      maxConstraints={[1000, headHeight]}
      onResize={(_, data) => {
        onWidthChange?.(data.size.width)
      }}
      handle={
        <Box
          sx={{
            visibility: showResizeIcon ? 'visible' : 'hidden',
            position: 'absolute',
            top: 20,
            right: -7,
            width: 16,
            height: 16,
            cursor: 'col-resize',
            display: 'flex',
            justifyContent: 'center',
            '&:hover': {
              '& div': {
                background: palette.primary.main,
              },
            },
          }}
        >
          <Box
            sx={{
              cursor: 'col-resize',
              width: 2,
              height: 16,
              background: palette.divider,
            }}
          ></Box>
        </Box>
      }
    >
      <Content {...props} width={width} />
    </ResizableBox>
  ) : (
    <Content {...props} width={width} />
  )
}

function Content(props: EasyTableHeadItemProps) {
  const { showSettingIcon, width, sortIO, headerName, align = 'left', ...restProps } = props
  return (
    <EasyCell
      {...restProps}
      height={headHeight}
      width={width}
      sx={{
        display: 'flex',
        flexDirection: align === 'right' ? 'row-reverse' : 'row',
        position: 'relative',
        fontWeight: 'bold',
        alignItems: 'center',
        justifyContent: align === 'left' ? 'start' : align === 'right' ? 'end' : 'center',
        '&:hover': {
          '& button': {
            visibility: 'visible',
          },
          '& svg': {
            visibility: 'visible',
          },
        },
      }}
    >
      {headerName}
      {sortIO && (
        <IconButton
          onClick={() => {
            const { value, onChange } = sortIO
            switch (value) {
              case 'none':
                onChange?.('asc')
                return
              case 'asc':
                onChange?.('desc')
                return
              case 'desc':
                onChange?.('none')
                return
              default:
                onChange?.('none')
            }
          }}
          size='small'
        >
          {sortIO.value === 'none' && (
            <ArrowUpwardIcon
              sx={{
                visibility: 'hidden',
              }}
              fontSize='small'
              color='disabled'
            />
          )}
          {sortIO.value === 'asc' && <ArrowUpwardIcon fontSize='small' color='primary' />}
          {sortIO.value === 'desc' && <ArrowDownwardIcon fontSize='small' color='primary' />}
        </IconButton>
      )}
      {showSettingIcon && (
        <EasyTableHeadItemSetting
          sx={{
            visibility: 'hidden',
          }}
        />
      )}
    </EasyCell>
  )
}
