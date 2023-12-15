import React, { FC } from 'react'
import { Pane, Heading, Paragraph, majorScale, Text } from 'evergreen-ui'
import Container from './container'

const BlogCategories: FC<{ title: string; categories: any[]; }> = ({
  title,
	categories

}) => {
  const Left = () => (
    <Pane>
      <Heading size={900}>{title}</Heading>
    </Pane>
  )

  return (
    <Pane
      minHeight="100vh"
      paddingY={majorScale(8)}
      display="flex"
      alignItems="center"
      position="relative"
      overflow="hidden"
    >
      <Container width="50%" minHeight="100" background="white">
				<Pane 
					// background="#e5e5f7;
					// 	opacity: 0.8;
					// 	background-image:  radial-gradient(#444cf7 0.5px, transparent 0.5px), radial-gradient(#444cf7 0.5px, #e5e5f7 0.5px);
					// 	background-size: 20px 20px;
					// 	background-position: 0 0,10px 10px" 
					height={100}
					paddingY={majorScale(3)} 
					>
					<Heading 
						display='flex'
						justifyContent="center"
						alignItems="center"
						paddingX={majorScale(3)}
						size={800}
						color="#234361"
						fontWeight="bold"
						>
							{`${'Categories'.toUpperCase()}`}
					</Heading>
				</Pane>
        <Pane display="flex" flexDirection="column" alignItems="flex-start" justifyContent="space-between">
					 {categories.map((item, i) => (
            <Pane 
							key={item.id} 
							display="flex" 
							flexDirection="row"
							justifyContent="start"
							alignItems="center"
							height={100}
							border="10px"
							width="100%"
							cursor="pointer"
							backgroundColor="" 
							transition="background-color 0.3s ease" 
							hoverElevation={1}
							borderRadius='8px'
    					boxShadow='0 4px 8px rgba(0, 0, 0, 0.2)'
							paddingX={majorScale(3)}>
								<Text
									size={600}
									color="#234361" 
									fontWeight="bold" 
									textAlign="center" 
							  >
								{`${(i +1)}.   ${item.name}`}
								</Text>
            </Pane>
          ))}
        </Pane>
      </Container>
    </Pane>
  )
}



BlogCategories.defaultProps = {
	categories: [
		{ id: 1, name: "Business" },
		{ id: 1, name: "Tech" },
		{ id: 1, name: "Lifestyle" },
		{ id: 1, name: "Food" },
		{ id: 1, name: "Real Estate" },
		{ id: 1, name: "Sport" },
		{ id: 1, name: "Entertainment" },
		{ id: 1, name: "History", },
		{ id: 1, name: "Culture", }

		],
}


export default BlogCategories
