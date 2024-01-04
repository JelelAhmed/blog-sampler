import React, { useState, FC, useEffect } from 'react';
import path from 'path'
import fs from 'fs'
import hydrate from 'next-mdx-remote/hydrate';
import renderToString from 'next-mdx-remote/render-to-string';
import matter from 'gray-matter';
import { majorScale, Pane, Heading, Text, Button, SideSheet, ManualIcon } from 'evergreen-ui';
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


const App: FC<{ folders?: any[]; activeFolder?: any; activeDoc?: any; activeDocs?: any[]; post: any; niche: string; postsData: any; selectedPost: any; toggleSideSheet: any }> = ({
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
	const [isSideSheetOpen, setIsSideSheetOpen] = useState(false);
	const [isSmallScreen, setIsSmallScreen] = useState(false);



	const [selectedPost, setSelectedPost] = useState(postsData[0]);
	const { frontMatter } = selectedPost
	const content = hydrate(selectedPost.source)
	const title = selectedPost.frontMatter.title



	useEffect(() => {
		// console.log(selectedPost, 'useEffect');
	}, [selectedPost]);

	useEffect(() => {
    const checkScreenWidth = () => {
      setIsSmallScreen(window.innerWidth <= 768);
    };

    // Initial check
    checkScreenWidth();

    // Event listener for screen width changes
    window.addEventListener('resize', checkScreenWidth);

    // Cleanup the event listener on component unmount
    return () => {
      window.removeEventListener('resize', checkScreenWidth);
    };
  }, []);

	// console.log(selectedPost, 'useEffect');

	const { source } = selectedPost;



	const getSelectedPost = (post) => {
		setSelectedPost(post)
	}

	const openSideSheet = () => {
    setIsSideSheetOpen(true);
  };

  const closeSideSheet = () => {
    setIsSideSheetOpen(false);
	}

	const toggleSideSheet = () => {
		setIsSideSheetOpen(!isSideSheetOpen)
	}

	return (
    <Pane>
			{/* Sidebar or Button for smaller screens */}
      {/* {isSmallScreen && (
        <Button onClick={openSideSheet}>Open Sidebar</Button>
      )} */}
			{!isSmallScreen ? 
			(
        <Pane className="sidebar" width={300} position="fixed" top={0} left={0} background="tint2" height="100vh" borderRight>
					<Pane padding={majorScale(2)} display="flex" alignItems="center" justifyContent="space-between">
						<Logo isSmallScreen={isSmallScreen} />
						<NewFolderButton onClick={() => setIsShown(true)} />
						</Pane>
						<Pane>
							<PostList toggleSideSheet={toggleSideSheet} getSelectedPost={getSelectedPost} posts={postsData} />
					  </Pane>
				</Pane>
			): (
				<Pane zIndex={33} height='100vh' position="fixed" marginTop={majorScale(6)} left={0}>
					{/* {isSideSheetOpen 
						? null 
						: <Button 
								iconBefore={ManualIcon} 
								appearance='minimal'
								fontSize='20px' 
								onClick={toggleSideSheet}>
									See Topics
							</Button> } */}
					<SideSheet
						width='70vw' 
						position='left' 
						isShown={isSideSheetOpen}
						onCloseComplete={isSideSheetOpen ? toggleSideSheet : null}>
						<Pane paddingY={majorScale(1)} marginTop={majorScale(3)} display="flex" alignItems="center" justifyContent="space-between">
							<PostList getSelectedPost={getSelectedPost} toggleSideSheet={toggleSideSheet} posts={postsData}/>
						</Pane>						
					</SideSheet>
				</Pane>
			)}
      <Head>
        <title>{`Jelel6 Samples | ${selectedPost.frontMatter.title}`}</title>
        <meta name="description" content={'frontMatter.summary'} />
      </Head>
			<Pane zIndex={346} position="fixed" top={0} left={0}>
				<header>
					<HomeNav toggleSideSheet={toggleSideSheet} isSmallScreen={isSmallScreen} />
				</header>
			</Pane>
      <main>
				<Pane 
					background="#f5f5f5"
					marginLeft={isSmallScreen ? 'auto' : '300px'}
					width={isSmallScreen ? '100%' : "calc(100vw - 380px)"}
					height="100vh"
					overflowY="auto"
					position="relative"
					padding={majorScale(2)} // Use majorScale for responsive padding
					boxSizing="border-box" // Ensure padding is included in the width 
			>
					<Container>
						<Heading fontFamily='Roboto Mono, monospace' color={'#333'} fontSize="clamp(1.5rem, 8vw, 3rem)" lineHeight="clamp(1.2, 8vw, 1.8)" marginY={majorScale(8)}>
							{title}
						<Pane><FrontMatter frontMatter={frontMatter} /></Pane>	
						</Heading>
						<Text
							fontFamily="Source Sans Pro"
							fontSize="16px"
							fontWeight="lighter"
							lineHeight="1.5"
							letterSpacing="0.01"
							color="#333333"
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


export default App;
