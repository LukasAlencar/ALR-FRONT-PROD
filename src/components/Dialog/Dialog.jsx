import React from 'react'
import './dialog.css'
import { AnimatePresence, motion } from 'framer-motion'
import { CiCircleCheck } from "react-icons/ci";
import { VscError } from "react-icons/vsc";
import { MdErrorOutline } from "react-icons/md";
import { HiOutlineMail } from "react-icons/hi";

const Dialog = ({ open, text, toggleDialog, color, icon }) => {
    return (
        <>
            <AnimatePresence>
                {open && (
                    <motion.div
                        key="Dialog"
                        initial={{ left: '-30%' }}
                        animate={{ left: 10 }}
                        exit={{ left: '-30%' }}
                        transition={{ delay: .2 }}
                        className={`body-dialog ${color ? color : 'color-success'} d-flex gap-2 justify-content-center- align-items-center`}>
                        <div className=''>
                            {!icon && <CiCircleCheck/>}
                            {icon == 'success' && <CiCircleCheck/>}
                            {icon == 'error' && <VscError/>}
                            {icon == 'warning' && <MdErrorOutline/>}
                            {icon == 'email' && <HiOutlineMail/>}
                        </div>
                        {text ? text : ''}
                        
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    )
}

export default Dialog