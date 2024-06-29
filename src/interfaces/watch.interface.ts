import { IBrand } from "./brand.interface";
import { IComment } from "./comment.interface";

export interface IWatch {
  _id: string;
  watchName: string;
  image: string;
  price: number;
  automatic: boolean;
  watchDescription: string;
  comments: IComment[];
  brand: IBrand;
  createdAt: string;
  updatedAt: string;
  totalComments?: number;
  averageRating?: number;
}
