export const enum ERouterPath {
  TodoHome = "TodoHome",
  InProgress = "InProgress",
  Completed = "Completed"
}

export interface ITodoItem {
  title: string;
  content: string;
  completed: boolean;
  createdTime: number;
  imgUrl?: string;
}
