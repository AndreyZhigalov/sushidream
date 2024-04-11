import { doc, getDoc } from "firebase/firestore"
import { firestoreDB } from "../../../firebase"
import { RestaurantItem } from "../../../models"
import { createAsyncThunk } from "@reduxjs/toolkit"

export class DeliveryService {
    public getAddresses = createAsyncThunk("delivery/getAddresses", async () => {
        try {
            const restRef = doc(firestoreDB, "restaurants/addresses")
            return await getDoc(restRef).then(res => res.data() as Record<string, RestaurantItem>)
        } catch (error) {
            console.error(error)
        }
        return {}
    })
}