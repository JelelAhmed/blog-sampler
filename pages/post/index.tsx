// import React, { FC, useState } from 'react'
// import { Pane, Dialog, majorScale, Menu, FolderCloseIcon } from 'evergreen-ui'
// import { useRouter } from 'next/router'
// import Link from 'next/link'
// import Logo from '../../components/logo'
// import FolderList from '../../components/folderList'
// import PostList from '../../components/postList'
// import NewFolderButton from '../../components/newFolderButton'
// import FolderPane from '../../components/folderPane'
// import DocPane from '../../components/docPane'
// import NewFolderDialog from '../../components/newFolderDialog'

// import { categories, blogPosts } from '../../BLOG_DATA';
// import path from 'path'
// import { posts } from '../../content'

// const Post: FC<{ 
// 	folders?: any[];
// 	activeFolder?: any; 
// 	activeDoc?: any; 
// 	activeDocs?: any[]; 
// 	posts: any; 
// 	niche: string; }> = ({
//   folders,
//   activeDoc,
//   activeFolder,
//   activeDocs,
// }) => {
//   const router = useRouter()
//   const [newFolderIsShown, setIsShown] = useState(false)
// 	const [allFolders, setAllFolders] = useState(folders || [2, 3])

//   const Page = () => {
//     if (null) {
//       return <DocPane folder={activeFolder} doc={activeDoc} />
//     }

//     // if (null) {
//     //   return <FolderPane folder={activeFolder} docs={activeDocs} />
//     // }

//     return null
//   }

//   if (false) {
//     return (
//       <Dialog
//         isShown
//         title="Session expired"
//         confirmLabel="Ok"
//         hasCancel={false}
//         hasClose={false}
//         shouldCloseOnOverlayClick={false}
//         shouldCloseOnEscapePress={false}
//         onConfirm={() => router.push('/signin')}
//       >
//         Sign in to continue
//       </Dialog>
//     )
//   }


// 	const selectedCategory = router.query.category


// 	const getPostsByCategory = () => {
// 		return blogPosts[`${selectedCategory}`]
// 	}

// 	const posts = getPostsByCategory()


	

//   return (
//     <Pane position="relative">
//       <Pane zIndex={100} width={300} position="absolute" top={0} left={0} background="tint2" height="100vh" borderRight>
//         <Pane padding={majorScale(2)} display="flex" alignItems="center" justifyContent="space-between">
//           <Logo />
//           <NewFolderButton onClick={() => setIsShown(true)} />
//         </Pane>
//         <Pane>
// 					{/* Contact me */}
//           <PostList posts={posts} niche={selectedCategory} />
//         </Pane>
//       </Pane>
//       <Pane marginLeft={300} width="calc(100vw - 300px)" height="100vh" overflowY="auto" position="relative">
// 			{selectedCategory}
//       <Page />
//       </Pane>
//       <NewFolderDialog close={() => setIsShown(false)} isShown={newFolderIsShown} onNewFolder={() => {}} />
//     </Pane>
//   )
// }


// Post.defaultProps = {
//   folders: [
// 		{
// 			id: 1,
// 			name: 'Jelel',
// 			_id: "Sports"
// 		},
// 		{
// 			id: 2,
// 			name: 'kelvin',
// 			_id: 'Lifestyle'
// 		},
// 		{
// 			id: 3,
// 			name: 'Musa',
// 			_id: "tech"
// 		},
// 	],
// }



// // export async function getStaticProps() {
  
// //   return {
// //     props: {
// //       posts: posts // Ensure posts is defined
// //     },
// //     revalidate: 1,
// //   };
// // }

// /**
//  * Catch all handler. Must handle all different page
//  * states.
//  * 1. Folders - none selected
//  * 2. Folders => Folder selected
//  * 3. Folders => Folder selected => Document selected
//  *
//  * An unauth user should not be able to access this page.
//  *
//  * @param context
//  */

// export default Post



// post/index.js
import React, { useState, FC } from 'react';
import hydrate from 'next-mdx-remote/hydrate';
import matter from 'gray-matter';
import { majorScale, Pane, Heading } from 'evergreen-ui';
import Logo from '../../components/logo';
import NewFolderButton from '../../components/newFolderButton';
import PostList from '../../components/postList';
import Head from 'next/head';
import { useRouter } from 'next/router';
import renderToString from 'next-mdx-remote/render-to-string';
import { Post } from '../../types';
import Container from '../../components/container';
import HomeNav from '../../components/homeNav';
import { categories, blogPosts } from '../../BLOG_DATA';
import path from 'path';

const AppPage: FC<{ folders?: any[]; activeFolder?: any; activeDoc?: any; activeDocs?: any[]; post: any; businessPosts: []; }> = ({
  folders,
  activeDoc,
  activeFolder,
  activeDocs,
  post,
  businessPosts
}) => {
  // Your component logic
};

AppPage.defaultProps = {
  // Your default props
};

export const getServerSideProps = async ({ params }) => {
  // Find the category that contains the post with the specified slug
  let category;
  let post;
  let businessPosts;

  for (const currentCategory in blogPosts) {
    post = blogPosts[currentCategory].find(post => post.slug === params.slug);

    if (post) {
      category = currentCategory;

      // Check if the category is 'business' and assign the array of posts directly
      if (category === 'business') {
        businessPosts = blogPosts[category];
      }

      break;
    }
  }

  // Return the post and businessPosts as props
  return {
    props: {
      post,
      category,
      businessPosts,
    },
  };
};

export default AppPage

