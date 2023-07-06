import { FieldValues } from 'react-hook-form'
import sortArray from 'sort-array'
import { EasyHeadSortProps } from '../EasyHead'

export function sortData<T extends FieldValues>(
  data: T[],
  sort: EasyHeadSortProps<T>,
) {
  if (sort === null) return data
  return sortArray(data, {
    by: sort.path,
    order: sort.direction,
  })
}
