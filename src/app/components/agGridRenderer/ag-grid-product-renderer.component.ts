import {Component} from "@angular/core";

import {ICellRendererAngularComp} from "ag-grid-angular";
@Component({
    selector: 'product-cell',
    template: `<span [innerHtml]="productValue"  title="{{productValue}}"></span>`,
    styleUrls: ['./agGrid.scss']
})
export class ProductRenderer implements ICellRendererAngularComp {
    private params: any;
    private displayValue: string;
    public productValue: string;

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
        console.log(params.value);   
        this.productValue = params.value ;
        if(this.productValue == null){
            this.productValue = '';
        }
    };
}
