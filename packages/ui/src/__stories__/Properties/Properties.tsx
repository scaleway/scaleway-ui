import styled from '@emotion/styled'
import type { ComponentType } from 'react'
import * as components from '../../components'
import { Stack } from '../../components/Stack'
import { Table } from '../../components/Table'
import { Text } from '../../components/Text'

const StyledText = styled(Text)`
  white-space: break-spaces;
`

const StyledTableRow = styled(Table.Row)`
  vertical-align: top;
`

type PropertyType = {
  defaultValue: {
    value: string
  }
  description: string
  name: string
  required: boolean
  type: {
    name: string
    value?: { value: string }[]
  }
}

type ModuleType =
  | ({
      __docgenInfo: {
        props: Record<string, Record<string, PropertyType>>
      }
      displayName: string
    } & ComponentType) &
      ({
        type: {
          __docgenInfo: {
            props: Record<string, Record<string, PropertyType>>
          }
          displayName: string
        }
      } & ComponentType)

const Properties = () => {
  const componentsList = Object.values(components) as ModuleType[]

  /* eslint-disable no-underscore-dangle */
  const componentNameAndProperties = componentsList.reduce<
    Record<string, Record<string, unknown>>
  >((acc, component) => {
    if (component?.__docgenInfo?.props) {
      return {
        ...acc,
        [component.displayName]: component.__docgenInfo.props,
      }
    }

    if (component?.type?.__docgenInfo?.props) {
      return {
        ...acc,
        [component.type.displayName]: component.type.__docgenInfo.props,
      }
    }

    return acc
  }, {})
  /* eslint-enable no-underscore-dangle */

  const propertiesList = Object.keys(componentNameAndProperties)
    .map(key => Object.keys(componentNameAndProperties[key]))
    .flat()

  const countPropertiesUsages = propertiesList.reduce<Record<string, number>>(
    (acc, property) => {
      if (!acc[property]) {
        acc[property] = 1
      } else {
        acc[property] += 1
      }

      return acc
    },
    {},
  )

  const propertiesUsagesCountAndComponentsName = Object.entries(
    countPropertiesUsages,
  ).reduce<Record<string, { count: number; components: string[] }>>(
    (acc, [property, count]) => {
      const componentsMatching = Object.entries(
        componentNameAndProperties,
      ).reduce<string[]>((accumulator, [component, properties]) => {
        if (Object.keys(properties).includes(property)) {
          return [...accumulator, component]
        }

        return accumulator
      }, [])

      return { ...acc, [property]: { count, components: componentsMatching } }
    },
    {},
  )

  const sortedPropertiesUsagesCountAndComponentsName = Object.entries(
    propertiesUsagesCountAndComponentsName,
  )
    .sort(([, { count: countA }], [, { count: countB }]) => countB - countA)
    .reduce<Record<string, { count: number; components: string[] }>>(
      (acc, [property, value]) => ({
        ...acc,
        [property]: value,
      }),
      {},
    )

  return (
    <Stack gap={3}>
      <Stack gap={2}>
        <Text as="p" variant="body">
          This page is used to track the usage of properties across the library.
        </Text>
        <Text as="p" variant="body">
          <Text as="span" variant="bodyStronger">
            Number of properties
          </Text>
          : {Object.keys(propertiesUsagesCountAndComponentsName).length}
        </Text>
      </Stack>
      <Table>
        <Table.Head>
          <Table.Row>
            <Table.HeadCell>Property Name</Table.HeadCell>
            <Table.HeadCell>Number of usages</Table.HeadCell>
            <Table.HeadCell>Values</Table.HeadCell>
            <Table.HeadCell>Similar property name</Table.HeadCell>
            <Table.HeadCell>Components usage</Table.HeadCell>
          </Table.Row>
        </Table.Head>
        <Table.Body striped>
          {Object.keys(sortedPropertiesUsagesCountAndComponentsName).map(
            property => {
              const lowerCaseProperty = property.toLowerCase()
              const findSimilarProperty = [
                ...new Set(
                  propertiesList
                    .map(localProperty => {
                      const lowerCaseLocalProperty = localProperty.toLowerCase()

                      for (
                        let i = 4;
                        i < lowerCaseLocalProperty.length;
                        i += 1
                      ) {
                        const localPropertySubstring = lowerCaseLocalProperty
                          .substring(0, i)
                          .toLocaleLowerCase()

                        if (
                          lowerCaseProperty.includes(localPropertySubstring) &&
                          lowerCaseLocalProperty !== lowerCaseProperty
                        ) {
                          return localProperty
                        }
                      }

                      const reversedLocalProperty = lowerCaseLocalProperty
                        .split('')
                        .reverse()
                        .join('')
                      const reversedLowerCaseProperty = lowerCaseProperty
                        .split('')
                        .reverse()
                        .join('')

                      for (
                        let i = 4;
                        i < reversedLocalProperty.length;
                        i += 1
                      ) {
                        const reverseLocalPropertySubstring =
                          reversedLocalProperty.substring(0, i)

                        if (
                          reversedLowerCaseProperty.includes(
                            reverseLocalPropertySubstring,
                          ) &&
                          reversedLocalProperty !== reversedLowerCaseProperty
                        ) {
                          return localProperty
                        }
                      }

                      return null
                    })
                    .filter(Boolean),
                ),
              ]

              const propertyValues = [
                ...new Set(
                  sortedPropertiesUsagesCountAndComponentsName[
                    property
                  ].components
                    .map(component => {
                      const { name, value } = (
                        componentNameAndProperties as Record<
                          string,
                          Record<string, PropertyType>
                        >
                      )[component][property].type

                      if (name === 'boolean') {
                        return ['true', 'false']
                      }

                      if (name === 'string') {
                        return ['string']
                      }

                      if (name === 'enum') {
                        return (
                          value?.map(localValue =>
                            localValue.value.replaceAll('"', ''),
                          ) ?? []
                        )
                      }

                      return []
                    })
                    .flat(),
                ),
              ]

              return (
                <StyledTableRow key={property}>
                  <Table.BodyCell>
                    <Text as="span" variant="bodyStrong">
                      {property}
                    </Text>
                  </Table.BodyCell>
                  <Table.BodyCell>
                    <Text as="span" variant="body">
                      {
                        sortedPropertiesUsagesCountAndComponentsName[property]
                          .count
                      }
                    </Text>
                  </Table.BodyCell>
                  <Table.BodyCell>
                    <StyledText as="span" variant="body">
                      {propertyValues.join(', ')}
                    </StyledText>
                  </Table.BodyCell>
                  <Table.BodyCell>
                    <StyledText as="span" variant="body">
                      {findSimilarProperty.join(', ')}
                    </StyledText>
                  </Table.BodyCell>
                  <Table.BodyCell>
                    <StyledText as="span" variant="body">
                      {sortedPropertiesUsagesCountAndComponentsName[
                        property
                      ].components.join(', ')}
                    </StyledText>
                  </Table.BodyCell>
                </StyledTableRow>
              )
            },
          )}
        </Table.Body>
      </Table>
    </Stack>
  )
}

export default Properties
