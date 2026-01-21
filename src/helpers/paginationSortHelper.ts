import { join } from './../../generated/prisma/internal/prismaNamespace';
type IOption = {
    page?: number,
    limit?: number,
    sortBy?: string,
    sortByOrder?: string
}
type IOptionResult = {
    page: number,
    limit: number,
    skip: number,
    sortBy: string,
    sortByOrder: string
}
const paginationSortHelper = (options: IOption) : IOptionResult => {
    const page = Number(options.page) || 1;
    const limit = Number (options.limit) || 10;
    const skip = (page - 1) * limit;
    const sortBy = options.sortBy || "createdAt";
    const sortByOrder = options.sortByOrder || "desc"
    return {
        page,
        limit,
        skip,
        sortBy,
        sortByOrder
    }
}
export default paginationSortHelper