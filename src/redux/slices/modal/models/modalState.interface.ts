export interface ModalState {
  alertMessage: string;
  confirmMessage: string;
  type: string;
  removeID: number | null;
  isOpen: boolean;
  showTerms: boolean;
  showGetPhoneModal: boolean;
}
