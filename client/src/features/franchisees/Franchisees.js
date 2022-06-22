import './franchisees.css'
import { Fragment } from 'react'
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
  const { locationsDict, locationsStatus } = useSelector(s => s.locations)
  const { salesDict, salesStatus } = useSelector(s => s.sales)
  return (
    <div>
      <h4>
        Franchisees
      </h4>
      <h6>
        all amounts are pre-tax
      </h6>
      <h5>
        Total Sales: ${salesDict && salesDict.totalSales}
      </h5>
      <h5>
        Total Fees: ${salesDict && salesDict.totalFee}
      </h5>
      <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
        <TableHead>
          <TableRow>
            <TableCell>
              Name
            </TableCell>
            <TableCell>
              <span className='justified-container'>
                <span className='justified-element' style={{textAlign: 'justify'}}>
                  Location | Total Sales | Fee
                </span>
              </span>
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {
            status !== 'ok' ? <span>Loading...</span> : null
          }
          {
            status === 'ok' && list.map((f, i) => {
              return (
                <TableRow key={i}>
                  <TableCell>
                    {f.last_name}, {f.first_name}
                  </TableCell>
                  <TableCell>
                    {
                      salesStatus === 'ok' && locationsStatus === 'ok' ? (
                        f.location_ids.map((id, i) => {
                          const { fee, total } = salesDict[id]
                          return (
                            <Fragment key={i}>
                              {locationsDict[id]} | ${total} | ${fee}
                              <br />
                            </Fragment>
                          )
                        })
                      ) : null
                    }
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