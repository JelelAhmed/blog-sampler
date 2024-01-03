import { Pane, majorScale, Menu, FolderCloseIcon } from 'evergreen-ui';
import React, { FC } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { title } from 'process';

const PostList: FC<{ posts: any; niche: string; title: string; toggleSideSheet: () => void; getSelectedPost: (post: any) => void }> = ({ toggleSideSheet, posts, niche, getSelectedPost }) => {
  const router = useRouter();

	console.log('Received toggleSideSheet prop:', toggleSideSheet);
  console.log(title, 'postInPostlist');

  return (
    <Pane padding={majorScale(2)}>
			<Menu>
  {posts.map((postData, index) => (
    <Link
		padding={majorScale(2)}
      key={index}
      href="/app/[slug]"
      as={`/app/${postData.frontMatter.slug}`} // Replace with the actual property representing the slug
    >
      <div>
        <a onClick={(e) => { e.preventDefault(); getSelectedPost(postData); console.log('Calling toggleSideSheet'); toggleSideSheet()}}>
          <Menu.Item key={index} icon={<FolderCloseIcon />} marginTop={majorScale(2)} color='green'>
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






// <Menu>
//       {posts.map((post) => (
//         <Link
//           key={post.slug}
//           href="/app/[slug]"
//           as={`/app/${post.slug}`}>
// 					<div>
// 						<a onClick={(e) => {e.preventDefault(); getSelectedPost(post)}}>
// 							<Menu.Item key={post.slug} icon={<FolderCloseIcon />}>
// 								{post.title}
// 							</Menu.Item>
// 						</a>
// 					</div>  
//         </Link>
//       ))}
//     </Menu>



















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
