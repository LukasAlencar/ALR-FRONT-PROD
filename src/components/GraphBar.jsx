import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer} from 'recharts';
import '../styles/components/graphBar.sass'

const data = [
  { name: 'Janeiro', vendas: 4000 },
  { name: 'Fevereiro', vendas: 3000 },
  { name: 'Março', vendas: 2000 },
  { name: 'Abril', vendas: 2780 },
];

const GraphBar =({ programName })=>{
    return(
    <>
      <h1>{programName}</h1>
      <div className='d-flex c-chart align-items-center justify-content-center'>
          <ResponsiveContainer width={"99%"} height={"99%"}>
            <BarChart className='graphbar' data={data}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="vendas" fill="#8884d8" />,
            </BarChart>
          </ResponsiveContainer>
      </div>
    </>
    )
}
export default GraphBar