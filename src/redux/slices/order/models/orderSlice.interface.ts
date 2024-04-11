import { FetchStatus } from "../../../../models";

export interface OrderState {
  orderId: string | null;
  status: FetchStatus;
}
