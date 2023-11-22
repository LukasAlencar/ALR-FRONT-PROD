import { AnimatePresence, motion } from 'framer-motion'
import React, { Children, useState } from 'react'

import {AiOutlineDown, AiOutlineUp} from 'react-icons/ai'

const GroupLicenses = ({ children, Gtitle }) => {
    const [isShow, setIsShow] = useState(true)

    return (
        <>
            <div className='item-license item-title'>
                <div className="link" onClick={() => setIsShow(!isShow)}>{Gtitle} { isShow ? <AiOutlineUp style={{marginLeft: 2, marginTop: -2}} fontSize={15}/> : <AiOutlineDown style={{marginLeft: 2}} fontSize={15}/>}</div>
            </div>
            <AnimatePresence>
                {(isShow && children) && Children.map(children, (child, index) => {
                    return (
                        <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: "auto" }}
                            transition={{ duration: .1, delay: index * .2 }}
                            key={index}
                            exit={{
                                opacity: 0,
                                transition: { duration: .1, delay: index * .2 },
                                height: 0
                            }}
                        >{child}</motion.div>
                    )
                }
                )}
            </AnimatePresence>
        </>
    )
}

export default GroupLicenses