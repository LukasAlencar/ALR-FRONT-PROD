import React from 'react'
import '../styles/components/sub-items-sidebar.sass'
import { Link } from 'react-router-dom';

const SubItemSidebar = ({subItemName, linkTo}) => {
  return (
    <Link to={"../" + linkTo}>
      {subItemName && <div className='sub-item-name'>{subItemName}</div>} 
    </Link>
  )
}

export default SubItemSidebar