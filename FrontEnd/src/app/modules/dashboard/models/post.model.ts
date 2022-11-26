export interface Post {
  id: number;
  userId?: number;
  creationDate: Date;
  avatar?: Blob;
  title?: string;
  picture: string;
  isLiked: boolean;
  pseudo: string;
}
