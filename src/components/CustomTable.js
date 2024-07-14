import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
} from "@mui/material";
const CustomTable = ({ heading, children }) => {
  return (
    <>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            {heading?.map((item, index) => {
              return <TableCell key={index}>{item}</TableCell>;
            })}
          </TableHead>
          <TableBody>{children}</TableBody>
        </Table>
      </TableContainer>
    </>
  );
};

export default CustomTable;
