import axios from "axios";
import { useState, useEffect } from "react";
import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import "./admin.css";

function Admin() {
  const [list, setList] = useState([]);
  const [first, setfirst] = useState(true)

  useEffect(() => {
    axios.get("http://127.0.0.1:8000/list").then((res) => {
      setList(res.data);
    });
  }, [first]);

  function deleteTodo (id){
    axios.delete(`http://127.0.0.1:8000/delete_list/${id}`)
    setfirst(!first)
    alert('deleted')
  }

  return (
    <div className="admin">
      <div className="adminlist">
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
            <TableHead>
              <TableRow>
                <TableCell align="right">Name</TableCell>
                <TableCell align="right">category&nbsp;(g)</TableCell>
                <TableCell align="right">Description&nbsp;(g)</TableCell>
                <TableCell align="right">date&nbsp;(g)</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {list.map((row) => (
                <TableRow
                  key={row.name}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell align="right">{row.name}</TableCell>
                  <TableCell align="right">{row.category}</TableCell>
                  <TableCell align="right">{row.description}</TableCell>
                  <TableCell align="right">{row.date}</TableCell>
                  <TableCell align="right">
                    <Button
                      type="submit"
                      fullWidth
                      variant="contained"
                      sx={{ m: 2, width: "5rem" }}
                    >
                      Update
                    </Button>
                  </TableCell>
                  <TableCell align="right">
                    <Button
                      type="submit"
                      fullWidth
                      variant="contained"
                      sx={{ m: 2, width: "5rem" }}
                      onClick={() => deleteTodo(row.id)}
                    >
                      Delete
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    </div>
  );
}

export default Admin;
