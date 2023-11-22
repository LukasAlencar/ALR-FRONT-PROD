import Container from "./Container";
import { useEffect, useContext } from "react";
import Navbar from "./Navbar";
import { motion } from "framer-motion"
import LeftMenu from "./LeftMenu";
import Section from "./Section";
import { Context } from "../context/AuthContext";


const PageHome = () => {

    const { isAuth } = useContext(Context)

    return (

        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            style={{ display: "flex", height: "100vh", flexDirection: "column" }}
        >
            <Navbar></Navbar>
            <div className="flex-container-menu-left">
                <LeftMenu />
                <div className="d-flex flex-1 justify-content-center" style={{ margin: '5vw 0vh 0px 10vw' }}>

                    <Section />
                </div>
            </div>
        </motion.div>

    )
}

export default PageHome