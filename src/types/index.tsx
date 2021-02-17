export interface ApplicationState {
  cartItems: Item[],
  cartCount: number,
  cartCost: string,
  checkout: boolean,
  addItem?: any,
  removeItem?: any,
  increaseQty?: any,
  decreaseQty?: any,
  clearCart?: any,
  checkoutStatus?: any
}

export interface Item {
  id: number,
  name: string,
  quantity: number,
  price: number,
  photo: string,
  size: string
}

export interface ProductItem {
  id: number,
  name: string,
  price: {
    [key: string]: number
  },
  photo: string
}

export interface ChildrenProps {
  children: React.ReactNode
}

export interface StateAction {
  type: string;
  payload: any;
}