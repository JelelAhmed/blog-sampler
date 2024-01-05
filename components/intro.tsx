import React, { FC } from 'react'
import { Pane, Heading, Paragraph, majorScale } from 'evergreen-ui'

const Intro: FC<{ content: { title: string; body: string } }> = ({ content }) => {
  return (
    <Pane
      width="100%"
      display="flex"
      alignItems="left"
      marginTop={majorScale(2)}
      // height={`calc(100vh - ${majorScale(9)}px)`}
    >
      <Pane paddingX={majorScale(2)}>
        <Heading fontSize="clamp(2rem, 8vw, 4.5rem)" lineHeight="clamp(2rem, 8vw, 6rem)" marginBottom={majorScale(2)}>
          {content.title}
        </Heading>
        <Paragraph 
					fontSize="clamp(1.2rem, 4vw, 1.2rem)" 
					lineHeight="clamp(1.2rem, 4vw, 2rem)"
					// fontFamily="Source Sans Pro"
					fontWeight="400"
					letterSpacing="0.01"
				>
          {content.body}
        </Paragraph>
      </Pane>
    </Pane>
  )
}

export default Intro