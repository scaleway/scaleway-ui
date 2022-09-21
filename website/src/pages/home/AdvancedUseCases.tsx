import styled from '@emotion/styled'
import { Text } from '@scaleway/ui'
import CopyBox from '../../components/CopyBoxCommand'

const useCase1 = `import { ThemeProvider } from '@emotion/react'
import { theme as scwTheme, Button, Text } from '@scaleway/ui'
import React, { useCallback, useState } from 'react'

const darkTheme = {
  ...scwTheme,
  colors: {
    ...scwTheme.colors,
    // Your dark colors
  },
}

const lightTheme = {
  ...scwTheme,
  colors: {
    ...scwTheme.colors,
    // Your light colors
  },
}

const App = () => {
  const [isLightMode, setIsLightMode] = useState(true)

  const setLightModeCallBack = useCallback(
    isLight => {
      setIsLightMode(isLight)
    },
    [setIsLightMode],
  )

  return (
    <ThemeProvider theme={isLightMode ? lightTheme : darkTheme}>
      <Text as="p" variant="body">
        This could be a very cool introduction text.
      </Text>
      <Switch
        name="darkMode"
        size="small"
        width={54}
        checked={isLightMode}
        onChange={(event) => {
          setLightModeCallBack(event.target.checked)
        }}
        labeled
        onLabel={<Icon size={20} name="sun" />}
        offLabel={<Icon size={20} name="moon" />}
      />
    </ThemeProvider>
  )
}

export default App
`

const useCase2 = `import styled from "@emotion/styled";
import { ThemeProvider } from "@emotion/react";
import {
  theme,
  Button,
  Checkbox,
  Container,
  RichSelect,
  TextBox,
  Text,
} from "@scaleway/ui"
import React from "react"

const StyledFieldContainer = styled.div\`
  margin-bottom: 16px;
\`

const App = () => (
  <ThemeProvider theme={theme}>
    <Container>
      <Text as="h1" variant="headingLarge">Welcome to this form example</Text>
      <StyledFieldContainer>
        <TextBox
          name="name"
          label="Your name"
          placeholder="John Doe"
          notice="Same as your official ID"
        />
      </StyledFieldContainer>
      <StyledFieldContainer>
        <RichSelect name="language" placeholder="Your favourite language">
          <RichSelect.Option value="javascript1">Javascript</RichSelect.Option>
          <RichSelect.Option value="javascript2">Javascript</RichSelect.Option>
          <RichSelect.Option value="javascript3">Javascript</RichSelect.Option>
        </RichSelect>
      </StyledFieldContainer>
      <StyledFieldContainer>
        <Checkbox name="terms">I agree with this form</Checkbox>
      </StyledFieldContainer>
      <StyledFieldContainer>
        <Button name="submit" type="submit">
          Submit
        </Button>
      </StyledFieldContainer>
    </Container>
  </ThemeProvider>
)

export default App
`

const StyledTitle = styled(Text)`
  align-self: center;
`

const AdvancedUseCasesContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.space['5']};
`

const AdvancedUseCases = () => (
  <AdvancedUseCasesContainer>
    <StyledTitle as="h3" variant="headingLarge">
      Advanced Use Cases
    </StyledTitle>
    <Text as="p" variant="body">
      If you want to change the theme or even to create a dark theme, Scaleway
      UI allows you to do it easily
    </Text>
    <CopyBox>
      <CopyBox.Command title="Dark theme" command={useCase1} />
      <CopyBox.Command title="Simple Form" command={useCase2} />
    </CopyBox>
  </AdvancedUseCasesContainer>
)

export default AdvancedUseCases
