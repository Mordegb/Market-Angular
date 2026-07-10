export interface ProdutoProps{
    id?:number;
    title?:string;
    description?:string;
    price?:number;
    stock?:number;
    thumbnail?: string;
    images?: string[];
    category?: string;
    brand?: string;
    rating?: number;
}