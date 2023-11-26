import Container from "./Container";
import { useEffect, useContext, useState } from "react";
import Navbar from "./Navbar";
import { motion } from "framer-motion"
import LeftMenu from "./LeftMenu";
import Section from "./Section";
import { Context } from "../context/AuthContext";
import Dialog from "./Dialog/Dialog";


const PageHome = () => {

    const { dialogAdmin, setDialogAdmin } = useContext(Context)
    const [dialog, setDialog] = useState({
        isShow: false,
        text: '',
    })

    const activeDialog = (text) => {
        setDialog((prev) => ({ ...prev, isShow: true, text: text }))

        setTimeout(() => {
            setDialog((prev) => ({ ...prev, isShow: false, text: '', }));
        }, 5000);
    }

    useEffect(() => {
        if (dialogAdmin) {
            activeDialog('You logged in as administrator!')
            setDialogAdmin(false);
        }
    }, [])

    return (
        <>
            <div className="bg"></div>
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                style={{ display: "flex", height: "100vh", flexDirection: "column" }}
            >
                <Dialog text={dialog.text} open={dialog.isShow} />

                <Navbar></Navbar>
                <div className="flex-container-menu-left">
                    <LeftMenu />
                    <div className="d-flex flex-1 justify-content-center" style={{ margin: '5vw 0vh 0px 10vw' }}>
                        <Section  />
                    </div>
                </div>
            </motion.div>
        </>

    )
}

export default PageHome