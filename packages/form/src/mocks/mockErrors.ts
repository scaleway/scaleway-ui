import type { FormErrors } from '../types'

export const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i

export const mockErrors: FormErrors = {
  maxDate: ({ maxDate }) => `Date must be lower than ${maxDate?.toString()}`,
  maxLength: ({ maxLength }) =>
    `This field should have a length lower than ${maxLength}`,
  minDate: ({ minDate }) => `Date must be greater than ${minDate?.toString()}`,
  minLength: ({ minLength }) =>
    `This field should have a length greater than ${minLength}`,
  pattern: () => `This field should match the regex`,
  required: () => 'This field is required',
  max: ({ max }) => `This field is too high (maximum is : ${max})`,
  min: ({ min }) => `This field is too low (minimum is: ${min})`,
}
