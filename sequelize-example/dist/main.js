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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const database_1 = __importDefault(require("./config/database"));
const Category_1 = __importDefault(require("./models/Category"));
const Posts_1 = __importDefault(require("./models/Posts"));
function queryData() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            yield database_1.default.sync({ force: false });
            // Query posts with category join
            const postsWithCategory = yield Posts_1.default.findAll({
                include: [
                    {
                        model: Category_1.default,
                    },
                ],
            });
            console.log("Posts with categories:", JSON.stringify(postsWithCategory, null, 2));
        }
        catch (err) {
            console.error(err);
        }
        finally {
            yield database_1.default.close();
        }
    });
}
queryData();
// Disadvantages of Using Sequelize with TypeScript
// 1. Type Safety:
// While Sequelize provides TypeScript support, it is not as type-safe as some other ORMs like TypeORM or Prisma. You might still encounter situations where type inference is not as strong, leading to potential runtime errors.
// 2. Complexity:
// Sequelize's API can be complex and verbose, especially when dealing with associations and complex queries. This complexity can be exacerbated when adding TypeScript into the mix.
// Boilerplate Code:
// Defining models and their associations in Sequelize can require a lot of boilerplate code. This can be more cumbersome in TypeScript due to the need for additional type definitions and interfaces.
// 4. Migration Support:
// While Sequelize has migration support, it is not as robust or user-friendly as some other ORMs. Managing migrations in a TypeScript project can add another layer of complexity.
// 5. Community and Ecosystem:
// Although Sequelize has a large community, some other ORMs like TypeORM or Prisma have more active TypeScript-specific communities and better TypeScript documentation.
