import React, { useState, FC } from 'react'
import hydrate from 'next-mdx-remote/hydrate'
import matter from 'gray-matter'
import { majorScale, Pane, Heading, Spinner } from 'evergreen-ui'
import Logo from '../../components/logo'
import NewFolderButton from '../../components/newFolderButton'
import PostList from '../../components/postList'
import Head from 'next/head'
import { useRouter } from 'next/router'
import renderToString from 'next-mdx-remote/render-to-string'
import { Post } from '../../types'
import Container from '../../components/container'
import HomeNav from '../../components/homeNav'
import { posts } from '../../content'

import { categories, blogPosts } from '../../BLOG_DATA';
import path from 'path'

const BlogPost: FC<{ folders?: any[]; activeFolder?: any; activeDoc?: any; activeDocs?: any[]; post: any; businessPosts: []; }> = ({
  folders,
  activeDoc,
  activeFolder,
  activeDocs,
	post,
	businessPosts
}) => {
  const router = useRouter()
  const [newFolderIsShown, setIsShown] = useState(false)
	const [allFolders, setAllFolders] = useState(folders || [2, 3])
	const { content } = post

	const selectedCategory = 'business'

	



  return (
    <Pane>
			<Pane zIndex={100} width={300} position="absolute" top={0} left={0} background="tint2" height="100vh" borderRight>
        <Pane padding={majorScale(2)} display="flex" alignItems="center" justifyContent="space-between">
          <Logo />
          <NewFolderButton onClick={() => setIsShown(true)} />
        </Pane>
        <Pane>
          <PostList posts={businessPosts} niche={"business"}/>
        </Pane>
      </Pane>
      <Head>
        <title>{`Known Blog | ${'frontMatter.title'}`}</title>
        <meta name="description" content={'frontMatter.summary'} />
      </Head>
      <header>
        <HomeNav />
      </header>
      <main>
        <Container>
          <Heading fontSize="clamp(2rem, 8vw, 6rem)" lineHeight="clamp(2rem, 8vw, 6rem)" marginY={majorScale(3)}>
            {'frontMatter.title'}
          </Heading>
          <Pane>{content}</Pane>
        </Container>
      </main>
    </Pane>
  )
}


BlogPost.defaultProps = {
  folders: [
		{
			id: 1,
			name: 'Jelel',
			_id: "Sports"
		},
		{
			id: 2,
			name: 'kelvin',
			_id: 'Lifestyle'
		},
		{
			id: 3,
			name: 'Musa',
			_id: "tech"
		},
	]
}


export const getStaticPaths = async () => {
  let paths = [];

  // Iterate over each category
  for (const category in blogPosts) {
    // Extract the slugs from each post in the category
    const categoryPaths = blogPosts[category].map(post => ({
      params: { slug: post.slug }
    }));

    // Concatenate the category paths to the overall paths array
    paths = paths.concat(categoryPaths);
		console.log(paths, 'getstaticprops')
  }

  return {
    paths,
    fallback: true // or true if you have dynamic routes with getStaticProps
  };
};




// export const getStaticProps = async ({ params }) => {
//   // Find the category that contains the post with the specified slug
//   let category;
//   let post;

//   for (const currentCategory in blogPosts) {
//     post = blogPosts[currentCategory].find(post => post.slug === params.slug);
// 		console.log(post, 'slug');
// 		console.log(post, 'slug');

//     if (post) {
//       category = currentCategory;
// 			console.log(post, 'slug');
// 			console.log(post, 'slug');
//       break;
//     }

//   }

//   // Return the post as props
//   return {
//     props: {
//       post,
//       category,
//     },
//   };


export const getStaticProps = async ({ params }) => {
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

			
				businessPosts = blogPosts['business']
			

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


/**
 * Catch all handler. Must handle all different page
 * states.
 * 1. Folders - none selected
 * 2. Folders => Folder selected
 * 3. Folders => Folder selected => Document selected
 *
 * An unauth user should not be able to access this page.
 *
 * @param context
 */
}

export default BlogPost
