import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogActions from '@mui/material/DialogActions';
import Button from '@mui/material/Button';

function Agreement({showAgreement, setShowAgreement, createBooking, unit, rentOption}) {
    return (
        <Dialog open={showAgreement} onClose={() => setShowAgreement(false)} maxWidth="md">
            <DialogContent padding={2}> 
                <DialogContentText paddingBottom={2} sx={{color: 'black', fontWeight: 700, fontSize: 20}}>Office Space Use Agreement</DialogContentText>
                <DialogActions>
                    <Button onClick={() => setShowAgreement(false)}>
                        Cancel
                    </Button>
                    <Button onClick={createBooking}>
                        Agree & Continue
                    </Button>
                </DialogActions>
            </DialogContent>
        </Dialog>
    );
}

export default Agreement;