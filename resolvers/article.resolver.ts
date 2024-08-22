import Article from "../models/article.model";
import Category from "../models/category.model";


export const resolversArticle = {
    Query: {
        getListArticles: async (_, args) => {
            const {
                sortKey,
                sortValue,
                page,
                limit,
                filterKey,
                filterValue,
                keyword
            } = args;

            // Bộ lọc
            const find = {
                deleted: false
            };

            if (filterKey && filterValue) {
                find[filterKey] = filterValue;
            }

            // Tìm kiếm
            if (keyword) {
                const keywordRegex = new RegExp(keyword, "i");
                find["title"] = keywordRegex;
            }

            // Sắp xếp
            const sort = {};
            if (sortKey && sortValue) {
                sort[sortKey] = sortValue;
            }

            // Phân trang
            const skip = (page - 1) * limit;

            const articles = await Article.
                find(find).
                sort(sort).
                skip(skip).
                limit(limit);
            return articles;
        },
        getArticle: async (_: any, args: any) => {
            const { id } = args;
            const article = await Article.findOne({
                _id: id,
                deleted: false
            });
            return article;
        }
    },
    Article: {
        category: async (article: any) => {
            const category = await Category.findOne({
                _id: article.categoryId,
                deleted: false
            });
            return category;
        }
    },
    Mutation: {
        createArticle: async (_: any, args: any) => {
            const { article } = args;
            const newArticle = await Article.create(article);
            return newArticle;
        },
        updateArticle: async (_: any, args: any) => {
            const { id, article } = args;
            const updatedArticle = await Article.findOneAndUpdate({
                _id: id
            }, article, { new: true });
            return updatedArticle;
        },
        deleteArticle: async (_: any, args: any) => {
            const { id } = args;
            const deletedArticle = await Article.findOneAndUpdate({
                _id: id
            }, {
                deleted: true,
                deletedAt: new Date()
            });
            return deletedArticle;
        }
    }
}