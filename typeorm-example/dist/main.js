"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const data_source_1 = require("./data-source");
const Category_1 = require("./entity/Category");
const Post_1 = require("./entity/Post");
function main() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            yield data_source_1.AppDataSource.initialize();
            // Create categories
            const categoryRepository = data_source_1.AppDataSource.getRepository(Category_1.Category);
            const categories = yield categoryRepository.save([
                { name: 'Technology' },
                { name: 'Sports' },
                { name: 'Travel' },
            ]);
            console.log('Categories inserted');
            // Create posts
            Post_1.Post.save([
                { title: 'Tech News', content: 'lorem', category: categories[0] },
                { title: 'Coding Tips', content: 'lorem', category: categories[0] },
                { title: 'Football Match', content: 'lorem', category: categories[1] },
            ]);
            console.log('Posts inserted');
            // Query posts with category join
            const postsWithCategory = yield Post_1.Post.find({
                relations: ['category'],
            });
            console.log('Posts with categories:', JSON.stringify(postsWithCategory, null, 2));
        }
        catch (err) {
            console.error(err);
        }
        finally {
            yield data_source_1.AppDataSource.destroy();
        }
    });
}
main();
