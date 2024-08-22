import Category from "../models/category.model";

export const resolversCategory = {
    Query: {
        getListCategories: async () => {
            const categories = await Category.find({
                deleted: false
            });
            return categories;
        },
        getCategory: async (_: any, args: any) => {
            const { id } = args;
            const category = await Category.findOne({
                _id: id,
                deleted: false
            });
            return category;
        }
    },
    Mutation: {
        createCategory: async (_: any, args: any) => {
            const { category } = args;
            const newCategory = await Category.create(category);
            return newCategory;
        },
        updateCategory: async (_: any, args: any) => {
            const { id, category } = args;
            const updatedCategory = await Category.findOneAndUpdate({
                _id: id
            }, category, { new: true });
            return updatedCategory;
        },
        deleteCategory: async (_: any, args: any) => {
            const { id } = args;
            const deletedCategory = await Category.findOneAndUpdate({
                _id: id
            }, {
                deleted: true,
                deletedAt: new Date()
            });
            return deletedCategory;
        }
    }
}