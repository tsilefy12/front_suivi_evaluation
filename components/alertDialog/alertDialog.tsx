import { Check } from "@mui/icons-material"
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from "@mui/material"
import React from "react";

const AlertDialog = ({ handleClose }: any) => {

    return (
        <>

            <DialogTitle color="red">Attention!!</DialogTitle>
            <DialogContent>
                <DialogContentText>
                    La date début doit être inferieure de la date fin
                </DialogContentText>
                <DialogActions>
                    <Button onClick={() => handleClose()}>
                        <Check color="primary" />
                    </Button>
                </DialogActions>
            </DialogContent>
        </>

    )
}
export default AlertDialog;
