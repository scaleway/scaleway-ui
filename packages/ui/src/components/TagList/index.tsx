import styled from '@emotion/styled'
import { consoleLightTheme } from '@ultraviolet/themes'
import { useEffect, useMemo, useRef, useState } from 'react'
import type { ComponentProps } from 'react'
import { createPortal } from 'react-dom'
import { Popover } from '../Popover'
import { Tag } from '../Tag'

const TAGS_GAP = consoleLightTheme.space['1']

const StyledContainer = styled.div`
  display: flex;
`

const TagsWrapper = styled.span`
  cursor: pointer;
  color: ${({ theme }) => theme.colors.primary.text};
  border: none;
  font-size: 14px;
  align-self: center;
  max-width: 350px;
  overflow: hidden;
  white-space: pre;
  text-overflow: ellipsis;
  background-color: transparent;
  padding-left: 8px;
  padding-right: 8px;
`

const StyledTagContainer = styled.div<{
  elementsGap: string
  multiline?: boolean
  popoverTriggerWidth?: number
}>`
  display: flex;
  align-items: center;
  color: ${({ theme }) => theme.colors.neutral.text};
  gap: ${({ elementsGap }) => elementsGap};
  ${({ multiline }) => multiline && `flex-wrap: wrap;`};

  // to handle the case where we have one tag and we need to ellipsis it
  ${({ popoverTriggerWidth }) =>
    popoverTriggerWidth &&
    `
      &:has(.ellipsed) {
        width: calc(100% - ${popoverTriggerWidth}px); // to let space for the +X button
        max-width: fit-content;
      }
    
      & * {
        width: 100% !important;
        max-width: fit-content;
      }
  `};
`

type TagType =
  | string
  | { label: string; icon: NonNullable<ComponentProps<typeof Tag>['icon']> }

type TagListProps = {
  /**
   * This property define maximum characters length of all tags until it hide tags into tooltip.
   */
  maxLength?: number
  tags?: TagType[]
  /**
   * This property define maximum characters length of all tags until it hide tags into tooltip.
   * NB: this will be overridden if the parent width is smaller and cannot show all the tags
   */
  threshold?: number
  /**
   * This property define maximum width of each tag. This doesn't apply for tags in tooltip.
   */
  multiline?: boolean
  /**
   * This property define the title of the Popover, when some tags are hidden because of the threshold.
   */
  popoverTitle: string
  /**
   * The popover will be placed automatically by default. You can also specify the placement of the popover through
   * this property.
   */
  popoverPlacement?: ComponentProps<typeof Popover>['placement']
  className?: string
  'data-testid'?: string
} & Pick<ComponentProps<typeof Tag>, 'copiable' | 'copyText' | 'copiedText'>

const DEFAULT_TAGS: TagListProps['tags'] = []

const getTagLabel = (tag: NonNullable<TagListProps['tags']>[number]) =>
  typeof tag === 'object' ? tag.label : tag

/**
 * This component is used to display a list of tags with a threshold and a popover when there are too many tags.
 */
