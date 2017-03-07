import {
    Component,
    HostBinding,
    EventEmitter,
    Input,
    Output, ViewChild, ElementRef, Renderer, AfterViewInit
} from '@angular/core';

import { Subject }  from 'rxjs/Subject';

@Component({
    selector: '[kict-accordion-pane]',
    styleUrls: ['./kict-accordion-pane.component.scss'],
    host: {'class': 'kict-accordion-pane'},
    template: `
        <div class="kict-accordion-pane-header" (click)="activate()" #accordionHeader>
            <div *ngIf="showBullets" class="kict-accordion-pane-header-number">{{index + 1}}</div>
            <div class="kict-accordion-pane-header-title">{{title}}</div>
        </div>
        <div class="kict-accordion-pane-content" #accordionContent>
            <div class="kict-accordion-pane-inner-content" #accordionContentInner>
                <ng-content></ng-content>
            </div>
        </div>
    `
})
export class KictAccordionPane implements AfterViewInit{

    private pxHeight: number;
    public fillMode: boolean = false;
    public numPanes: number;
    public parentHeight: number;
    public parentHeight$: Subject<number> = new Subject();
    public heightAddition: number = 50;
    public index: number;
    public showBullets: boolean;

    constructor(private renderer: Renderer){}

    @ViewChild('accordionContent') contentRef:ElementRef;
    @ViewChild('accordionContentInner') innerContentRef:ElementRef;

    @Output() selected = new EventEmitter();
    @Input() title: string;

    // Set disabled class
    @HostBinding('class.kict-accordion-pane-disabled')
    @Input() disabled: boolean;

    // Set active class
    @HostBinding('class.kict-accordion-pane-active') active:boolean;

    @Input() activeDefault: boolean;

    ngAfterViewInit(){
        this.parentHeight$.subscribe(height => {
            this.parentHeight = height;
            this.resizePanel();
        });
    }

    public activate(){
        this.selected.emit(this);
    }

    public resizePanel(){
        this.calcSize();
        if(this.active) {
            this.setHeight();
        }
    }

    public calcSize() {

        if (!this.fillMode) {
            this.pxHeight = this.innerContentRef.nativeElement.offsetHeight;
        } else {
            this.pxHeight = ( this.parentHeight) - 6;
        }
    }

    public setHeight(pxHeight: number = this.pxHeight, addition?: number){
        let height = (addition) ? pxHeight + addition : pxHeight + this.heightAddition;
        this.renderer.setElementStyle(this.contentRef.nativeElement, 'height', height + 'px');
    }

    private resetHeight(){
        this.renderer.setElementStyle(this.contentRef.nativeElement, 'height', '0px');
    }

    public setActiveState(active){
        this.active = active;
        if (this.active) {
            this.calcSize();
            this.setHeight();
        } else {
            this.resetHeight();
        }

    }
}
