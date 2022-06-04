import { Dialog, DialogContent } from "@material-ui/core";

let QuestionModal = ({ status, open }) => {
  return (
    <>
      <Dialog
        open={open}
        // onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <DialogContent>
          <div className="ques-modal-body">
            <h1 style={{ color: status === "success" ? "green" : "red" }}>
              {status === "success" ? "Successful !" : "Failed !"}
            </h1>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default QuestionModal;
