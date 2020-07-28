declare class ListsController {
    static apiGetLists(req: any, res: any, next: any): Promise<void>;
    static apiGetList(req: any, res: any, next: any): Promise<void>;
    static apiAddList(req: any, res: any, next: any): Promise<void>;
    static apiDeleteList(req: any, res: any, next: any): Promise<void>;
}
export default ListsController;
