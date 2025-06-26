export const enum ERouterPath {
  TodoHome = "TodoHome",
  InProgress = "InProgress",
  Completed = "Completed"
}

export interface ITodoItem {
  title: string;
  content: string;
  completed: boolean;
  id: number;
  imgUrl?: string;
}

export interface INewsItem {
  title: string;
  content: string;
  id: number;
  imgUrl?: string;
}
