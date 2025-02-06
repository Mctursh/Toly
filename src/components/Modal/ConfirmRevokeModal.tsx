import LoadingOrNotFound from "../Chat/LoadingOrNotFound";
import Modal from "./Modal";
interface RevokeConfirmationModal {
    isLoading: boolean;
    error?: string;
    // messaeg: string;
    isOpen: boolean;
    onClose: () => void;
    onConfirm?: () => void;
  }


const ConfirmRevokeModal = ({ isOpen, onClose, isLoading, onConfirm }: RevokeConfirmationModal) => (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Revoke Wallet"
      footer={
        <div className="flex gap-x-4">
          <button onClick={onClose} className="rounded-lg text-base bg-[#6FCB71] px-4 py-1 text-white">
            Cancel
          </button>
          <button onClick={onConfirm} className="flex justify-center align-center py-1 px-3 bg-red-500/10 border border-red-500 rounded-lg text-red-500 text-sm">
          {/* <button onClick={onConfirm} className="btn-primary"> */}
            Confirm
          </button>
        </div>
      }
    >
        {
            isLoading ?
            (
                <LoadingOrNotFound loading={true} text='' />
            )
            :
            (
                <p className="text-gray-200">Are you sure you want to revoke?</p>
            )
        }
      {/* <p className="text-gray-200">{message}</p> */}
    </Modal>
  );


  export default ConfirmRevokeModal