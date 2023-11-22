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
          <ItemSidebar itemName="Contracts">
            <SubItemSidebar linkTo='create-contract' subItemName='Create' />
          </ItemSidebar>
          <ItemSidebar itemName="Enterprise">
            {/* <SubItemSidebar linkTo='view-enterprise' subItemName='View' /> */}
            <SubItemSidebar linkTo='users-list' subItemName='Users List' />
          </ItemSidebar>
          <ItemSidebar itemName="Cost Center">
            <SubItemSidebar linkTo='create-cost-center' subItemName='Create' />
          </ItemSidebar>
          <ItemSidebar itemName="Manufactures">
            <SubItemSidebar linkTo='create-owners' subItemName='View' />
          </ItemSidebar>
          <ItemSidebar itemName="Licensing Rules">
            <SubItemSidebar linkTo='view-licensing-rules' subItemName='View' />
          </ItemSidebar>
          <ItemSidebar linkTo='calculator' itemName="Calculator">
          </ItemSidebar>
          {/* <ItemSidebar linkTo={'dashboards'} itemName="Dashboard">
          </ItemSidebar> */}
        </ul>
      </div>
    </div>
  )
}

export default LeftMenu