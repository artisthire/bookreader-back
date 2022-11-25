"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TrainingService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const training_schema_1 = require("./schemas/training.schema");
const books_service_1 = require("../books/books.service");
let TrainingService = class TrainingService {
    constructor(trainingModel, booksService) {
        this.trainingModel = trainingModel;
        this.booksService = booksService;
    }
    async create(createTrainingDto, user) {
        const { books, start, finish } = createTrainingDto;
        const booksIdByOwner = (await this.booksService.findAllByOwner(user)).map(book => book._id.toString());
        const notExistInBooksDB = books.filter(id => !booksIdByOwner.includes(id));
        if (notExistInBooksDB === null || notExistInBooksDB === void 0 ? void 0 : notExistInBooksDB.length) {
            throw new common_1.NotFoundException(`Not found books id: ${notExistInBooksDB.join(', ')}`);
        }
        const startDate = new Date(start);
        if (new Date(startDate.setDate(startDate.getDate() + 1)).getTime() >= finish) {
            throw new common_1.BadRequestException('Finish date must be bigger than start date minimum for 1 day');
        }
        await this.trainingModel.findOneAndRemove({ owner: user._id });
        const training = await this.trainingModel.create(Object.assign(Object.assign({}, createTrainingDto), { owner: user._id }));
        return await training.populate('owner', 'name email');
    }
    async findByOwner(user) {
        const training = await this.trainingModel
            .findOne({ owner: user._id })
            .lean();
        if (!training) {
            throw new common_1.NotFoundException('Training not found');
        }
        return training;
    }
    async addResult(updateResultDto, user) {
        const training = (await this.trainingModel.findOne({
            owner: user._id,
        }));
        if (!training) {
            throw new common_1.NotFoundException('Training not found');
        }
        const { start, finish } = training;
        const { date } = updateResultDto;
        if (date < start) {
            throw new common_1.BadRequestException('Date of result must be bigger than date start training');
        }
        if (date > finish) {
            throw new common_1.BadRequestException('Date of result must be less than date finish training');
        }
        training.results.push(Object.assign({}, updateResultDto));
        await training.save();
        return training;
    }
};
TrainingService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(training_schema_1.Training.name)),
    __metadata("design:paramtypes", [mongoose_2.Model,
        books_service_1.BooksService])
], TrainingService);
exports.TrainingService = TrainingService;
//# sourceMappingURL=training.service.js.map