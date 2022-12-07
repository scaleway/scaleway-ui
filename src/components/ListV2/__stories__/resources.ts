import { ComponentProps } from 'react'
import { List } from '..'

export const data: ComponentProps<typeof List<Record<string, string>>>['data'] =
  Array.from({ length: 10 }, (_, index) => index + 1).map(rowNum => ({
    id: `${rowNum}`,
    a: `Row ${rowNum} Column 1`,
    b: `Row ${rowNum} Column 2`,
    c: `Row ${rowNum} Column 3`,
    d: `Row ${rowNum} Column 4`,
    e: `Row ${rowNum} Column 5`,
  }))

export const columns: NonNullable<ComponentProps<typeof List>['columns']> =
  Array.from({ length: 5 }, (_, index) => index + 1).map(columnNumber => ({
    label: `Column ${columnNumber}`,
    id: `${columnNumber}`,
  }))
