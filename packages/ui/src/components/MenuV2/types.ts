import type {
  ButtonHTMLAttributes,
  ComponentProps,
  ReactElement,
  ReactNode,
  Ref,
} from 'react'
import type { Popup } from '../Popup'
import type { SIZES } from './constants'

type ChildMenuProps = {
  toggle: () => void
}

type DisclosureElement =
  | ((
      disclosure: DisclosureProps,
    ) => ReactElement<ButtonHTMLAttributes<HTMLButtonElement>>)
  | (ReactElement<ButtonHTMLAttributes<HTMLButtonElement>> & {
      ref?: Ref<HTMLButtonElement>
    })

export type DisclosureProps = { visible: boolean }

export type MenuProps = {
  id?: string
  ariaLabel?: string
  /*
   * CHILDREN AS FUNCTION IS DEPRECATED: use `hideOnClickWithin` prop instead
   */
  children?: ReactNode | (({ toggle }: ChildMenuProps) => ReactNode)
  className?: string
  disclosure: DisclosureElement
  hasArrow?: boolean
  visible?: boolean
  'data-testid'?: string
  maxHeight?: string
  /**
   * @deprecated: use `size` instead
   */
  maxWidth?: string
  /**
   * By default, the portal target is children container or document.body if children is a function. You can override this
   * behavior by setting a portalTarget prop.
   */
  portalTarget?: HTMLElement
  /**
   * @deprecated The size of the menu is automatic now to fit the content. Use this prop to set a fixed size.
   */
  size?: keyof typeof SIZES
  /**
   * The behavior of the menu when it is opened. If set to `click`, the menu will open when the user clicks on the disclosure.
   * If set to `hover`, the menu will open when the user hovers over the disclosure.
   */
  triggerMethod?: 'click' | 'hover'
  /**
   * If set to true, the menu will be searchable. This will add a search input at the top of the menu.
   * This doesn't work when children is a function.
   */
  searchable?: boolean
  /**
   * When set to true the menu will automatically close when a `MenuV2.Item` is clicked.
   */
  hideOnClickItem?: boolean
} & Pick<
  ComponentProps<typeof Popup>,
  'placement' | 'dynamicDomRendering' | 'align'
>
