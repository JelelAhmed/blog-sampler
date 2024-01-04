import React from 'react'

import { Button, ManualIcon } from 'evergreen-ui'

const OpenSideSheet = ({ toggleSideSheet }) => {

  return (
    <Button 
			iconBefore={ManualIcon} 
			appearance='minimal'
			intent='success'
			color='green'
			fontSize='12px' 
			onClick={toggleSideSheet}>
				See Topics
		</Button>
  )
}

export default OpenSideSheet;
