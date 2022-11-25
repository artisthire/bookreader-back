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
exports.TrainingController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const training_service_1 = require("./training.service");
const create_training_dto_1 = require("./dto/create-training.dto");
const unauthorized_response_decorator_1 = require("../auth/decorators/unauthorized-response.decorator");
const readable_training_dto_1 = require("./dto/readable-training.dto");
const bad_params_request_decorator_1 = require("../books/decorators/bad-params-request.decorator");
const update_result_dto_1 = require("./dto/update-result.dto");
const public_user_fields_dto_1 = require("../user/dto/public-user-fields.dto");
let TrainingController = class TrainingController {
    constructor(trainingService) {
        this.trainingService = trainingService;
    }
    async create(createTrainingDto, req) {
        return await this.trainingService.create(createTrainingDto, req.user);
    }
    async find(req) {
        return await this.trainingService.findByOwner(req.user);
    }
    async updateResults(updateResultDto, req) {
        return await this.trainingService.addResult(updateResultDto, req.user);
    }
};
__decorate([
    (0, bad_params_request_decorator_1.BadParamsRequest)({
        badResp: 'Finish date must be bigeer than start date minimum for 1 day',
        notFoundResp: 'Not found book in DB',
    }),
    (0, swagger_1.ApiCreatedResponse)({
        description: 'Training created',
        schema: {
            allOf: [
                {
                    $ref: (0, swagger_1.getSchemaPath)(readable_training_dto_1.ReadableTrainingDto),
                },
                {
                    type: 'object',
                    properties: {
                        owner: {
                            $ref: (0, swagger_1.getSchemaPath)(public_user_fields_dto_1.PublicUserFieldsDto),
                        },
                    },
                },
            ],
        },
    }),
    (0, swagger_1.ApiOperation)({ description: 'Create training' }),
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_training_dto_1.CreateTrainingDto, Object]),
    __metadata("design:returntype", Promise)
], TrainingController.prototype, "create", null);
__decorate([
    (0, swagger_1.ApiNotFoundResponse)({
        description: 'Training not found',
        schema: {
            type: 'object',
            required: ['message', 'statusCode'],
            properties: {
                message: {
                    type: 'string',
                },
                statusCode: {
                    type: 'integer',
                },
            },
            example: {
                message: 'Training not found',
                statusCode: 404,
            },
        },
    }),
    (0, swagger_1.ApiOkResponse)({
        description: 'Training by owner',
        type: readable_training_dto_1.ReadableTrainingDto,
    }),
    (0, swagger_1.ApiOperation)({ description: 'Find training by owner' }),
    (0, common_1.Get)(),
    __param(0, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], TrainingController.prototype, "find", null);
__decorate([
    (0, bad_params_request_decorator_1.BadParamsRequest)({
        badResp: 'Date of result must be bigger than date start training',
        notFoundResp: 'Training not found',
    }),
    (0, swagger_1.ApiOkResponse)({
        description: 'Training with updated results array',
        type: readable_training_dto_1.ReadableTrainingDto,
    }),
    (0, swagger_1.ApiOperation)({ description: 'Add result to training data' }),
    (0, common_1.Patch)('results'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [update_result_dto_1.UpdateResultDto, Object]),
    __metadata("design:returntype", Promise)
], TrainingController.prototype, "updateResults", null);
TrainingController = __decorate([
    (0, swagger_1.ApiTags)('training'),
    (0, unauthorized_response_decorator_1.UnauthorizedResponse)('Unauthorized request'),
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.Controller)('training'),
    __metadata("design:paramtypes", [training_service_1.TrainingService])
], TrainingController);
exports.TrainingController = TrainingController;
//# sourceMappingURL=training.controller.js.map