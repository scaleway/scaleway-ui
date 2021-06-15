import { css, keyframes } from '@emotion/react'
import styled from '@emotion/styled'
import { transparentize } from 'polished'
import PropTypes from 'prop-types'
import React, { useCallback } from 'react'
import Box from '../Box'
import Checkbox from '../Checkbox'
import Tooltip from '../Tooltip'
import BaseCell from './Cell'
import SortIcon from './SortIcon'
import { useListContext } from './context'

export const BORDER_THICKNESS = 1

const getBorderColor = ({ alert, highlighted, selected, theme }) => {
  if (alert) return theme.colors.orange
  if (selected || highlighted) return theme.colors.primary

  return theme.colors.gray350
}

const fadeInAnimation = keyframes`
  0% {
    opacity: 0;
  }

  100% {
    opacity: 1;
  }
`

export const Cell = styled(BaseCell)``

const StyledExpendableContainer = styled('div', {
  shouldForwardProp: prop => !['multiselect'].includes(prop),
})`
  flex: 0 0 100%;

  [data-expandable] {
    border-top: 1px solid ${({ theme }) => theme.colors.gray200};
    padding: 16px 16px 8px ${({ multiselect }) => (multiselect ? 48 : 16)}px;
    margin-top: 8px;

    > * + * {
      margin: 16px 0;
    }

    > *:last-child {
      margin: 0;
    }
  }
`

const StyledRow = styled(Box, {
  shouldForwardProp: prop =>
    ![
      'animated',
      'openable',
      'alert',
      'highlighted',
      'isHoverable',
      'multiselect',
      'id',
      'selected',
    ].includes(prop),
})`
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  ${({ animated }) =>
    animated
      ? css`
          animation: ${fadeInAnimation} 1s linear;
        `
      : ''}

  border: ${BORDER_THICKNESS}px solid ${getBorderColor};
  border-radius: 4px;
  margin-bottom: 16px;
  padding: 8px 0;
  transition: box-shadow 200ms ease, border-color 200ms ease;
  background-color: ${({ alert, theme }) => alert && theme.colors.lightOrange};

  cursor: ${({ openable }) => (openable ? 'pointer' : 'auto')};
  color: ${({ alert, theme }) => (alert ? theme.colors.orange : 'inherit')};

  ${({ highlighted, isHoverable, theme }) =>
    isHoverable
      ? `&:hover${highlighted ? ', &' : ''} {
        border-color: ${theme.colors.primary};
        box-shadow: 0 2px 14px 8px ${transparentize(0.5, theme.colors.gray200)};
      }`
      : ''}

  [data-visibility='hover'] {
    opacity: 0;
  }
  &:hover [data-visibility='hover'] {
    opacity: 1;
  }

  ${Cell} {
    padding: 0 8px;
    min-height: 48px;
    font-size: 14px;

    &:first-of-type {
      padding-left: ${({ multiselect }) => (multiselect ? 0 : 16)}px;
    }
  }
`

const StyledCheckboxContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0px ${({ theme }) => theme.space[1]};
`

const StyledContainerSummary = styled.div`
  display: flex;
  align-items: center;
  flex-wrap: wrap;
`

const StyledHeader = styled('div', {
  shouldForwardProp: prop => !['multiselect'].includes(prop),
})`
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  padding: 0 ${BORDER_THICKNESS}px;

  > ${Cell} {
    font-size: 14px;
    color: ${({ theme }) => theme.colors.gray550};
    height: 40px;

    padding: 0 8px;

    &:first-of-type {
      padding-left: ${({ multiselect }) => (multiselect ? 0 : 16)}px;
    }

    &[disabled] {
      pointer-events: none;
    }
  }
`

const StyledSummary = styled.summary`
  width: 100%;
  list-style-type: none;
  &::before,
  &::after {
    content: none;
  }
  &::-webkit-details-marker {
    display: none;
  }
  &::-marker {
    display: none;
  }
