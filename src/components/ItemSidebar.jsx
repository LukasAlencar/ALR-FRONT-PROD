import React, { Children, useState } from 'react'
import '../styles/components/left-menu.sass'
import { AiOutlineDown, AiOutlineUp } from 'react-icons/ai'
import { AnimatePresence, motion } from "framer-motion";
import { Link } from 'react-router-dom';

const ItemSidebar = ({ children, itemName, linkTo }) => {

    const [isShow, setIsShow] = useState(false)

    if (children) {
        return (
            <>
                <li onClick={() => setIsShow(!isShow)} className='item_menu_left'>{itemName} {isShow ? <AiOutlineUp style={{ marginLeft: 10 }} fontSize={15} /> : <AiOutlineDown style={{ marginLeft: 10 }} fontSize={15} />}</li>
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
    } else {
        return (
            <>
                <Link className='item_menu_left' to={"../" + linkTo}>
                    <li onClick={() => setIsShow(!isShow)} className=''>{itemName}</li>
                </Link>
            </>
        )
    }
}

// if(children){
//     console.log('tem filho')
//     return (
//         Children.map(children, child => {
//             return (
//                 <div>
//                     {child}
//                 </div>
//             )
//         }
//         )
//     )
// }

export default ItemSidebar