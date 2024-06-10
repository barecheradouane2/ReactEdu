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
import { useTranslation } from "react-i18next";

export default function TableExample({Members, type, removemember,refuse,approve}) {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  console.log("********",type==='member');
  const {t}=useTranslation();

  const columns = [
    {
      id: "profile_picture",
      label: t('picture'),
      minWidth: 170,
    },
    { id: "first_name", label:t('first_name'), minWidth: 170 },
    { id: "last_name", label: t('last_name'), minWidth: 100 },

    {
      id: "role",
      label: t('occupation'),
      minWidth: 170,
      align: "right",
    },
    { id: "Remove", label: t('remove_member'), minWidth: 170, align: "right" },
  ];

  function createData(
    id,
    first_name,
    last_name,
    role = "...",
    profile_picture,
    type
  ) {
    return {
      id,
      first_name,
      last_name,
      role,
      profile_picture,
      Remove: (
        (type === "member") ? (
          <IconButton onClick={() => removemember(id)}>
            <IoPersonRemove />
          </IconButton>
        ) : (
          <>
            <IconButton  onClick={() => approve(id)} sx={{ backgroundColor: "green" ,color:'white',marginLeft:'5px'}}>
              <MdDone />
            </IconButton>
            <IconButton  onClick={() => refuse(id)} sx={{ backgroundColor: "red" ,color:'white'}}>
              <IoClose />
            </IconButton>
          </>
        )
      ),
      
      
    };
  }


  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };
  let rows = [];
  
  if (type == "join") {
  
  
    rows = Members.map((member) => {
      return createData(
        member.id,
        member.first_name.charAt(0).toUpperCase() + member.first_name.slice(1),
        member.last_name.charAt(0).toUpperCase() + member.last_name.slice(1),
        "",
        <Avatar
          sx={{ bgcolor: deepOrange[500] }}
          alt="Remy Sharp"
          src={`http://localhost:8000/storage/${member.profile_picture}`}
        >
          B
        </Avatar>,
        type
      );
    });
  } else {
   
    rows = Members.slice(1).map((member) => {
      

      return createData(
        member.id,
        member.first_name.charAt(0).toUpperCase() + member.first_name.slice(1),
        member.last_name.charAt(0).toUpperCase() + member.last_name.slice(1),
        member?.role.charAt(0).toUpperCase() + member.role.slice(1),
        <Avatar
          sx={{ bgcolor: deepOrange[500] }}
          alt="Remy Sharp"
          src={`http://localhost:8000/storage/${member.profile_picture}`}
        >
          B
        </Avatar>,
        type
      );
    });
  }

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
