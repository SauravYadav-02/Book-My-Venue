import axios from "axios";
import { v4 as uuidv4 } from "uuid";
import { type CreateVendorRequest, type Vendor } from "../Page/User/vendors_Requestform/ReqComponet/types/vendorTypes";

const API_URL = "http://localhost:4000/vendors";

export async function createVendor(
    data: CreateVendorRequest
): Promise<Vendor> {

    const res = await axios.post<Vendor>(API_URL, {
        ...data,
        id: uuidv4(),
        status: "pending",
        adminMessage: "",
        rating: 0,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
    });

    return res.data;
}