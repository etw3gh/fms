import { useSelector } from 'react-redux'
import {
  Table,
  TableCell,
  TableBody,
  TableHead,
  TableRow,
} from '@mui/material'

export default function Franchisees () {
  const { list, status } = useSelector(s => s.franchisees)
  console.log(list)
  return (
    <div>
      <h5>Franchisees</h5>
      <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
        <TableHead>
          <TableRow>
            <TableCell>
              Name
            </TableCell>
            <TableCell>
              Locations
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {
            !list ? <div>Loading...</div> : null
          }
          {
            list && list.map((f, i) => {
              return (
                <TableRow key={i}>
                  <TableCell>
                    {f.last_name}, {f.first_name}
                  </TableCell>
                  <TableCell>
                    {JSON.stringify(f.location_ids, null, 2)}
                  </TableCell>
                </TableRow>
              )
            })
          }
        </TableBody>
      </Table>
    </div>
  )
}