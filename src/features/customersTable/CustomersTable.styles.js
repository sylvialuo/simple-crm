import styled from "styled-components";
import { Button, TextField, Typography } from "@material-ui/core";
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
export const TextFieldWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;
export const ButtonWrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: baseline;
`;
export const PopupWrapper = styled.div`
  margin: 1rem;
  min-width: 30rem;
`;
export const NoContentTypography = styled(Typography)`
  font-family: Arial, Helvetica, sans-serif;
  color: ${theme.palette.primary.dark};
`;
export const NoContentWrapper = styled.div`
  width: 100%;
  text-align: center;
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
export const PopupButton = styled(Button)`
  &&&&& {
    color: ${theme.palette.secondary.main};
  }
  width: 5rem;
`;
export const PopupTextField = styled(TextField)`
  &&&&& {
    width: 100%;
    .MuiFormLabel-root.Mui-focused {
      color: ${theme.palette.secondary.main};
    }
    > div {
      &::after {
        border-bottom-color: ${theme.palette.secondary.main};
      }
    }
  }
`;
