

import {Component} from "@angular/core";

import {ICellRendererAngularComp} from "ag-grid-angular";
@Component({
    selector: 'asset-cell',
    template: `<span [innerHtml]="assetValue"></span>`,
    styleUrls: ['./agGrid.scss']
})
export class AssetRenderer implements ICellRendererAngularComp {
    private params: any;
    private mood: string;
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
        this.mood = params.value;
        this.assetValue = this.mood ;
    };
}
