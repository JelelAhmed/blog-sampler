import { Pane, majorScale, Menu, FolderCloseIcon } from 'evergreen-ui';
import React, { FC } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { title } from 'process';

const PostList: FC<{ posts: any; toggleSideSheet: () => void; getSelectedPost: (post: any) => void }> = ({ toggleSideSheet, posts, getSelectedPost }) => {
  const router = useRouter();

	console.log('Received toggleSideSheet prop:', toggleSideSheet);
  console.log(title, 'postInPostlist');

  return (
    <Pane paddingY={majorScale(2)}>
			<Menu>
				{posts.map((postData, index) => (
					<Link
						// padding={majorScale(2)}
						key={index}
						href="/app/[slug]"
						as={`/app/${postData.frontMatter.slug}`} // Replace with the actual property representing the slug
					>
						<div>
							<a onClick={(e) => { e.preventDefault(); getSelectedPost(postData); toggleSideSheet()}}>
								<Menu.Item color='#85A3FF' key={index} icon={<FolderCloseIcon color="#85A3FF" />} marginTop={majorScale(3)}>
									{postData.frontMatter.title}
								</Menu.Item>
							</a>
						</div>
					</Link>
				))}
			</Menu>
  	</Pane>
  );
};

PostList.defaultProps = {
  posts: '',
};

export default PostList;