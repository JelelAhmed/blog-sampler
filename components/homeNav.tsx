import React, { FC } from 'react'
import NextLink from 'next/link'

import OpenSideSheet from '../components/openSideSheet';
import { Pane, majorScale, Text, Button, PersonIcon } from 'evergreen-ui'
import { useSession } from 'next-auth/client'
import Container from './container'
import Logo from './logo'

const HomeNav: FC<{ isSmallScreen: any; toggleSideSheet: () => void }> = ({ isSmallScreen, toggleSideSheet }) => {

  return (
    <nav>
      <Pane 
				background="white" 
				width="100vw" 
				paddingY={majorScale(1)} 
				borderBottom 
				height={isSmallScreen ? majorScale(6) : majorScale(9)}
			>
        <Container height="100%">
          <Pane padding={majorScale(2)} display="flex" justifyContent="space-between" alignItems="center" height="100%">
					{isSmallScreen ? <OpenSideSheet toggleSideSheet={toggleSideSheet} /> : <Logo isSmallScreen={isSmallScreen} />}

            <Pane display="flex" justifyContent="space-around" alignItems="center">
              <Pane paddingX={majorScale(1)}>
                <NextLink href={'https://www.fiverr.com/jelel6'}>
                  <a>
                    <Button 
											display='flex' 
											appearance="minimal" 
											// size="medium" 
											iconBefore={PersonIcon}
											fontSize={isSmallScreen ? '12px' : '16px'}
										>
                      {'Contact Me'}
                    </Button>
                  </a>
                </NextLink>
              </Pane>
            </Pane>
          </Pane>
        </Container>
      </Pane>
    </nav>
  )
}


export default HomeNav
