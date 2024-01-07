import React from 'react'
import Link from 'next/link'
import { Text } from 'evergreen-ui'

const Logo = ({ isSmallScreen, ...styles }) => {

  return (
    <Link href="/home">
      <a>
        <Text fontFamily="'Style Script', cursive" fontSize={isSmallScreen ? '17px' : '30px'} color="#47B881" {...styles}>
          <strong>Jelel6.</strong>
        </Text>
      </a>
    </Link>
  )
}

export default Logo;
