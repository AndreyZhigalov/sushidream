import { ConfirmationResult } from 'firebase/auth';

export interface ConfirmAuthWithPhoneProps {
  code: string;
  confirmResult: ConfirmationResult;
}
