import { isValidElement, cloneElement, ReactNode } from 'react'
import {
  DocsContainer as BaseContainer,
  DocsContainerProps as BaseContainerProps,
} from '@storybook/blocks'
import { ThemeProvider } from '@emotion/react'
import { consoleLightTheme as lightTheme } from '@ultraviolet/themes'

type ExtraProps = {
  /**
   * When a component is deprecated we can set this property to true
   */
  deprecated: boolean
  /**
   * When a component is deprecated we can why and by what to replace it
   */
  deprecatedReason: string
  /**
   * When a component is deprecated we can add a link to the migration guide
   */
  migrationLink: string
  /**
   * This prop, if set to true, will hide the args table where you have the props definition and controls
   */
  hideArgsTable?: boolean
  /**
   * This prop can be used to define if a component is being tested and not prod ready
   */
  experimental?: boolean
}

type DocsContainerProps = BaseContainerProps & {
  context?: {
    attachedCSFFiles: Set<any>
  }
} & { children: ReactNode }

const DocsContainer = ({ children, context }: DocsContainerProps) => {
  const scope = context?.attachedCSFFiles?.values()?.next()?.value?.meta
  const parameters = scope?.parameters

  const isPlusLibrary = scope?.title?.includes('Plus/') ?? false

  return (
    <ThemeProvider theme={lightTheme}>
      <BaseContainer context={context}>
        {isValidElement<ExtraProps>(children)
          ? cloneElement(children, {
            deprecated: parameters?.deprecated,
            deprecatedReason: parameters?.deprecatedReason,
            migrationLink: parameters?.migrationLink,
            hideArgsTable: parameters?.hideArgsTable,
            experimental: isPlusLibrary ? true : parameters?.experimental,
          })
          : children}
      </BaseContainer>
    </ThemeProvider>
  )
}

export default DocsContainer
