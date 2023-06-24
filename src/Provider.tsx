import React from 'react'
import { FieldValues } from 'react-hook-form'
import { UseTableReturn } from './useTable'

export const EasyTableContext = React.createContext<UseTableReturn<FieldValues>>({
  rowKeyPath: '',
  checkAll: false,
  data: [],
  handleData: {
    // eslint-disable-next-line
    add: () => {},
    // eslint-disable-next-line
    delete: () => {},
    // eslint-disable-next-line
    update: () => {},
  },
  handleSelect: {
    // eslint-disable-next-line
    add: () => {},
    // eslint-disable-next-line
    delete: () => {},
    // eslint-disable-next-line
    switch: () => {},
    // eslint-disable-next-line
    addAll: () => {},
    // eslint-disable-next-line
    deleteAll: () => {},
  },
  selected: [],
  getRowDisabled: () => false,
})

export function EasyTableProvider<T>(props: { value: UseTableReturn<T>; children: React.ReactNode }) {
  return <EasyTableContext.Provider value={props.value as any}>{props.children}</EasyTableContext.Provider>
}
