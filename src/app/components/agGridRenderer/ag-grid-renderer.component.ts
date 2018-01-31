import {Component} from "@angular/core";

import {ICellRendererAngularComp} from "ag-grid-angular";
@Component({
    selector: 'asset-cell',
    template: `<span [innerHtml]="assetValue"  [ngClass]="{'boldSpan':params.value.isModified === 1}"></span>`,
    styleUrls: ['./agGrid.scss']
})
export class AssetRenderer implements ICellRendererAngularComp {
    private params: any;
    private displayValue: string;
    public assetValue: string;

    agInit(params: any): void {
        this.params = params;
        //console.log(params);
        this.setAsset(params);
    }

    refresh(params: any): boolean {
        this.params = params;
        this.setAsset(params);
        return true;
    }

    private setAsset(params) {
        // console.log(params.value);
        if(params.value.unitType === 'select'){
            this.displayValue = params.value.unitCode;
        }
        else {
            this.displayValue = params.value.unitValue;
        }
       // console.log(this.params);   
        this.assetValue = this.displayValue ;
    };
}