`
export const Header = props => {
  const {
    columns,
    isLoading,
    sortOrder,
    sortedIndex,
    onSort,
    multiselect,
    selectAll,
    unselectAll,
    hasAllSelected,
  } = useListContext()

  const onSortEvent = useCallback(
    (event, sort, index) => {
      event.preventDefault()
      if (sort) {
        onSort(index)
      }
    },
    [onSort],
  )

  return (
    <StyledHeader multiselect={multiselect} {...props}>
      {multiselect && (
        <StyledCheckboxContainer>
          <Checkbox
            display="flex"
            justifyContent="center"
            alignItems="center"
            name="select-rows"
            value="all"
            checked={hasAllSelected}
            size={20}
            disabled={isLoading}
            onChange={() => {
              if (hasAllSelected) {
                unselectAll()
              } else {
                selectAll()
              }
            }}
          />
        </StyledCheckboxContainer>
      )}
      {columns.map(({ label, sort, width }, index) => (
        <Cell
          key={label ?? index}
          role="button"
          tabIndex={label ? 0 : undefined}
          aria-label={`sort ${label ?? index}`}
          disabled={isLoading}
          onClick={e => (label ? onSortEvent(e, sort, index) : undefined)}
          onKeyPress={e => onSortEvent(e, sort, index)}
          style={{
            alignItems: 'center',
            cursor: sort ? 'pointer' : 'default',
            width,
          }}
        >
          <Box
            overflow="hidden"
            textOverflow="ellipsis"
            as="span"
            color={sortedIndex === index ? 'primary' : undefined}
          >
            {label}
          </Box>
          {sort && (
            <SortIcon active={sortedIndex === index} order={sortOrder} />
          )}
        </Cell>
      ))}
    </StyledHeader>
  )
}

export const ExpendableContent = ({
  children,
  id,
  rowsState,
  isToggled,
  ...props
}) => (
  <Box data-expandable {...props}>
    {typeof children === 'function'
      ? children({
          id,
          isToggled: rowsState[id]?.opened,
        })
      : children}
  </Box>
)

ExpendableContent.propTypes = {
  children: PropTypes.oneOfType([PropTypes.func, PropTypes.node]).isRequired,
  id: PropTypes.string,
  isToggled: PropTypes.bool,
  rowsState: PropTypes.shape({}),
}

ExpendableContent.defaultProps = {
  id: undefined,
  isToggled: false,
  rowsState: {},
}

export const Row = ({
  id,
  children,
  animated,
  edition,
  isEditable,
  isHoverable,
  locked,
  alert,
  customStyle,
  open,
  ...props
}) => {
  const {
    multiselect,
    rowsState,
    setRowState,
    hasSelectedItems,
    selectableItems,
    notSelectableText,
  } = useListContext()

  const {
    selected = edition || false,
    forceOpened = false,
    opened = open,
    highlighted = false,
  } = rowsState[id] || {}

  const finalChildren = React.Children.toArray(children).map(child =>
    child.type === ExpendableContent
      ? React.cloneElement(child, {
          id,
          isToggled: forceOpened || opened,
          rowsState,
        })
      : child,
  )

  const expandable = !!finalChildren.find(
    child => child.type === ExpendableContent,
  )

  const isSelectable = !!selectableItems[id]

  const expendableContent = finalChildren.map(
    child => child.type === ExpendableContent && child,
  )
  const content = finalChildren.map(
    child => child.type !== ExpendableContent && child,
  )

  const handleToggle = event => {
    setRowState(id, {
      opened: event.target.open,
    })
  }

  const hasExpandableContent = expendableContent.find(
    localContent => localContent,
  )

  const CustomDetails = hasExpandableContent ? 'details' : 'div'
  const CustomSummary = hasExpandableContent ? 'summary' : 'div'

  return (
    <StyledRow
      role="listitem"
      animated={animated}
      id={id}
      open={expendableContent && (forceOpened || opened)}
      isHoverable={isHoverable && !isEditable && !alert}
      openable={expandable && !forceOpened}
      highlighted={highlighted}
      selected={selected}
      multiselect={multiselect}
      alert={alert}
      css={[customStyle]}
      as={CustomDetails}
      data-testid={`row-${id}`}
      onToggle={handleToggle}
    >
      <StyledSummary as={CustomSummary}>
        <StyledContainerSummary {...props}>
          {multiselect && (
            <StyledCheckboxContainer>
              {!locked && (
                <Tooltip
                  baseId={`list-tooltip-row-${id}`}
                  text={!isSelectable ? notSelectableText : undefined}
                >
                  <Checkbox
                    value={id}
                    display="flex"
                    justifyContent="center"
                    alignItems="center"
                    data-visibility={hasSelectedItems ? '' : 'hover'}
                    checked={selected}
                    disabled={!isSelectable}
                    size={20}
                    name="select-rows"
                    onChange={e =>
                      setRowState(id, { selected: e.target.checked })
                    }
                  />
                </Tooltip>
              )}
            </StyledCheckboxContainer>
          )}
          {content}
        </StyledContainerSummary>
      </StyledSummary>
      <StyledExpendableContainer multiselect={multiselect}>
        {expendableContent}
      </StyledExpendableContainer>
    </StyledRow>
  )
}

Row.propTypes = {
  alert: PropTypes.bool,
  animated: PropTypes.bool,
  children: PropTypes.node.isRequired,
  customStyle: PropTypes.oneOfType([PropTypes.string, PropTypes.func]),
  edition: PropTypes.bool,
  id: PropTypes.string,
  isEditable: PropTypes.bool,
  isHoverable: PropTypes.bool,
  locked: PropTypes.bool,
  open: PropTypes.bool,
  to: PropTypes.string,
}

Row.defaultProps = {
  alert: undefined,
  animated: undefined,
  customStyle: undefined,
  edition: false,
  id: undefined,
  isEditable: false,
  isHoverable: true,
  locked: false,
  open: false,
  to: undefined,
}
