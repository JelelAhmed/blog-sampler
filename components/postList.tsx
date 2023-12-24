import { Pane, majorScale, Menu, FolderCloseIcon } from 'evergreen-ui';
import React, { FC } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';

const PostList: FC<{ posts: any; niche: string; getSelectedPost: (post: any) => void }> = ({ posts, niche, getSelectedPost }) => {
  const router = useRouter();

  console.log(posts, 'postInPostlist');

  return (
    <Pane padding={majorScale(2)}>
    <Menu>
      {posts.map((post) => (
        <Link
          key={post.slug}
          href="/app/[slug]"
          as={`/app/${post.slug}`}>
					<div>
						<a onClick={(e) => {e.preventDefault(); getSelectedPost(post)}}>
							<Menu.Item key={post.slug} icon={<FolderCloseIcon />}>
								{post.title}
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


























// import { Pane, majorScale, Menu, FolderCloseIcon } from 'evergreen-ui'
// import React, { FC } from 'react'
// import { useRouter } from 'next/router'
// import Link from 'next/link';

// const PostList: FC<{ posts: any; niche: string }> = ({posts, niche}) => {
// 	const router = useRouter();
//   const { slug } = router.query;

	
// 	console.log(posts, 'postInPostlist')
//   return (
//     <Pane padding={majorScale(2)}>
//       <Menu>
//           {posts.map((post) => (
//             <Link key={post.id} href={`/app/[slug]`} as={`/app/${post.slug}`}>
//               <Menu.Item key={post.slug} icon={<FolderCloseIcon />}>
//                 {post.title}
//               </Menu.Item>
//             </Link>
//           ))}
//         </Menu>
//     </Pane>
//   )
// }

// PostList.defaultProps = {
//   posts: ''
// }

// export default PostList
