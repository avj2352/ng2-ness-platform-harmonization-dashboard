import { AssetDetails } from './assetDetails';

export interface ProductAssetAdoption {

    reportId: number;
    reportName: string;
    clusterId: number;
    clusterCode: string;
    bgId: number;
    bgCode: string;
    buId: number;

    buCode: string;
    productId: number;
    productName: string;


    assetDetails: AssetDetails[];
}
