import { MongoClient, ObjectId } from 'mongodb';
declare class ListsDAO {
    static injectDB(conn: MongoClient): Promise<void>;
    static getLists(): Promise<{
        listsList: any[];
    }>;
    static getList(id: ObjectId): Promise<any>;
    static addList(name: string): Promise<import("mongodb").InsertOneWriteOpResult<any> | {
        error: any;
    }>;
    static deleteList(listId: ObjectId): Promise<import("mongodb").DeleteWriteOpResultObject | {
        error: any;
    }>;
}
/**
 * A List
 * @typedef List
 * @property {ObjectId} _id
 * @property {string} name
 */
export default ListsDAO;
