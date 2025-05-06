/* eslint-disable */
/* tslint:disable */
/*
 * ---------------------------------------------------------------
 * ## THIS FILE WAS GENERATED VIA SWAGGER-TYPESCRIPT-API        ##
 * ##                                                           ##
 * ## AUTHOR: acacode                                           ##
 * ## SOURCE: https://github.com/acacode/swagger-typescript-api ##
 * ---------------------------------------------------------------
 */

export interface Category {
  /** @format int64 */
  id?: number;
  name?: string;
  description?: string;
  products?: Product[];
}

export interface Discount {
  /** @format int64 */
  id?: number;
  code?: string;
  discountAmountType?: "PERCENTAGE" | "FIXED";
  /** @format double */
  amount?: number;
  /** @format date-time */
  startDate?: string;
  /** @format date-time */
  endDate?: string;
  /** @format int32 */
  quantity?: number;
  /** @format double */
  minimumOrderPrice?: number;
  isActive?: boolean;
  description?: string;
}

export interface Inventory {
  /** @format int64 */
  id?: number;
  product?: Product;
  /** @format int32 */
  quantity?: number;
  /** @format date-time */
  updatedAt?: string;
}

export interface Order {
  /** @format int64 */
  id?: number;
  user?: User;
  /** @format double */
  totalAmount?: number;
  /** @format date-time */
  orderTime?: string;
  orderDetails?: OrderDetail[];
  payment?: Payment;
  status?: "PENDING" | "PROCESSING" | "COMPLETED" | "CANCELLED";
  address?: string;
  phoneNumber?: string;
  discount?: Discount;
  /** @format double */
  discountAmount?: number;
}

export interface OrderDetail {
  /** @format int64 */
  id?: number;
  order?: Order;
  product?: Product;
  /** @format int32 */
  quantity?: number;
  /** @format double */
  unitPrice?: number;
  size?: string;
  sugarRate?: string;
  iceRate?: string;
}

export interface Payment {
  /** @format int64 */
  id?: number;
  order?: Order;
  /** @format double */
  amount?: number;
  paymentMethod?: string;
  status?: string;
  /** @format date-time */
  transactionDate?: string;
}

export interface Product {
  /** @format int64 */
  id?: number;
  name?: string;
  description?: string;
  ingredients?: string;
  /** @format double */
  price?: number;
  imageUrl?: string;
  /** @format int32 */
  quantitySold?: number;
  category?: Category;
  orderDetails?: OrderDetail[];
  inventory?: Inventory;
  /** @uniqueItems true */
  likedByUsers?: User[];
}

export interface User {
  /** @format int64 */
  id?: number;
  fullName?: string;
  phoneNumber?: string;
  email?: string;
  password?: string;
  role?: "USER" | "ADMIN";
  /** @format date-time */
  createdAt?: string;
  /** @format date-time */
  updatedAt?: string;
  /** @uniqueItems true */
  favoriteProducts?: Product[];
}

export interface UpdateProductDTO {
  name?: string;
  /** @format double */
  price?: number;
  description?: string;
  image?: string;
  ingredients?: string;
  /** @format int64 */
  categoryId?: number;
}

export interface DiscountDTO {
  code?: string;
  discountAmountType?: "PERCENTAGE" | "FIXED";
  /** @format double */
  amount?: number;
  /** @format date-time */
  startDate?: string;
  /** @format date-time */
  endDate?: string;
  /** @format int32 */
  quantity?: number;
  /** @format double */
  minimumOrderPrice?: number;
  isActive?: boolean;
  description?: string;
}

export interface CategoryDTO {
  /** @format int64 */
  id?: number;
  name?: string;
  description?: string;
}

export interface CreateProductDTO {
  name?: string;
  /** @format double */
  price?: number;
  description?: string;
  image?: string;
  ingredients?: string;
  /** @format int64 */
  categoryId?: number;
}

export interface ProductQuantityDTO {
  /** @format int64 */
  productId?: number;
  /** @format int32 */
  quantity?: number;
}

export interface CartItemDTO {
  /** @format int64 */
  productId?: number;
  productName?: string;
  /** @format int32 */
  quantity?: number;
  /** @format double */
  unitPrice?: number;
  size?: string;
  sugarRate?: string;
  iceRate?: string;
}

