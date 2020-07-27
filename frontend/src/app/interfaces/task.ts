export interface Task {
  _id: string;
  listId: string;
  name: string;
  date: Date;
  comment: string;
  taskState: string;
}
