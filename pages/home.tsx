import React, { FC } from 'react'
import { Pane, majorScale } from 'evergreen-ui'
import Container from '../components/container'
import Intro from '../components/intro'
import HomeNav from '../components/homeNav'
import BlogCategories from '../components/blogCategories'

const Home: FC<{ content: { intro: any; hero: any; features: any[]; categories: any[] } }> = ({ content }) => {

	

  return (
    <Pane background="
		#fdfdfd;
		opacity: 0.8;
		background-image:  radial-gradient(#141415 0.5px, transparent 0.5px), radial-gradient(#141415 0.5px, #fdfdfd 0.5px);
		background-size: 20px 20px;
		background-position: 0 0,10px 10px"
		>
			<header>
				<HomeNav />
				<Container>
					<Intro content={content.intro} />
				</Container>
			</header>
      <main>
				<BlogCategories categories={content.categories}/>
        {/* {content.features.map((feature, i) => (
          <BlogCategories
						categories={content.categories}
            key={feature.title}
            title={feature.title}
            body={feature.body}
            image="/docs.png"
            invert={i % 2 === 0}
          />
        ))} */}
      </main>
    </Pane>
  )
}

/**
 * Should really get this content from our CMS
 */

Home.defaultProps = {
  content: {
    features: [{ title: 'Categories', body: 'Here is the body text' }],
		categories: [
			{ id: 1, name: "Business" },
			{ id: 1, name: "Tech" },
			{ id: 1, name: "Lifestyle" },
			{ id: 1, name: "Food" },
			{ id: 1, name: "Real Estate" },
			{ id: 1, name: "Sport", },
			{ id: 1, name: "Entertainment", },
			{ id: 1, name: "History", },
			{ id: 1, name: "Culture", },

		],
    hero: { title: 'default title', body: 'default body' },
		intro: { title: "jelel6's Blog Samples", body: "Seeing is believing, So I welcome you to view my writing samples! Please, select a categories from the list below to read my some of my previous works under that categories. You can always come back to this page. enjoy"},
  },
}

export default Home
