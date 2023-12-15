import React, { FC } from 'react'
import { useRouter } from 'next/router';
import { Pane, Heading, Paragraph, majorScale, Text } from 'evergreen-ui'
import Container from './container'




const BlogItem: FC<{ category: any; index: any; title: string; routeName: string; samples: any[] }> = ({ title, routeName, samples }) => {

	const router = useRouter();

	const handleClick = () => {
    router.push(`${router.pathname}/${routeName}`);
  };

	console.log(samples)
  return (
    <Pane display="flex" flexDirection="column" alignItems="flex-start" justifyContent="space-between">
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
        borderRadius='8px'
        boxShadow='0 4px 8px rgba(0, 0, 0, 0.2)'
        paddingX={majorScale(3)}
				onClick={handleClick}
      >
        <Text
          size={600}
          color="#234361"
          fontWeight="bold"
          textAlign="center"
        >
          {title}
        </Text>
      </Pane>
    </Pane>
  );
};

export default BlogItem;