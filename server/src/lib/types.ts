import { Collection, ObjectId } from 'mongodb';

export enum ListingType {
    Apartment = "APARTMENT",
    House = "HOUSE"
}

export interface BookingIndexMonth {
    [key: string]: boolean;
}

export interface BookingIndexYear {
    [key: string]: BookingIndexMonth;
}

export interface BookingIndex {
    [ket: string]: BookingIndexYear;
}
export interface Booking {
    _id: ObjectId;
    listing: ObjectId;
    tenant: string;
    checkIn: string;
    checkOut: string;
}

export interface Listing {
    _id: ObjectId;
    title: string;
    description: string;
    image: string;
    host: string;
    type: ListingType;
    address: string;
    counry: string;
    admin: string;
    city: string;
    bookings: ObjectId[];
    bookingIndex: BookingIndex;
    price: number;
    numOfGuests: number;
}

export interface User {
    _id: string;
    token: string;
    name: string;
    avatar: string;
    contact: string;
    walletId?: string;
    income: number;
    bookings: ObjectId[];
    listings: ObjectId[];
}

export interface Database {
    bookings: Collection<Booking>;
    listings: Collection<Listing>;
    users: Collection<User>;
}