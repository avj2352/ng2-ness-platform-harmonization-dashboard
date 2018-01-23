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
        //console.log(params.values);
        this.unitCode = params.value;
        this.setUnitCode(params.value);
    }

    getValue(): any {
        return this.unitCode;
    }

    isPopup(): boolean {
        return true;
    }

    setUnitCode(unitCode: string): void {
        this.unitCode = unitCode;
    }

    // toggleMood(): void {
    //     this.setHappy(!this.happy);
    // }

    toUnitCode(unitCode: string) {
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
