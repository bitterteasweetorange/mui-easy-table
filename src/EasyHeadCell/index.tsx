import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward'
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward'
import { Box, BoxProps, IconButton, useTheme } from '@mui/material'
import { Dispatch, SetStateAction } from 'react'
import { FieldValues } from 'react-hook-form'
import { ResizableBox } from 'react-resizable'
import { UseIOReturn } from 'react-utils-ts'
import { EasyFilter } from 'src/EasyFilter'
import { EasyCell } from '../EasyCell'
import { EasyTableHeadItemSetting } from '../head/EasyTableHeadItemSetting'

export type EasyHeadCellProps<Filter extends FieldValues | null> = Omit<
  BoxProps,
  'width'
> & {
  width: number
  /**
   * resize
   * */
  onWidthChange?: (width: number) => void
  /**
   * @default 'left'
   * */
  align?: 'left' | 'center' | 'right'
  /**
   * if passed, the column will be sortable,
   * */
  sortIO?: UseIOReturn<EasyHeadCellSort>
  showSettingIcon?: boolean
  onHideColumn?: () => void
  openIO: UseIOReturn<boolean>
  anchorRef?: React.RefObject<HTMLLIElement>
  filter?: Filter
  setFilter?: Dispatch<SetStateAction<Filter>>
}

export type EasyHeadCellSort = 'asc' | 'desc' | 'none'

export const HEAD_HEIGHT = 56
export function EasyHeadCell<Filter extends FieldValues | null>({
  width,
  onWidthChange,
  sx,
  ...props
}: EasyHeadCellProps<Filter>) {
  const { palette } = useTheme()
  return onWidthChange ? (
    <ResizableBox
      style={{ position: 'relative', ...(sx as React.CSSProperties) }}
      width={width}
      height={HEAD_HEIGHT}
      minConstraints={[100, HEAD_HEIGHT]}
      maxConstraints={[1000, HEAD_HEIGHT]}
      onResize={(_, data) => {
        onWidthChange?.(data.size.width)
      }}
      handle={
        <Box
          sx={{
            position: 'absolute',
            top: 20,
            right: 0,
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
      <Content<Filter>
        {...props}
        width={width}
      />
    </ResizableBox>
  ) : (
    <Content<Filter>
      {...props}
      width={width}
    />
  )
}

function Content<Filter extends FieldValues | null>(
  props: EasyHeadCellProps<Filter>,
) {
  const {
    showSettingIcon,
    sortIO,
    children: headerName,
    align = 'left',
    onHideColumn,
    openIO,
    anchorRef,
    filter,
    setFilter,
    ...restProps
  } = props
  return (
    <EasyCell
      anchorRef={anchorRef}
      {...restProps}
      height={HEAD_HEIGHT}
      sx={{
        display: 'flex',
        flexDirection: align === 'right' ? 'row-reverse' : 'row',
        position: 'relative',
        fontWeight: 'bold',
        alignItems: 'center',
        justifyContent:
          align === 'left' ? 'start' : align === 'right' ? 'end' : 'center',
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
          size="small"
        >
          {sortIO.value === 'none' && (
            <ArrowUpwardIcon
              sx={{
                visibility: 'hidden',
              }}
              fontSize="small"
              color="disabled"
            />
          )}
          {sortIO.value === 'asc' && (
            <ArrowUpwardIcon
              fontSize="small"
              color="primary"
            />
          )}
          {sortIO.value === 'desc' && (
            <ArrowDownwardIcon
              fontSize="small"
              color="primary"
            />
          )}
        </IconButton>
      )}
      <EasyFilter
        filter={filter}
        setFilter={setFilter}
      />
      {showSettingIcon && (
        <EasyTableHeadItemSetting
          onHideColumn={onHideColumn}
          onManageColumns={() => {
            openIO.onChange?.((pre) => !pre)
          }}
          sx={{
            visibility: 'hidden',
          }}
        />
      )}
    </EasyCell>
  )
}
