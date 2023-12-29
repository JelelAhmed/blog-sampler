import React, { useState, FC, useEffect } from 'react';
import path from 'path'
import fs from 'fs'
import hydrate from 'next-mdx-remote/hydrate';
import renderToString from 'next-mdx-remote/render-to-string';
import matter from 'gray-matter';
import { majorScale, Pane, Heading, Text } from 'evergreen-ui';
import Logo from '../../components/logo';
import NewFolderButton from '../../components/newFolderButton';
import PostList from '../../components/postList';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { Post } from '../../types';
import FrontMatter from '../../components/frontMatter'
import Container from '../../components/container';
import HomeNav from '../../components/homeNav';
import { categories, blogPosts } from '../../BLOG_DATA';


const App: FC<{ folders?: any[]; activeFolder?: any; activeDoc?: any; activeDocs?: any[]; post: any; niche: string; postsData: any; selectedPost: any }> = ({
  folders,
  activeDoc,
  activeFolder,
  activeDocs,
  post,
	postsData
}) => {


	const router = useRouter()
	const { slug } = router.query
	console.log(slug, 'app slug')
  const [newFolderIsShown, setIsShown] = useState(false)
	const [allFolders, setAllFolders] = useState(folders || [2, 3])


	const [selectedPost, setSelectedPost] = useState(postsData[0]);
	const { frontMatter } = selectedPost
	const content = hydrate(selectedPost.source)
	const title = selectedPost.frontMatter.title


  // Access the frontMatter of the first item in the array
  // const frontMatterOfFirstPost = selectedPost ? selectedPost.frontMatter : null;
	// console.log(frontMatterOfFirstPost.title, 'title of second frontMatter')



	useEffect(() => {
		// console.log(selectedPost, 'useEffect');
	}, [selectedPost]);

	// console.log(selectedPost, 'useEffect');

	const { source } = selectedPost;



	const getSelectedPost = (post) => {
		setSelectedPost(post)
	}

	// const { content } = post
  // Your component logic

	return (
    <Pane>
			<Pane width={300} position="fixed" top={0} left={0} background="tint2" height="100vh" borderRight>
        <Pane padding={majorScale(2)} display="flex" alignItems="center" justifyContent="space-between">
          <Logo />
          <NewFolderButton onClick={() => setIsShown(true)} />
        </Pane>
        <Pane>
          <PostList getSelectedPost={getSelectedPost} posts={postsData} niche={slug}/>
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
				<Pane background=" #f5f5f5" marginLeft={300} width="calc(100vw - 380px)" height="100vh" overflowY="auto" position="relative">
					<Container>
						<Heading fontFamily='Roboto Mono, monospace' color={'#333'} fontSize="clamp(1.5rem, 8vw, 3rem)" lineHeight="clamp(1.2, 8vw, 1.8)" marginY={majorScale(8)}>
							{title}
						<Pane><FrontMatter frontMatter={frontMatter} /></Pane>	
						</Heading>
						<Text
							 fontFamily="Merriweather, serif"
							 fontSize="18px"
							 lineHeight="1.5"
							 color="#333333"
							//  color='##425A70'
							// fontSize="clamp(.5rem, 8vw, 1.2rem)"
							// letterSpacing='0.05px'
							// lineHeight="clamp(1, 8vw, 1.6)"
							marginBottom={majorScale(3)}
						>
							{content}
						</Text>
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
  
	
	const { slug } = context.params
	const subdirectory = slug

  const postsPath = path.join(process.cwd(), 'contents', subdirectory)

	try {
    const stats = await fs.promises.stat(postsPath);

    if (!stats.isDirectory()) {
      // Handle the case where the path exists but is not a directory
      return {
        props: { postsData: [] }, // or handle it accordingly
      };
    }

    const fileNames = await fs.promises.readdir(postsPath);
		const postsData = await Promise.all(
			fileNames.map(async (name) => {
				const fullPath = path.join(postsPath, name);
				const file = fs.readFileSync(fullPath, 'utf-8');
				const { content, data } = matter(file);
	
				// Use await for asynchronous operations
				const mdxSource = await renderToString(content, { scope: data });
				return { source: mdxSource, frontMatter: data };
			})
		);
	
		return {
			props: { postsData },
		};
    // Continue with the rest of your logic to read and process files
    // ...

  } catch (error) {
    // Handle the case where the directory does not exist
    return {
      props: { postsData: [] }, // or handle it accordingly
    };
  }
};



  // Use Promise.all to wait for all promises to resolve
  



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


