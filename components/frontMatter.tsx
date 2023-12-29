// CustomFrontmatter.js
import React, { FC } from 'react';
import { Pane, Heading, Paragraph, Link, majorScale } from 'evergreen-ui';

const Frontmatter: FC<{ frontMatter: any }> = ({ frontMatter }) => {
  return (
    <Pane fontFamily='Lato' borderLeft="default" borderBottom="default" borderRadius='10px' padding={16} marginBottom={20}>
			<Paragraph marginBottom={majorScale(2)} >
				<Link fontFamily='Lato' fontWeight='bold' color="blue" href={frontMatter.author}>
  				Author: Jelel | Profile
				</Link>
			</Paragraph>
      <Paragraph  fontStyle="italic">Published on: {frontMatter.publishedOn}</Paragraph>
      <Paragraph >Summary: {frontMatter.summary}</Paragraph>
      <Link color="green" href={frontMatter.liveUrl}>Visit Live URL</Link>
    </Pane>
  );
};

export default Frontmatter;