export const TagList = ({
  maxLength = 600,
  tags = DEFAULT_TAGS,
  threshold = 1,
  multiline = false,
  popoverTitle,
  popoverPlacement,
  copiable,
  copyText,
  copiedText,
  className,
  'data-testid': dataTestId,
}: TagListProps) => {
  const containerRef = useRef<HTMLDivElement>(null)
  const measureRef = useRef<HTMLDivElement>(null)
  const popoverTriggerRef = useRef<HTMLDivElement>(null)

  const [isPopoverVisible, setIsPopoverVisible] = useState(false)
  const [popoverTriggerWidth, setPopoverTriggerWidth] = useState(0)
  const [visibleTags, setVisibleTags] = useState<TagType[]>([])
  const [hiddenTags, setHiddenTags] = useState<TagType[]>([])

  // Compute tmpThreshold, potentially visible tags and surely hidden tags
  const memoizedResult = useMemo(() => {
    let tmpThreshold = threshold
    if (
      tags.length > 0 &&
      tags
        .slice(0, tmpThreshold)
        .reduce<string>((acc, tag) => acc + getTagLabel(tag), '').length >
        maxLength
    ) {
      tmpThreshold -= 1
    }

    const potentiallyVisibleTagsLength =
      tags.length > tmpThreshold || false ? tmpThreshold : tags.length
    const potentiallyVisibleTags = tags.slice(0, potentiallyVisibleTagsLength)
    const surelyHiddenTags = tags.slice(potentiallyVisibleTagsLength)

    return {
      tmpThreshold,
      potentiallyVisibleTags,
      surelyHiddenTags,
    }
  }, [maxLength, tags, threshold])

  const { tmpThreshold, potentiallyVisibleTags, surelyHiddenTags } =
    memoizedResult

  // compute visible tags and hidden ones based on the container width and
  // what can fit into it from the potentially visible tags
  useEffect(() => {
    if (!tags.length || !containerRef.current || !measureRef.current) {
      return
    }

    if (multiline) {
      setVisibleTags(potentiallyVisibleTags)
      setHiddenTags(surelyHiddenTags)

      return
    }

    const parentWidth = containerRef.current.parentElement?.clientWidth || 0
    let accumulatedWidth = 0
    const measuredVisibleTags = []
    const measuredHiddenTags = []

    const measureElements = measureRef.current.children[0].children
    for (let i = 0; i < measureElements.length; i += 1) {
      accumulatedWidth +=
        (measureElements[i] as HTMLDivElement).offsetWidth +
        parseInt(TAGS_GAP, 10)
      if (accumulatedWidth <= parentWidth) {
        measuredVisibleTags.push(tags[i])
      } else {
        measuredHiddenTags.push(tags[i])
      }
    }

    setVisibleTags(measuredVisibleTags)
    setHiddenTags(measuredHiddenTags.concat(surelyHiddenTags))
  }, [multiline, potentiallyVisibleTags, surelyHiddenTags, tags, tmpThreshold])

  // get the popover trigger ref when we show it to be able to:
  // - add a first tag with ellipsis when the first tag does not fit in the parent container
  // - adjust the size of the first tag we do this only when we show one tag and we have more hidden ones
  useEffect(() => {
    if (popoverTriggerRef.current?.clientWidth) {
      const newPopoverTriggerWidth = popoverTriggerRef.current.clientWidth

      // a check to know if we need to ellipsis the first tag when needed
      if (visibleTags.length === 1 && hiddenTags.length > 0) {
        setPopoverTriggerWidth(newPopoverTriggerWidth)
      }

      // add a first tag with ellipsis when the first tag does not fit in the parent container
      if (visibleTags.length === 0 && hiddenTags.length > 0) {
        const visibleTagsCopy = [...visibleTags]
        const hiddenTagsCopy = [...hiddenTags]

        const tagToMove = hiddenTagsCopy.pop()
        visibleTagsCopy.push(tagToMove as TagType)

        setVisibleTags(visibleTagsCopy)
        setHiddenTags(hiddenTagsCopy)

        return
      }

      // remove the last tag if we have a popover and add it to the hidden tags
      const tagsContainer = containerRef.current
      const tagsContainerWidth = containerRef.current?.clientWidth || 0
      const parentWidth = tagsContainer?.parentElement?.clientWidth || 0

      if (
        hiddenTags.length > 0 &&
        tagsContainerWidth + newPopoverTriggerWidth > parentWidth
      ) {
        const visibleTagsCopy = [...visibleTags]
        const hiddenTagsCopy = [...hiddenTags]

        const tagToMove = visibleTagsCopy.pop()
        hiddenTagsCopy.unshift(tagToMove as TagType)

        setVisibleTags(visibleTagsCopy)
        setHiddenTags(hiddenTagsCopy)
      }
    }
  }, [hiddenTags, threshold, visibleTags, visibleTags.length])

  if (!tags.length) {
    return null
  }

  const renderTag = (tag: TagType, index: number, isEllipsis = false) => (
    <Tag
      // useful when two tags are identical `${tag}-${index}`
      key={`${getTagLabel(tag)}-${index}`}
      copiable={copiable}
      copyText={copyText}
      copiedText={copiedText}
      icon={typeof tag === 'object' ? tag.icon : undefined}
      className={isEllipsis ? 'ellipsed' : ''}
    >
      {getTagLabel(tag)}
    </Tag>
  )

  return (
    <StyledContainer className={className} data-testid={dataTestId}>
      <StyledTagContainer
        elementsGap={TAGS_GAP}
        multiline={multiline}
        popoverTriggerWidth={popoverTriggerWidth}
        ref={containerRef}
      >
        {visibleTags.map((tag, index) =>
          renderTag(
            tag,
            index,
            // add ellipsis to first tag when it's the only that could fit in the parent container
            index === 0 && visibleTags.length === 1 && hiddenTags.length > 0,
          ),
        )}
      </StyledTagContainer>
      {createPortal(
        <div
          ref={measureRef}
          style={{
            visibility: 'hidden',
            position: 'absolute',
            whiteSpace: 'nowrap',
          }}
        >
          <StyledTagContainer elementsGap={TAGS_GAP}>
            {potentiallyVisibleTags.map((tag, index) => renderTag(tag, index))}
          </StyledTagContainer>
        </div>,
        document.body,
      )}
      {hiddenTags.length > 0 && (
        <Popover
          title={popoverTitle}
          visible={isPopoverVisible}
          size="small"
          onClose={() => setIsPopoverVisible(false)}
          placement={popoverPlacement}
          content={
            <StyledTagContainer multiline elementsGap={TAGS_GAP}>
              {hiddenTags.map((tag, index) => renderTag(tag, index))}
            </StyledTagContainer>
          }
        >
          <TagsWrapper
            ref={popoverTriggerRef}
            data-testid={`${dataTestId ?? 'taglist'}-open`}
            onClick={() => setIsPopoverVisible(true)}
          >
            +{hiddenTags.length}
          </TagsWrapper>
        </Popover>
      )}
    </StyledContainer>
  )
}
