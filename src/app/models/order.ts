export interface Order {
  id: number;
  productName: string; // Changed from 'product' to 'productName'
  quantity: number;
  price: number; // Added price
  customerId: number;
  createdAt: string; // Added timestamp (use 'createdAt' or 'timestamp')
}