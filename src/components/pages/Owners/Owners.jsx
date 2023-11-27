import React from 'react'
import LeftMenu from '../../LeftMenu'
import Navbar from '../../Navbar'
import SectionPattern from '../../SectionPattern'
import MicrosoftLogo from '../../../img/Microsoft-Logo.png'
import AdobeLogo from '../../../img/Adobe-Logo.png'
import VMwareLogo from '../../../img/VMware-Logo.png'

const Owners = () => {
    return (
        <>
            <div className="bg"></div>
            <LeftMenu />
            <Navbar />
            <div className="main-section d-flex gap-4 justify-content-center flex-1 align-items-center">
                <SectionPattern>
                    <div className='d-flex flex-1 flex-column'>
                        <div className="owner-section-header justify-content-center">
                            <img style={{ width: '80%', borderRadius: '0', marginTop:40 }} src={MicrosoftLogo} alt="Microsoft" />
                        </div>
                        <div className="owner-section-body justify-content-center flex-column">
                            <p className='font-tertiary'>Uma das maiores empresas de tecnologia do mundo, conhecida pelo sistema operacional Windows, pacote Office e serviços em nuvem Azure. Com presença em sistemas operacionais, produtividade, jogos, nuvem e hardware, a Microsoft desempenha papel crucial na evolução da indústria de tecnologia.</p>
                        </div>
                    </div>
                </SectionPattern>
                <SectionPattern>
                    <div className='d-flex flex-1 flex-column'>
                        <div className="owner-section-header justify-content-center">
                            <img style={{ width: '80%', borderRadius: '0', marginTop:40 }} src={AdobeLogo} alt="Microsoft" />
                        </div>
                        <div className="owner-section-body justify-content-center flex-column">
                            <p className='font-tertiary'>Líder em software criativo, destacando-se com produtos como o Photoshop e o Illustrator. Além disso, oferece soluções para marketing digital e documentos eletrônicos, desempenhando um papel significativo na indústria criativa e digital.</p>
                        </div>
                    </div>
                </SectionPattern>
                <SectionPattern>
                    <div className='d-flex flex-1 flex-column'>
                        <div className="owner-section-header justify-content-center ">
                            <img style={{ width: '80%', borderRadius: '0', marginTop:40 }} src={VMwareLogo} alt="Microsoft" />
                        </div>
                        <div className="owner-section-body justify-content-center flex-column">
                            <p className='font-tertiary'>Líder em virtualização e infraestrutura de nuvem, oferecendo soluções para virtualização de servidores e desktops. Com foco em otimização de recursos e flexibilidade, a VMware desempenha um papel crucial na modernização e eficiência de infraestruturas de TI.</p>
                        </div>
                    </div>
                </SectionPattern>

            </div>
        </>
    )
}

export default Owners