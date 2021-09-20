//    === COMPONENTS ===
import { withStyles, Theme, createStyles } from "@material-ui/core/styles";
import TableCell from "@material-ui/core/TableCell";
import TableRow from "@material-ui/core/TableRow";

//    === STYLES ===
const StyledTableCell = withStyles((theme: Theme) =>
  createStyles({
    head: {
      backgroundColor: theme.palette.common.black,
      color: theme.palette.common.white,
    },
    body: {
      fontSize: 14,
    },
  })
)(TableCell);

const StyledTableRow = withStyles((theme: Theme) =>
  createStyles({
    root: {
      "&:nth-of-type(odd)": {
        backgroundColor: theme.palette.action.hover,
      },
    },
  })
)(TableRow);

interface Data {
  firstName: String;
  lastName: String;
  email: String;
  eventDate: Date | String;
}

const TableBody = ({ firstName, lastName, email, eventDate }: Data) => {
  return (
    <StyledTableRow>
      <StyledTableCell data-testid="firstName" align="center">
        {firstName}
      </StyledTableCell>
      <StyledTableCell data-testid="lastName" align="center">
        {lastName}
      </StyledTableCell>
      <StyledTableCell data-testid="email" align="center">
        {email}
      </StyledTableCell>
      <StyledTableCell data-testid="date" align="center">
        {eventDate}
      </StyledTableCell>
    </StyledTableRow>
  );
};

export default TableBody;
