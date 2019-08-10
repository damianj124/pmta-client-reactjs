import {User} from "./UserData.model";

export interface PropertyManager {
    id: number;
    user: User;
}

export default interface Property {
    id: number;
    name: string;
    property_manager: PropertyManager[];
}

export interface PropertyManagerProperty {
    id: number;
    address: string;
    city_state_zip: string;
    fax: string;
    name: string;
    phone: string;
    representative_title: string;
    street: string;
}
