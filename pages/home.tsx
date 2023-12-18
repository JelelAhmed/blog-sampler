import React, { FC } from 'react'
import { Pane, majorScale } from 'evergreen-ui'
import Container from '../components/container'
import Intro from '../components/intro'
import HomeNav from '../components/homeNav'

import { categories } from '../BLOG_DATA';
import Directory from '../components/directory'

// const Home: FC<{ intro: string; content: { intro: any; [key: string]: { id: number; title: string; routeName: string; samples: any[]} } categories: any[]; }> = ({ intro, content }) => {

	const Home: FC<{ intro: any; content: any; categories: any }> = ({ intro, categories }) => {


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
					<Intro content={intro} />
				</Container>
			</header>
      <main>
				<Directory categories={categories}/>
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

	intro: { title: "Jelel6's Blog Samples", body: "Seeing is believing, So I welcome you to view my writing samples! Please, select a categories from the list below to read my some of my previous works under that categories. You can always come back to this page. enjoy"},
}




export function getStaticProps() {
	return {
		props: {
		 categories,
		},
	}
}

export default Home




// import Link from 'next/link';
// import { categories } from '../path-to-data-file';

// const HomePage = () => {
//   return (
//     <div>
//       <h1>Select a Category</h1>
//       <ul>
//         {categories.map((category) => (
//           <li key={category.id}>
//             <Link href={`/categories/${category.slug}`}>
//               <a>{category.name}</a>
//             </Link>
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// };

// export HomePage;