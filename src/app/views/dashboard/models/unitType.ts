import { UnitMetric } from './unitMetric';

export class UnitType {
    id: number;
    code: string;
    type: string;
    active: string;
    unitList: Array<UnitMetric>;
    defaultUnit: UnitMetric;
    display: boolean;
}
