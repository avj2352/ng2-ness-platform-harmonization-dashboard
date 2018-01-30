import { ProductAssetAdoption } from './productAssetAdoption';

export interface UnitTypeModel {
    unitTypeId: number;
    unitTypeName: string;
    productAssetAdoptionResponse: ProductAssetAdoption[];
}
