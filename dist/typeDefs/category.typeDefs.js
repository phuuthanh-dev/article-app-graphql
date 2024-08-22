"use strict";
var __makeTemplateObject = (this && this.__makeTemplateObject) || function (cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.typeDefsCategory = void 0;
var apollo_server_express_1 = require("apollo-server-express");
exports.typeDefsCategory = (0, apollo_server_express_1.gql)(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n    type Category {\n        id: ID,\n        title: String,\n        avatar: String,\n    }\n\n    type Query {\n        getListCategories: [Category]\n        getCategory(id: ID): Category\n    }\n\n    input CategoryInput {\n        title: String,\n        avatar: String\n    }\n\n    type Mutation {\n        createCategory(category: CategoryInput): Category\n        updateCategory(id: ID, category: CategoryInput): Category\n        deleteCategory(id: ID): Category\n    }\n"], ["\n    type Category {\n        id: ID,\n        title: String,\n        avatar: String,\n    }\n\n    type Query {\n        getListCategories: [Category]\n        getCategory(id: ID): Category\n    }\n\n    input CategoryInput {\n        title: String,\n        avatar: String\n    }\n\n    type Mutation {\n        createCategory(category: CategoryInput): Category\n        updateCategory(id: ID, category: CategoryInput): Category\n        deleteCategory(id: ID): Category\n    }\n"])));
var templateObject_1;
