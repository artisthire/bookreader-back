export declare function BadParamsRequest(exampleMessages: {
    badResp: string;
    notFoundResp: string;
}): <TFunction extends Function, Y>(target: object | TFunction, propertyKey?: string | symbol | undefined, descriptor?: TypedPropertyDescriptor<Y> | undefined) => void;
