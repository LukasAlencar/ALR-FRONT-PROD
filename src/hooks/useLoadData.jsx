import axios from "axios"
import { useState } from "react";

export default async function useLoadData() {
    const [data, setData] = useState(null);

    
    await axios.get('https://tccbackend.alexandretavares.dev.br/licenses/').then((response) => {
        setData(response.data);
    })
    

    return data;
}
