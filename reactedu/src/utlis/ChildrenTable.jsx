import * as React from "react";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import Avatar from "@mui/material/Avatar";
import { deepOrange } from "@mui/material/colors";
import IconButton from "@mui/material/IconButton";

import { IoPersonRemove } from "react-icons/io5";
import { MdDone } from "react-icons/md";
import { IoClose } from "react-icons/io5";

function ChildrenTable({columns, rows}) {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);


  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  

  // const columns = [
  //   { id: "profile_picture", label: "Profile Picture", minWidth: 170 },
  //   { id: "first_name", label: "First Name", minWidth: 170 },
  //   { id: "last_name", label: "Last Name", minWidth: 100 },
  //   { id: "grade_level", label: "Grade Level", minWidth: 170, align: "right" },
  //   { id: "manage", label: "Manage", minWidth: 170, align: "right" }, // Add a column for manage buttons
  // ];

  // function createData(
  //   id,
  //   first_name,
  //   last_name,
  //   grade_level,
  //   profile_picture,
  //   manage
  // ) {
  //   return { id, first_name, last_name, grade_level, profile_picture, manage };
  // }
  // let rows = [];

  // rows = students.data.map((member) => {
  //   const manageButtons = (
  //     <div>
  //       <IconButton onClick={() => handlEdit(member)}>
  //         <FaEdit />
  //       </IconButton>
  //       <IconButton onClick={() => handldelet(member)}>
  //         <MdDelete />
  //       </IconButton>
  //     </div>
  //   );

  //   return createData(
  //     member.id,
  //     member.first_name.charAt(0).toUpperCase() + member.first_name.slice(1),
  //     member.last_name.charAt(0).toUpperCase() + member.last_name.slice(1),
  //     member.grade_level,
  //     <Avatar
  //       alt={member.first_name}
  //       src={`http://localhost:8000/storage/${member.profile_picture}`}
  //     >
  //       {member.first_name.charAt(0).toUpperCase()}
  //     </Avatar>,
  //     manageButtons
  //   );
  // });


 


  
  return (
    <Paper sx={{ width: "100%", overflow: "hidden" }}>
      <TableContainer sx={{ maxHeight: 440 }}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  align={column.align}
                  style={{ minWidth: column.minWidth }}
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {rows
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row) => {
                return (
                  <TableRow
                    hover
                    role="checkbox"
                    tabIndex={-1}
                    key={row.last_name}
                  >
                    {columns.map((column) => {
                      const value = row[column.id];
                      return (
                        <TableCell key={column.id} align={column.align}>
                          {column.format && typeof value === "number"
                            ? column.format(value)
                            : value}
                        </TableCell>
                      );
                    })}
                  </TableRow>
                );
              })}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
        component="div"
        count={rows.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
  );
}

export default ChildrenTable;
