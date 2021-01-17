import styled from "styled-components";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import PersonAddIcon from "@material-ui/icons/PersonAdd";

import theme from "../../theme";

export const ActionsWrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: baseline;
  justify-content: center;
`;
export const StyledEditIcon = styled(EditIcon)`
  color: ${theme.palette.secondary.main};
`;
export const StyledDeleteIcon = styled(DeleteIcon)`
  color: ${theme.palette.secondary.main};
`;
export const StyledPersonAddIcon = styled(PersonAddIcon)`
  color: ${theme.palette.secondary.main};
`;
