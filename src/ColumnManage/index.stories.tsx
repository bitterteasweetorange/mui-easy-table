import type { Meta } from '@storybook/react'
import { Path } from 'react-hook-form'
import { useIO } from 'react-utils-ts'
import { ColumnManage } from '../ColumnManage'
import { MockShape, columns } from '../stories/mock'

const meta = {
  title: 'component/ColumnManage',
  component: ColumnManage,
} satisfies Meta<typeof ColumnManage>

export default meta

export const Defalut = () => {
  const hideListIO = useIO<(Path<MockShape> | 'actions')[]>(['name.lastName'])
  return (
    <ColumnManage<MockShape>
      hideListIO={hideListIO}
      columns={columns}
    ></ColumnManage>
  )
}
