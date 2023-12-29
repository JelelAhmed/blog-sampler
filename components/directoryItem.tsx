import React, { FC } from 'react'
import Link from 'next/link';
import { Pane, Heading, Paragraph, majorScale, Text } from 'evergreen-ui'




const DirectoryItem: FC<{ category: string }> = ({ category }) => {


  return (
    <Pane
      display="flex"
      flexDirection="column"
      alignItems="flex-start"
      justifyContent="space-between"
    >	
      <Link href="/app/[slug]" as={`/app/${category}?category=${category}`}>
        <Pane
          display="flex"
          flexDirection="row"
          justifyContent="start"
          alignItems="center"
          height={100}
          border="10px"
          width="100%"
          cursor="pointer"
          backgroundColor=""
          transition="background-color 0.3s ease"
          hoverElevation={1}
          borderRadius="8px"
          boxShadow="0 4px 8px rgba(0, 0, 0, 0.2)"
          paddingX={majorScale(3)}
        >
          <Text size={600} color="#234361" fontWeight="bold" textAlign="center">
            {`${category.toLocaleUpperCase()}`}
          </Text>
        </Pane>
      </Link>
    </Pane>
  );
};

export default DirectoryItem;