import React from 'react'
import '../styles/components/left-menu.sass'
import ItemSidebar from './ItemSidebar'
import SubItemSidebar from './SubItemSidebar'
import { Link } from 'react-router-dom'
import Logo from '../img/logo.png'
import { LiaFileContractSolid } from "react-icons/lia";
import { FiUsers } from "react-icons/fi";
import { RiMoneyDollarCircleLine } from "react-icons/ri";
import { AiOutlineShop } from "react-icons/ai";
import { IoDocumentLockOutline } from "react-icons/io5";

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
          <ItemSidebar linkTo='create-contract' icon={<LiaFileContractSolid/>} itemName="Contracts">
            {/* <SubItemSidebar linkTo='create-contract' subItemName='Create' /> */}
          </ItemSidebar>
          <ItemSidebar linkTo='users-list' icon={<FiUsers/>} itemName="Users">
            {/* <SubItemSidebar linkTo='view-enterprise' subItemName='View' /> */}
          </ItemSidebar>
          <ItemSidebar linkTo='create-cost-center' icon={<RiMoneyDollarCircleLine/>} itemName="Cost Center">
          </ItemSidebar>
          <ItemSidebar linkTo='view-owners' icon={<AiOutlineShop/>} itemName="Vendors">
          </ItemSidebar>
          <ItemSidebar linkTo='view-licensing-rules' icon={<IoDocumentLockOutline/>} itemName="Licensing Rules">
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