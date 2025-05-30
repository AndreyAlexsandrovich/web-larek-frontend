export interface ICardItem { 
    _id: number;
    title: string;
    tag: string; 
    image: string; 
    price: number;
    description: string;
}

export interface IUserData { 
    address: string;
    email: string;
    phone: string;
}