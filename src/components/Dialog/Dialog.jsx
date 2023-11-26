import React from 'react'
import './dialog.css'
import { AnimatePresence, motion } from 'framer-motion'
import { CiCircleCheck } from "react-icons/ci";

const Dialog = ({ open, text, toggleDialog }) => {
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
                        className="body-dialog check d-flex gap-2 justify-content-center- align-items-center">
                        <div className=''>
                            <CiCircleCheck/>
                        </div>
                        {text ? text : ''}
                        
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    )
}

export default Dialog