export interface OrderRequest {
  items?: CartItemDTO[];
  /** @format double */
  totalPrice?: number;
  address?: string;
  phoneNumber?: string;
  paymentMethod?: string;
  /** @format int64 */
  discountId?: number;
}

export interface OrderDTO {
  /** @format int64 */
  id?: number;
  /** @format int64 */
  userId?: number;
  /** @format double */
  price?: number;
  /** @format date-time */
  orderTime?: string;
  orderStatus?: "PENDING" | "PROCESSING" | "COMPLETED" | "CANCELLED";
  payment?: PaymentDTO;
  orderDetails?: OrderDetailsDTO[];
  address?: string;
  phoneNumber?: string;
  /** @format double */
  discountAmDouble?: number;
}

export interface OrderDetailsDTO {
  productName?: string;
  size?: string;
  sugarRate?: string;
  iceRate?: string;
  /** @format int32 */
  quantity?: number;
  /** @format double */
  unitPrice?: number;
}

export interface PaymentDTO {
  /** @format double */
  amount?: number;
  paymentMethod?: string;
  status?: string;
  /** @format date-time */
  transactionDate?: string;
}

export interface SignupRequestDTO {
  fullName?: string;
  phoneNumber?: string;
  email?: string;
  password?: string;
}

export interface LoginRequestDTO {
  email?: string;
  password?: string;
}

export interface ProductDTO {
  /** @format int64 */
  id?: number;
  name?: string;
  /** @format double */
  price?: number;
  description?: string;
  image?: string;
  ingredients?: string;
  category?: string;
  /** @format int64 */
  categoryId?: number;
}

export interface StatisticDTO {
  label?: string;
  value?: object;
  change?: string;
  positive?: boolean;
}

export interface MonthlyRevenueDTO {
  month?: string;
  /** @format double */
  value?: number;
}

import type { AxiosInstance, AxiosRequestConfig, AxiosResponse, HeadersDefaults, ResponseType } from "axios";
import axios from "axios";

export type QueryParamsType = Record<string | number, any>;

export interface FullRequestParams extends Omit<AxiosRequestConfig, "data" | "params" | "url" | "responseType"> {
  /** set parameter to `true` for call `securityWorker` for this request */
  secure?: boolean;
  /** request path */
  path: string;
  /** content type of request body */
  type?: ContentType;
  /** query params */
  query?: QueryParamsType;
  /** format of response (i.e. response.json() -> format: "json") */
  format?: ResponseType;
  /** request body */
  body?: unknown;
}

export type RequestParams = Omit<FullRequestParams, "body" | "method" | "query" | "path">;

export interface ApiConfig<SecurityDataType = unknown> extends Omit<AxiosRequestConfig, "data" | "cancelToken"> {
  securityWorker?: (
    securityData: SecurityDataType | null,
  ) => Promise<AxiosRequestConfig | void> | AxiosRequestConfig | void;
  secure?: boolean;
  format?: ResponseType;
}

export enum ContentType {
  Json = "application/json",
  FormData = "multipart/form-data",
  UrlEncoded = "application/x-www-form-urlencoded",
  Text = "text/plain",
}

export class HttpClient<SecurityDataType = unknown> {
  public instance: AxiosInstance;
  private securityData: SecurityDataType | null = null;
  private securityWorker?: ApiConfig<SecurityDataType>["securityWorker"];
  private secure?: boolean;
  private format?: ResponseType;

  constructor({ securityWorker, secure, format, ...axiosConfig }: ApiConfig<SecurityDataType> = {}) {
    this.instance = axios.create({ ...axiosConfig, baseURL: axiosConfig.baseURL || "http://localhost:8080" });
    this.secure = secure;
    this.format = format;
    this.securityWorker = securityWorker;
  }

  public setSecurityData = (data: SecurityDataType | null) => {
    this.securityData = data;
  };

  protected mergeRequestParams(params1: AxiosRequestConfig, params2?: AxiosRequestConfig): AxiosRequestConfig {
    const method = params1.method || (params2 && params2.method);

    return {
      ...this.instance.defaults,
      ...params1,
      ...(params2 || {}),
      headers: {
        ...((method && this.instance.defaults.headers[method.toLowerCase() as keyof HeadersDefaults]) || {}),
        ...(params1.headers || {}),
        ...((params2 && params2.headers) || {}),
      },
    };
  }

