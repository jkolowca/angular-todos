declare class TasksController {
    static apiGetTasks(req: any, res: any, next: any): Promise<void>;
    static apiAddTask(req: any, res: any, next: any): Promise<void>;
    static apiGetListTasksByState(req: any, res: any, next: any): Promise<void>;
    static apiGetTasksByState(req: any, res: any, next: any): Promise<void>;
    static apiGetListTasksCount(req: any, res: any, next: any): Promise<void>;
    static apiGetTaskById(req: any, res: any, next: any): Promise<void>;
    static apiUpdateTask(req: any, res: any, next: any): Promise<void>;
    static apiDeleteTask(req: any, res: any, next: any): Promise<void>;
}
export default TasksController;
