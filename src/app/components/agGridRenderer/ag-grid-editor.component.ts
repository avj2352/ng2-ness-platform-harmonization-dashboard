import {AfterViewInit, Component, ViewChild, ViewContainerRef} from "@angular/core";

import {ICellEditorAngularComp} from "ag-grid-angular";
// <div #container class="mood" tabindex="0" (keydown)="onKeyDown($event)">
// <img src="https://www.ag-grid.com/images/smiley.png" (click)="onClick(true)" [ngClass]="{'selected' : happy, 'default' : !happy}">
// <img src="https://www.ag-grid.com/images/smiley-sad.png" (click)="onClick(false)"
//      [ngClass]="{'selected' : !happy, 'default' : happy}">
// </div>
@Component({
    selector: 'editor-cell',
//     template: `{{params.values}}
//     <select >
//     <option value="volvo">Volvo</option>
//     <option value="saab">Saab</option>
//     <option value="mercedes">Mercedes</option>
//     <option value="audi">Audi</option>
//   </select>
//     `,
    templateUrl: "./ag-grid-editor.html",
    styles: ['./agGrid.scss']
})
export class AdoptionEditor implements ICellEditorAngularComp, AfterViewInit {
    private params: any;
    private value:any;
    private selectedValue: string;
    @ViewChild('container', {read: ViewContainerRef}) public container;
    public unitCode: string;

    // dont use afterGuiAttached for post gui events - hook into ngAfterViewInit instead for this
    ngAfterViewInit() {
        setTimeout(() => {
           // this.container.element.nativeElement.focus();
        })
    }

    agInit(params: any): void {
        this.params = params;
        
        if(params.value.unitType === 'select'){
            this.unitCode = params.value.unitCode;
            this.setUnitCode(this.unitCode);            
        }
        else {
            this.unitCode = params.value.unitValue;
             this.setUnitCode(this.unitCode); 
        }
        //console.log(params.value);  
    }

    getValue(): any {
        return   this.params.value;
    }

    isPopup(): boolean {
        return true;
    }

    setUnitCode(unitCode: string): void {
        if(this.params.value.unitType === 'select'){
            this.params.value.unitCode = unitCode;
        }
        else {
            this.params.value.unitValue = unitCode;
        }
       //console.log(this.params.value);
    }

    // toggleMood(): void {
    //     this.setHappy(!this.happy);
    // }

    toUnitCode(unitCode: string) {
        console.log(unitCode);
        this.setUnitCode(unitCode);
        this.params.api.stopEditing();
    }

    onKeyDown(event): void {
        let key = event.which || event.keyCode;
        if (key == 37 ||  // left
            key == 39) {  // right
            //this.toggleMood();
            event.stopPropagation();
        }
    }
}