  protected stringifyFormItem(formItem: unknown) {
    if (typeof formItem === "object" && formItem !== null) {
      return JSON.stringify(formItem);
    } else {
      return `${formItem}`;
    }
  }

  protected createFormData(input: Record<string, unknown>): FormData {
    if (input instanceof FormData) {
      return input;
    }
    return Object.keys(input || {}).reduce((formData, key) => {
      const property = input[key];
      const propertyContent: any[] = property instanceof Array ? property : [property];

      for (const formItem of propertyContent) {
        const isFileType = formItem instanceof Blob || formItem instanceof File;
        formData.append(key, isFileType ? formItem : this.stringifyFormItem(formItem));
      }

      return formData;
    }, new FormData());
  }

  public request = async <T = any, _E = any>({
    secure,
    path,
    type,
    query,
    format,
    body,
    ...params
  }: FullRequestParams): Promise<AxiosResponse<T>> => {
    const secureParams =
      ((typeof secure === "boolean" ? secure : this.secure) &&
        this.securityWorker &&
        (await this.securityWorker(this.securityData))) ||
      {};
    const requestParams = this.mergeRequestParams(params, secureParams);
    const responseFormat = format || this.format || undefined;

    if (type === ContentType.FormData && body && body !== null && typeof body === "object") {
      body = this.createFormData(body as Record<string, unknown>);
    }

    if (type === ContentType.Text && body && body !== null && typeof body !== "string") {
      body = JSON.stringify(body);
    }

    return this.instance.request({
      ...requestParams,
      headers: {
        ...(requestParams.headers || {}),
        ...(type ? { "Content-Type": type } : {}),
      },
      params: query,
      responseType: responseFormat,
      data: body,
      url: path,
    });
  };
}

/**
 * @title API Documentation
 * @version 1.0
 * @baseUrl http://localhost:8080
 *
 * Swagger API documentation with Bearer Authentication
 */
export class Api<SecurityDataType extends unknown> {
  http: HttpClient<SecurityDataType>;

  constructor(http: HttpClient<SecurityDataType>) {
    this.http = http;
  }

