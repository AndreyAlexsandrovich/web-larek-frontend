export interface ICardItem { 
    _id: string;
    description: string;
    image: string; 
    title: string;
    category: string; 
    price: number;
}

export interface IUserData { 
    address: string;
    email: string;
    phone: string;
}