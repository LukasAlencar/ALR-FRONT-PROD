import Card from "./Card"
import '../styles/components/container.sass'
const Container=({page})=>{
    return(
        <div className="container-fluid containerCards">
            <div className="row justify-content-around">
                    {page == 'home' && (
                        <>
                            <Card cardName="Microsoft" />
                            <Card cardName="Adobe"/>
                            <Card cardName="VMware"/>
                        </>
                    )}
                    {page == 'calc' && (
                        <>
                            <Card cardName="calculator" />
                        </>
                    )}
            </div>
        </div>
    )
}

export default Container