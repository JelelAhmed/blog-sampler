import React, { FC } from 'react';
import { Pane, Heading, majorScale } from 'evergreen-ui';
import Container from './container';
import BlogItem from './blogItem';

const BlogCategories: FC<{ categories: any }> = ({ categories }) => {
  const getCategory = Object.keys(categories).map(category => categories[category]);

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
        {getCategory.map(category => (
					<BlogItem {...category} />
          // <React.Fragment key={category.id}>
          //   {category.samples &&
          //     category.samples.map(sample => (
          //       <BlogItem key={sample.id} {...category} {...sample} /
          //     ))}
          // </React.Fragment>
        ))}
      </Container>
    </Pane>
  );
};

export default BlogCategories;