import React, { FC } from 'react'
import { Pane, Heading, majorScale } from 'evergreen-ui'
import Container from './container'

import DirectoryItem from './directoryItem'
import BlogItem from './blogItem'

const Directory: FC<{ categories: any }> = ({ categories }) => {


  return (
    <Pane
      minHeight="100vh"
      paddingY={majorScale(8)}
      display="flex"
      alignItems="center"
      position="relative"
      overflow="hidden"
    >
      <Container width="50%" minHeight="100" background="white">
        <Pane
          height={100}
          paddingY={majorScale(3)}
        >
          <Heading
            display='flex'
            justifyContent="center"
            alignItems="center"
            paddingX={majorScale(3)}
            size={800}
            color="#234361"
            fontWeight="bold"
          >
            {`${'Categories'.toUpperCase()}`}
          </Heading>
        </Pane>
        {categories.map(category => (
					<DirectoryItem key={category.id} {...category} />
        ))}
      </Container>
    </Pane>
  );
};

export default Directory;