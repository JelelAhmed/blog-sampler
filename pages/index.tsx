import React, { FC } from 'react'

import { Pane, majorScale } from 'evergreen-ui'
import Container from '../components/container'
import Intro from '../components/intro'
import HomeNav from '../components/homeNav'

import fs from 'fs'
import path from 'path'



import { categories } from '../BLOG_DATA';
import Directory from '../components/directory'

const Home: FC<{ intro: any; content: any; categories: any }> = ({ intro, categories }) => {



  return (
    <Pane background="
		#fdfdfd;
			opacity: 0.8;
			background-image:  radial-gradient(#141415 0.5px, transparent 0.5px), radial-gradient(#141415 0.5px, #fdfdfd 0.5px);
			background-size: 20px 20px;
			background-position: 0 0,10px 10px"
		fontFamily="Source Sans Pro"
		fontSize="16px"
		fontWeight="lighter"
		lineHeight="1.5"
		letterSpacing="0.01"
		>
			<header>
				<HomeNav />
				<Container> 
					<Intro content={intro} />
				</Container>
			</header>
      <main>
				<Directory categories={categories} />
      </main>
    </Pane>
  )
}

/**
 * Should really get this content from our CMS
 */


Home.defaultProps = {

	intro: { title: "Blog Samples", body: "Welcome to a journey through words, where seeing truly is believing! I invite you to explore my writing samples, each a testament to my passion for crafting engaging and impactful content. Choose a category from the list below to immerse yourself in a collection of my previous works. Feel free to return to this page anytime; your literary adventure awaits. Enjoy the exploration!"},
}




export const getStaticProps = async () => {

	const postsFolder = path.join(process.cwd(), 'contents');

	const readFilenames = async () => {
		try {
			const filenames = await fs.promises.readdir(postsFolder);
			console.log('Filenames:', filenames);
			return filenames;
		} catch (error) {
			console.error('Error reading filenames:', error);
			throw error;
		}
	};

	const categories = await readFilenames()

	return {
		props: {
		 categories,
		},
	}
}

export default Home