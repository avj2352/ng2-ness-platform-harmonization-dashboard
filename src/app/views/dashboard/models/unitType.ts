import { UnitMetric } from './unitMetric';

export class UnitType {
    id: number;
    code: string;
    type: string;
    active: string;
    unitTypeLst: Array<UnitMetric>;
    defaultUnit: UnitMetric;
}
