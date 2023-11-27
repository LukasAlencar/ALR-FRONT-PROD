import React from 'react'
import '../styles/components/left-menu.sass'
import ItemSidebar from './ItemSidebar'
import SubItemSidebar from './SubItemSidebar'
import { Link } from 'react-router-dom'
import Logo from '../img/logo.png'

const LeftMenu = () => {
  return (
    <div className='left-menu d-flex flex-column'>
      <div className='divLogo' >
      <Link to="/home">
        <span className=" a-logo"><img className='img-logo' src={Logo} alt="Home" /><div className="logoName">ALR</div></span>
      </Link>
      </div>
      <div style={{ width: '100%'}}>
        <ul>
          <ItemSidebar linkTo='create-contract' itemName="Contracts">
            {/* <SubItemSidebar linkTo='create-contract' subItemName='Create' /> */}
          </ItemSidebar>
          <ItemSidebar linkTo='users-list' itemName="Users">
            {/* <SubItemSidebar linkTo='view-enterprise' subItemName='View' /> */}
          </ItemSidebar>
          <ItemSidebar linkTo='create-cost-center' itemName="Cost Center">
          </ItemSidebar>
          <ItemSidebar linkTo='view-owners' itemName="Owners">
          </ItemSidebar>
          <ItemSidebar linkTo='view-licensing-rules' itemName="Licensing Rules">
          </ItemSidebar>
          {/* <ItemSidebar linkTo='calculator' itemName="Calculator">
          </ItemSidebar> */}
          {/* <ItemSidebar linkTo={'dashboards'} itemName="Dashboard">
          </ItemSidebar> */}
        </ul>
      </div>
    </div>
  )
}

export default LeftMenu