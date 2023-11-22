import React, { Children } from 'react'
import '../styles/components/footer.sass'


const Footer = ({children}) => {
  return (
        <div className='footer'>
            {children && Children.map(children, (child) => {
            return (
                <>
                    {child}
                </>
                
            )
        }
        )}
    </div>
  )
}

export default Footer