  api = {
    /**
     * No description
     *
     * @tags user-controller
     * @name GetUserById
     * @request GET:/api/user/{id}
     * @secure
     */
    getUserById: (id: number, params: RequestParams = {}) =>
      this.http.request<User, any>({
        path: `/api/user/${id}`,
        method: "GET",
        secure: true,
        ...params,
      }),

    /**
     * No description
     *
     * @tags user-controller
     * @name UpdateUser
     * @request PUT:/api/user/{id}
     * @secure
     */
    updateUser: (id: number, data: User, params: RequestParams = {}) =>
      this.http.request<User, any>({
        path: `/api/user/${id}`,
        method: "PUT",
        body: data,
        secure: true,
        type: ContentType.Json,
        ...params,
      }),

    /**
     * No description
     *
     * @tags user-controller
     * @name DeleteUser
     * @request DELETE:/api/user/{id}
     * @secure
     */
    deleteUser: (id: number, params: RequestParams = {}) =>
      this.http.request<void, any>({
        path: `/api/user/${id}`,
        method: "DELETE",
        secure: true,
        ...params,
      }),

    /**
     * No description
     *
     * @tags product-controller
     * @name GetProductById
     * @request GET:/api/products/{id}
     * @secure
     */
    getProductById: (id: number, params: RequestParams = {}) =>
      this.http.request<ProductDTO, any>({
        path: `/api/products/${id}`,
        method: "GET",
        secure: true,
        ...params,
      }),

    /**
     * No description
     *
     * @tags product-controller
     * @name UpdateProduct
     * @request PUT:/api/products/{id}
     * @secure
     */
    updateProduct: (id: number, data: UpdateProductDTO, params: RequestParams = {}) =>
      this.http.request<Product, any>({
        path: `/api/products/${id}`,
        method: "PUT",
        body: data,
        secure: true,
        type: ContentType.Json,
        ...params,
      }),

    /**
     * No description
     *
     * @tags product-controller
     * @name DeleteProduct
     * @request DELETE:/api/products/{id}
     * @secure
     */
    deleteProduct: (id: number, params: RequestParams = {}) =>
      this.http.request<void, any>({
        path: `/api/products/${id}`,
        method: "DELETE",
        secure: true,
        ...params,
      }),

    /**
     * No description
     *
     * @tags payment-controller
     * @name GetPaymentById
     * @request GET:/api/payments/{id}
     * @secure
     */
    getPaymentById: (id: number, params: RequestParams = {}) =>
      this.http.request<Payment, any>({
        path: `/api/payments/${id}`,
        method: "GET",
        secure: true,
        ...params,
      }),

    /**
     * No description
     *
     * @tags payment-controller
     * @name UpdatePayment
     * @request PUT:/api/payments/{id}
     * @secure
     */
    updatePayment: (id: number, data: Payment, params: RequestParams = {}) =>
      this.http.request<Payment, any>({
        path: `/api/payments/${id}`,
        method: "PUT",
        body: data,
        secure: true,
        type: ContentType.Json,
        ...params,
      }),

    /**
     * No description
     *
     * @tags payment-controller
     * @name DeletePayment
     * @request DELETE:/api/payments/{id}
     * @secure
     */
    deletePayment: (id: number, params: RequestParams = {}) =>
      this.http.request<void, any>({
        path: `/api/payments/${id}`,
        method: "DELETE",
        secure: true,
        ...params,
      }),

    /**
     * No description
     *
     * @tags order-controller
     * @name GetOrderById
     * @request GET:/api/orders/{id}
     * @secure
     */
    getOrderById: (id: number, params: RequestParams = {}) =>
      this.http.request<Order, any>({
        path: `/api/orders/${id}`,
        method: "GET",
        secure: true,
        ...params,
      }),

    /**
     * No description
     *
     * @tags order-controller
     * @name UpdateOrder
     * @request PUT:/api/orders/{id}
     * @secure
     */
    updateOrder: (id: number, data: Order, params: RequestParams = {}) =>
      this.http.request<Order, any>({
        path: `/api/orders/${id}`,
        method: "PUT",
        body: data,
        secure: true,
        type: ContentType.Json,
        ...params,
      }),

    /**
     * No description
     *
     * @tags order-controller
     * @name DeleteOrder
     * @request DELETE:/api/orders/{id}
     * @secure
     */
    deleteOrder: (id: number, params: RequestParams = {}) =>
      this.http.request<void, any>({
        path: `/api/orders/${id}`,
        method: "DELETE",
        secure: true,
        ...params,
      }),

    /**
     * No description
     *
     * @tags order-controller
     * @name UpdateOrderStatus
     * @request PUT:/api/orders/status/{id}
     * @secure
     */
    updateOrderStatus: (
      id: number,
      data: "PENDING" | "PROCESSING" | "COMPLETED" | "CANCELLED",
      params: RequestParams = {},
    ) =>
      this.http.request<Order, any>({
        path: `/api/orders/status/${id}`,
        method: "PUT",
        body: data,
        secure: true,
        type: ContentType.Json,
        ...params,
      }),

    /**
     * No description
     *
     * @tags order-detail-controller
     * @name GetOrderDetailById
     * @request GET:/api/order-details/{id}
     * @secure
     */
    getOrderDetailById: (id: number, params: RequestParams = {}) =>
      this.http.request<OrderDetail, any>({
        path: `/api/order-details/${id}`,
        method: "GET",
        secure: true,
        ...params,
      }),

    /**
     * No description
     *
     * @tags order-detail-controller
     * @name UpdateOrderDetail
     * @request PUT:/api/order-details/{id}
     * @secure
     */
    updateOrderDetail: (id: number, data: OrderDetail, params: RequestParams = {}) =>
      this.http.request<OrderDetail, any>({
        path: `/api/order-details/${id}`,
        method: "PUT",
        body: data,
        secure: true,
        type: ContentType.Json,
        ...params,
      }),

    /**
     * No description
     *
     * @tags order-detail-controller
     * @name DeleteOrderDetail
     * @request DELETE:/api/order-details/{id}
     * @secure
     */
    deleteOrderDetail: (id: number, params: RequestParams = {}) =>
      this.http.request<void, any>({
        path: `/api/order-details/${id}`,
        method: "DELETE",
        secure: true,
        ...params,
      }),

    /**
     * No description
     *
     * @tags inventory-controller
     * @name GetInventoryById
     * @request GET:/api/inventories/{id}
     * @secure
     */
    getInventoryById: (id: number, params: RequestParams = {}) =>
      this.http.request<Inventory, any>({
        path: `/api/inventories/${id}`,
        method: "GET",
        secure: true,
        ...params,
      }),

    /**
     * No description
     *
     * @tags inventory-controller
     * @name UpdateInventory
     * @request PUT:/api/inventories/{id}
     * @secure
     */
    updateInventory: (id: number, data: Inventory, params: RequestParams = {}) =>
      this.http.request<Inventory, any>({
        path: `/api/inventories/${id}`,
        method: "PUT",
        body: data,
        secure: true,
        type: ContentType.Json,
        ...params,
      }),

    /**
     * No description
     *
     * @tags inventory-controller
     * @name DeleteInventory
     * @request DELETE:/api/inventories/{id}
     * @secure
     */
    deleteInventory: (id: number, params: RequestParams = {}) =>
      this.http.request<void, any>({
        path: `/api/inventories/${id}`,
        method: "DELETE",
        secure: true,
        ...params,
      }),

    /**
     * No description
     *
     * @tags discount-controller
     * @name GetDiscountById
     * @request GET:/api/discounts/{id}
     * @secure
     */
    getDiscountById: (id: number, params: RequestParams = {}) =>
      this.http.request<Discount, any>({
        path: `/api/discounts/${id}`,
        method: "GET",
        secure: true,
        ...params,
      }),

    /**
     * No description
     *
     * @tags discount-controller
     * @name UpdateDiscount
     * @request PUT:/api/discounts/{id}
     * @secure
     */
    updateDiscount: (id: number, data: DiscountDTO, params: RequestParams = {}) =>
      this.http.request<Discount, any>({
        path: `/api/discounts/${id}`,
        method: "PUT",
        body: data,
        secure: true,
        type: ContentType.Json,
        ...params,
      }),

    /**
     * No description
     *
     * @tags discount-controller
     * @name DeleteDiscount
     * @request DELETE:/api/discounts/{id}
     * @secure
     */
    deleteDiscount: (id: number, params: RequestParams = {}) =>
      this.http.request<void, any>({
        path: `/api/discounts/${id}`,
        method: "DELETE",
        secure: true,
        ...params,
      }),

    /**
     * No description
     *
     * @tags discount-controller
     * @name UpdateDiscountStatus
     * @request PUT:/api/discounts/status/{id}
     * @secure
     */
    updateDiscountStatus: (id: number, data: boolean, params: RequestParams = {}) =>
      this.http.request<void, any>({
        path: `/api/discounts/status/${id}`,
        method: "PUT",
        body: data,
        secure: true,
        type: ContentType.Json,
        ...params,
      }),

    /**
     * No description
     *
     * @tags category-controller
     * @name GetCategoryById
     * @request GET:/api/categories/{id}
     * @secure
     */
    getCategoryById: (id: number, params: RequestParams = {}) =>
      this.http.request<Category, any>({
        path: `/api/categories/${id}`,
        method: "GET",
        secure: true,
        ...params,
      }),

    /**
     * No description
     *
     * @tags category-controller
     * @name UpdateCategory
     * @request PUT:/api/categories/{id}
     * @secure
     */
    updateCategory: (id: number, data: CategoryDTO, params: RequestParams = {}) =>
      this.http.request<Category, any>({
        path: `/api/categories/${id}`,
        method: "PUT",
        body: data,
        secure: true,
        type: ContentType.Json,
        ...params,
      }),

    /**
     * No description
     *
     * @tags category-controller
     * @name DeleteCategory
     * @request DELETE:/api/categories/{id}
     * @secure
     */
    deleteCategory: (id: number, params: RequestParams = {}) =>
      this.http.request<void, any>({
        path: `/api/categories/${id}`,
        method: "DELETE",
        secure: true,
        ...params,
      }),

    /**
     * No description
     *
     * @tags visit-controller
     * @name RecordVisit
     * @request POST:/api/visits
     * @secure
     */
    recordVisit: (params: RequestParams = {}) =>
      this.http.request<void, any>({
        path: `/api/visits`,
        method: "POST",
        secure: true,
        ...params,
      }),

    /**
     * No description
     *
     * @tags product-controller
     * @name GetAllProducts
     * @request GET:/api/products
     * @secure
     */
    getAllProducts: (
      query?: {
        /** @format int64 */
        categoryId?: number;
        /** @format double */
        minPrice?: number;
        /** @format double */
        maxPrice?: number;
        search?: string;
      },
      params: RequestParams = {},
    ) =>
      this.http.request<ProductDTO[], any>({
        path: `/api/products`,
        method: "GET",
        query: query,
        secure: true,
        ...params,
      }),

    /**
     * No description
     *
     * @tags product-controller
     * @name CreateProduct
     * @request POST:/api/products
     * @secure
     */
    createProduct: (data: CreateProductDTO, params: RequestParams = {}) =>
      this.http.request<object, any>({
        path: `/api/products`,
        method: "POST",
        body: data,
        secure: true,
        type: ContentType.Json,
        ...params,
      }),

    /**
     * No description
     *
     * @tags product-controller
     * @name UpdateQuantitySold
     * @request POST:/api/products/update-quantity-sold
     * @secure
     */
    updateQuantitySold: (data: ProductQuantityDTO[], params: RequestParams = {}) =>
      this.http.request<object, any>({
        path: `/api/products/update-quantity-sold`,
        method: "POST",
        body: data,
        secure: true,
        type: ContentType.Json,
        ...params,
      }),

    /**
     * No description
     *
     * @tags product-controller
     * @name AddProductToFavorite
     * @request POST:/api/products/favorites/{productId}
     * @secure
     */
    addProductToFavorite: (productId: number, params: RequestParams = {}) =>
      this.http.request<void, any>({
        path: `/api/products/favorites/${productId}`,
        method: "POST",
        secure: true,
        ...params,
      }),

    /**
     * No description
     *
     * @tags product-controller
     * @name DeleteProductFromFavorite
     * @request DELETE:/api/products/favorites/{productId}
     * @secure
     */
    deleteProductFromFavorite: (productId: number, params: RequestParams = {}) =>
      this.http.request<void, any>({
        path: `/api/products/favorites/${productId}`,
        method: "DELETE",
        secure: true,
        ...params,
      }),

    /**
     * No description
     *
     * @tags payment-controller
     * @name GetAllPayments
     * @request GET:/api/payments
     * @secure
     */
    getAllPayments: (params: RequestParams = {}) =>
      this.http.request<Payment[], any>({
        path: `/api/payments`,
        method: "GET",
        secure: true,
        ...params,
      }),

    /**
     * No description
     *
     * @tags payment-controller
     * @name CreatePayment
     * @request POST:/api/payments
     * @secure
     */
    createPayment: (data: Payment, params: RequestParams = {}) =>
      this.http.request<Payment, any>({
        path: `/api/payments`,
        method: "POST",
        body: data,
        secure: true,
        type: ContentType.Json,
        ...params,
      }),

    /**
     * No description
     *
     * @tags order-controller
     * @name Checkout
     * @request POST:/api/orders/checkout
     * @secure
     */
    checkout: (data: OrderRequest, params: RequestParams = {}) =>
      this.http.request<OrderDTO, any>({
        path: `/api/orders/checkout`,
        method: "POST",
        body: data,
        secure: true,
        type: ContentType.Json,
        ...params,
      }),

    /**
     * No description
     *
     * @tags order-detail-controller
     * @name GetAllOrderDetails
     * @request GET:/api/order-details
     * @secure
     */
    getAllOrderDetails: (params: RequestParams = {}) =>
      this.http.request<OrderDetail[], any>({
        path: `/api/order-details`,
        method: "GET",
        secure: true,
        ...params,
      }),

    /**
     * No description
     *
     * @tags order-detail-controller
     * @name CreateOrderDetail
     * @request POST:/api/order-details
     * @secure
     */
    createOrderDetail: (data: OrderDetail, params: RequestParams = {}) =>
      this.http.request<OrderDetail, any>({
        path: `/api/order-details`,
        method: "POST",
        body: data,
        secure: true,
        type: ContentType.Json,
        ...params,
      }),

    /**
     * No description
     *
     * @tags inventory-controller
     * @name GetAllInventories
     * @request GET:/api/inventories
     * @secure
     */
    getAllInventories: (params: RequestParams = {}) =>
      this.http.request<Inventory[], any>({
        path: `/api/inventories`,
        method: "GET",
        secure: true,
        ...params,
      }),

    /**
     * No description
     *
     * @tags inventory-controller
     * @name CreateInventory
     * @request POST:/api/inventories
     * @secure
     */
    createInventory: (data: Inventory, params: RequestParams = {}) =>
      this.http.request<Inventory, any>({
        path: `/api/inventories`,
        method: "POST",
        body: data,
        secure: true,
        type: ContentType.Json,
        ...params,
      }),

    /**
     * No description
     *
     * @tags discount-controller
     * @name GetAllDiscounts
     * @request GET:/api/discounts
     * @secure
     */
    getAllDiscounts: (params: RequestParams = {}) =>
      this.http.request<Discount[], any>({
        path: `/api/discounts`,
        method: "GET",
        secure: true,
        ...params,
      }),

    /**
     * No description
     *
     * @tags discount-controller
     * @name CreateDiscount
     * @request POST:/api/discounts
     * @secure
     */
    createDiscount: (data: DiscountDTO, params: RequestParams = {}) =>
      this.http.request<Discount, any>({
        path: `/api/discounts`,
        method: "POST",
        body: data,
        secure: true,
        type: ContentType.Json,
        ...params,
      }),

    /**
     * No description
     *
     * @tags category-controller
     * @name GetAllCategories
     * @request GET:/api/categories
     * @secure
     */
    getAllCategories: (params: RequestParams = {}) =>
      this.http.request<CategoryDTO[], any>({
        path: `/api/categories`,
        method: "GET",
        secure: true,
        ...params,
      }),

    /**
     * No description
     *
     * @tags category-controller
     * @name CreateCategory
     * @request POST:/api/categories
     * @secure
     */
    createCategory: (data: CategoryDTO, params: RequestParams = {}) =>
      this.http.request<Category, any>({
        path: `/api/categories`,
        method: "POST",
        body: data,
        secure: true,
        type: ContentType.Json,
        ...params,
      }),

    /**
     * No description
     *
     * @tags auth-controller
     * @name CreateNewUser
     * @request POST:/api/auth/register
     * @secure
     */
    createNewUser: (data: SignupRequestDTO, params: RequestParams = {}) =>
      this.http.request<object, any>({
        path: `/api/auth/register`,
        method: "POST",
        body: data,
        secure: true,
        type: ContentType.Json,
        ...params,
      }),

    /**
     * No description
     *
     * @tags auth-controller
     * @name AuthenticateUser
     * @request POST:/api/auth/login
     * @secure
     */
    authenticateUser: (data: LoginRequestDTO, params: RequestParams = {}) =>
      this.http.request<object, any>({
        path: `/api/auth/login`,
        method: "POST",
        body: data,
        secure: true,
        type: ContentType.Json,
        ...params,
      }),

    /**
     * No description
     *
     * @tags user-controller
     * @name GetAllUsers
     * @request GET:/api/user
     * @secure
     */
    getAllUsers: (params: RequestParams = {}) =>
      this.http.request<User[], any>({
        path: `/api/user`,
        method: "GET",
        secure: true,
        ...params,
      }),

    /**
     * No description
     *
     * @tags product-controller
     * @name GetTopSoldProducts
     * @request GET:/api/products/top-sold
     * @secure
     */
    getTopSoldProducts: (params: RequestParams = {}) =>
      this.http.request<ProductDTO[], any>({
        path: `/api/products/top-sold`,
        method: "GET",
        secure: true,
        ...params,
      }),

    /**
     * No description
     *
     * @tags product-controller
     * @name GetFavoriteProducts
     * @request GET:/api/products/favorites
     * @secure
     */
    getFavoriteProducts: (params: RequestParams = {}) =>
      this.http.request<ProductDTO[], any>({
        path: `/api/products/favorites`,
        method: "GET",
        secure: true,
        ...params,
      }),

    /**
     * No description
     *
     * @tags product-controller
     * @name GetProductsByCategory
     * @request GET:/api/products/category/{categoryId}
     * @secure
     */
    getProductsByCategory: (categoryId: number, params: RequestParams = {}) =>
      this.http.request<ProductDTO[], any>({
        path: `/api/products/category/${categoryId}`,
        method: "GET",
        secure: true,
        ...params,
      }),

    /**
     * No description
     *
     * @tags payment-controller
     * @name GetPaymentByOrderId
     * @request GET:/api/payments/order/{orderId}
     * @secure
     */
    getPaymentByOrderId: (orderId: number, params: RequestParams = {}) =>
      this.http.request<Payment, any>({
        path: `/api/payments/order/${orderId}`,
        method: "GET",
        secure: true,
        ...params,
      }),

    /**
     * No description
     *
     * @tags order-controller
     * @name GetAllOrders
     * @request GET:/api/orders
     * @secure
     */
    getAllOrders: (params: RequestParams = {}) =>
      this.http.request<OrderDTO[], any>({
        path: `/api/orders`,
        method: "GET",
        secure: true,
        ...params,
      }),

    /**
     * No description
     *
     * @tags order-controller
     * @name GetOrdersByUserId
     * @request GET:/api/orders/user
     * @secure
     */
    getOrdersByUserId: (params: RequestParams = {}) =>
      this.http.request<OrderDTO[], any>({
        path: `/api/orders/user`,
        method: "GET",
        secure: true,
        ...params,
      }),

    /**
     * No description
     *
     * @tags order-detail-controller
     * @name GetOrderDetailsByOrder
     * @request GET:/api/order-details/order/{orderId}
     * @secure
     */
    getOrderDetailsByOrder: (orderId: number, params: RequestParams = {}) =>
      this.http.request<OrderDetail[], any>({
        path: `/api/order-details/order/${orderId}`,
        method: "GET",
        secure: true,
        ...params,
      }),

    /**
     * No description
     *
     * @tags inventory-controller
     * @name GetInventoryByProductId
     * @request GET:/api/inventories/product/{productId}
     * @secure
     */
    getInventoryByProductId: (productId: number, params: RequestParams = {}) =>
      this.http.request<Inventory, any>({
        path: `/api/inventories/product/${productId}`,
        method: "GET",
        secure: true,
        ...params,
      }),

    /**
     * No description
     *
     * @tags discount-controller
     * @name GetAllActiveDiscounts
     * @request GET:/api/discounts/active
     * @secure
     */
    getAllActiveDiscounts: (params: RequestParams = {}) =>
      this.http.request<Discount[], any>({
        path: `/api/discounts/active`,
        method: "GET",
        secure: true,
        ...params,
      }),

    /**
     * No description
     *
     * @tags auth-controller
     * @name GetCurrentUser
     * @request GET:/api/auth/me
     * @secure
     */
    getCurrentUser: (params: RequestParams = {}) =>
      this.http.request<object, any>({
        path: `/api/auth/me`,
        method: "GET",
        secure: true,
        ...params,
      }),

    /**
     * No description
     *
     * @tags dashboard-controller
     * @name GetVisits
     * @request GET:/api/admin/statistics/visit-counts
     * @secure
     */
    getVisits: (params: RequestParams = {}) =>
      this.http.request<StatisticDTO, any>({
        path: `/api/admin/statistics/visit-counts`,
        method: "GET",
        secure: true,
        ...params,
      }),

    /**
     * No description
     *
     * @tags dashboard-controller
     * @name GetTotalProductsStat
     * @request GET:/api/admin/statistics/total-products
     * @secure
     */
    getTotalProductsStat: (params: RequestParams = {}) =>
      this.http.request<StatisticDTO, any>({
        path: `/api/admin/statistics/total-products`,
        method: "GET",
        secure: true,
        ...params,
      }),

    /**
     * No description
     *
     * @tags dashboard-controller
     * @name GetMonthlyRevenue
     * @request GET:/api/admin/statistics/revenue
     * @secure
     */
    getMonthlyRevenue: (params: RequestParams = {}) =>
      this.http.request<StatisticDTO, any>({
        path: `/api/admin/statistics/revenue`,
        method: "GET",
        secure: true,
        ...params,
      }),

    /**
     * No description
     *
     * @tags dashboard-controller
     * @name GetRevenueDataEachMonth
     * @request GET:/api/admin/statistics/revenue-data
     * @secure
     */
    getRevenueDataEachMonth: (
      query?: {
        /**
         * @format int32
         * @default 2025
         */
        year?: number;
      },
      params: RequestParams = {},
    ) =>
      this.http.request<MonthlyRevenueDTO[], any>({
        path: `/api/admin/statistics/revenue-data`,
        method: "GET",
        query: query,
        secure: true,
        ...params,
      }),

    /**
     * No description
     *
     * @tags dashboard-controller
     * @name GetTotalOrders
     * @request GET:/api/admin/statistics/orders
     * @secure
     */
    getTotalOrders: (params: RequestParams = {}) =>
      this.http.request<StatisticDTO, any>({
        path: `/api/admin/statistics/orders`,
        method: "GET",
        secure: true,
        ...params,
      }),
  };
}
