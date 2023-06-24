import { FieldValues } from 'react-hook-form'
import sortArray from 'sort-array'
import { EasyTableHeadSortProps } from '../head/EasyTableHead'

export function sortData<T extends FieldValues>(data: T[], sort: EasyTableHeadSortProps<T>) {
  if (sort === null) return data
  return sortArray(data, {
    by: sort.path,
    order: sort.direction,
  })
}
