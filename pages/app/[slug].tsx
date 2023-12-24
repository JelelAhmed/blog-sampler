import React, { useState, FC, useEffect } from 'react';
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
import path from 'path'
import fs from 'fs'

const App: FC<{ folders?: any[]; activeFolder?: any; activeDoc?: any; activeDocs?: any[]; post: any; niche: string; postsForCategory: []; selectedPost: any }> = ({
  folders,
  activeDoc,
  activeFolder,
  activeDocs,
  post,
  postsForCategory
}) => {


	const router = useRouter()
	const { slug } = router.query
	console.log(slug, 'app slug')
  const [newFolderIsShown, setIsShown] = useState(false)
	const [allFolders, setAllFolders] = useState(folders || [2, 3])

	const [selectedPost, setSelectedPost] = useState(postsForCategory[0])



	useEffect(() => {
		console.log(selectedPost, 'useEffect');
	}, [selectedPost]);

	console.log(selectedPost, 'useEffect');

	const { content, id, title } = selectedPost



	const getSelectedPost = (post) => {
		setSelectedPost(post)
	}

	// const { content } = post
  // Your component logic
	console.log(postsForCategory)

	return (
    <Pane>
			<Pane width={300} position="fixed" top={0} left={0} background="tint2" height="100vh" borderRight>
        <Pane padding={majorScale(2)} display="flex" alignItems="center" justifyContent="space-between">
          <Logo />
          <NewFolderButton onClick={() => setIsShown(true)} />
        </Pane>
        <Pane>
          <PostList getSelectedPost={getSelectedPost} posts={postsForCategory} niche={slug}/>
        </Pane>
      </Pane>
      <Head>
        <title>{`Known Blog | ${'frontMatter.title'}`}</title>
        <meta name="description" content={'frontMatter.summary'} />
      </Head>
			<Pane zIndex={346} position="fixed" top={0} left={0}>
				<header>
					<HomeNav />
				</header>
			</Pane>
      <main>
				<Pane marginLeft={300} width="calc(100vw - 380px)" height="100vh" overflowY="auto" position="relative">
					<Container>
						<Heading fontSize="clamp(1.5rem, 8vw, 4rem)" lineHeight="clamp(1rem, 8vw, 6rem)" marginY={majorScale(8)}>
							{title}
						</Heading>
						<Pane>{content}</Pane>
					</Container>
				</Pane>
      </main>
    </Pane>
  )

};

App.defaultProps = {
  // Your default props
};


export const getServerSideProps = async (context) => {
	const postsPath = path.join(process.cwd(), 'posts')
	const fileNames = fs.readdirSync(postsPath)
	const postsForCategory = fileNames.map(name => {
		const fullPath = path.join(process.cwd(), 'posts', name)
		const file = fs.readFileSync(fullPath , 'utf-8')
		const {data} = matter(file)
		return data
	})


	return {
		props: { postsForCategory }
	}
}



// export const getServerSideProps = async (context) => {
//   try {
//     // Extract slug from context.query
//     const { slug } = context.query;
// 		console.log(slug, 'getServerslug')
//     // Check if slug is defined
//     if (!slug) {
//       throw new Error("Slug is undefined");
//     }

//     // Find the category that contains the posts with the specified slug
    

//     // Extract all posts for the found category or default to an empty array
//     const postsForCategory = blogPosts[slug]
// 		console.log(postsForCategory, 'postForCategoryS')

//     // Return the posts as props
//     return {
//       props: {
//         postsForCategory,
//       },
//     };
//   } catch (error) {
//     console.error("Error in getServerSideProps:", error.message);

//     // Return an empty array if an error occurs
//     return {
//       props: {
//         postsForCategory: [],
//       },
//     };
//   }
// };

export default App;


