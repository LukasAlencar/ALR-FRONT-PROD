import React from 'react'
import '../styles/components/left-menu.sass'
import ItemSidebar from './ItemSidebar'
import { Link } from 'react-router-dom'
import Logo from '../img/logo.png'
import { LiaFileContractSolid } from "react-icons/lia";
import { FiUsers } from "react-icons/fi";
import { AiOutlineShop } from "react-icons/ai";
import { IoDocumentLockOutline } from "react-icons/io5";
import { IoHomeOutline } from "react-icons/io5";

// TODO: Change language to pt-br
// TODO: Remove unused libs
// TODO: Remove unused functions / constants
// TODO: Remove console.log

const LeftMenu = () => {
  return (
    <div className='left-menu d-flex flex-column'>
      <div className='divLogo' >
        <Link to="/home">
          <span className=" a-logo"><img className='img-logo' src={Logo} alt="Home" /><div className="logoName">ALR</div></span>
        </Link>
      </div>
      <div style={{ width: '100%' }}>
        <ul>
            <ItemSidebar linkTo='home' icon={<IoHomeOutline />} itemName="Início"/>
            <ItemSidebar linkTo='create-contract' icon={<LiaFileContractSolid />} itemName="Contratos">
              {/* <SubItemSidebar linkTo='create-contract' subItemName='Create' /> */}
            </ItemSidebar>
            <ItemSidebar linkTo='users-list' icon={<FiUsers />} itemName="Usuários">
              {/* <SubItemSidebar linkTo='view-enterprise' subItemName='View' /> */}
            </ItemSidebar>
            {/* <ItemSidebar linkTo='create-cost-center' icon={<RiMoneyDollarCircleLine/>} itemName="Cost Center">
          </ItemSidebar> */}
            <ItemSidebar linkTo='view-owners' icon={<AiOutlineShop />} itemName="Fabricantes">
            </ItemSidebar>
            <ItemSidebar linkTo='view-licensing-rules' icon={<IoDocumentLockOutline style={{ fontSize: 35 }} />} itemName="Regras de Licenciamento">
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