import {
    Component,
    AfterContentInit,
    AfterViewInit,
    OnDestroy,
    QueryList,
    ContentChildren,
    HostBinding,
    ViewEncapsulation,
    Input,
    ElementRef,
    HostListener,
    SimpleChanges}              from '@angular/core';
import { Subject }              from 'rxjs/Subject';
import { KictAccordionPane }    from './kict-accordion-pane.component';
import { Subscription }         from "rxjs/Subscription";

@Component({
    selector: '[kict-accordion]',
    template: '<ng-content></ng-content>',
    styleUrls: ['./kict-accordion.component.scss'],
    encapsulation: ViewEncapsulation.None,
    host: {'class':'kict-accordion'}
})
export class KictAccordionComponent implements AfterContentInit, AfterViewInit, OnDestroy {

    constructor(private elRef: ElementRef){}

    private paneSubs: Subscription[] = [];
    private parentHeight$: Subject<number> = new Subject();

    @Input() bullets: boolean = true;

    @HostBinding('class.kict-accordion-fill')
    @Input() fill: boolean = false;

    @ContentChildren(KictAccordionPane) panes: QueryList<KictAccordionPane>;

    ngAfterViewInit() {
        this.parentHeight$.next(this.getParentHeight());

    }

    ngAfterContentInit(): void {
        let defaultActivePane = this.panes.filter(pane => pane.activeDefault) || [];
        this.setPanelModes(this.fill);
        this.selectPane(defaultActivePane[0]);
        this.subscribeToPaneSelection();
    }

    ngOnDestroy(): void{
        this.paneSubs.forEach(sub => sub.unsubscribe());
    }

    private subscribeToPaneSelection (): void {
        this.panes.forEach(( pane: KictAccordionPane, index: number ) => {
            pane.index = index;
            pane.showBullets = this.bullets;
            this.paneSubs.push(pane.selected.subscribe( (subPane) => {
                this.selectPane(subPane);
            }));

        });

        this.panes.changes.subscribe( (paneChanges: SimpleChanges) => {console.log(paneChanges)});
    }

    private setPanelModes(fill): void {
        if(fill){
            this.panes.forEach( pane => {
                pane.fillMode = true;
                pane.numPanes = this.panes.length;
                pane.parentHeight$ = this.parentHeight$;
            })
        }
    }

    public getParentHeight(): number {
        let value = 0;

        if(this.fill){
            value =  Math.max(this.elRef.nativeElement.offsetHeight,this.elRef.nativeElement.parentElement.offsetHeight);
        } else {
            value =  this.elRef.nativeElement.offsetHeight - (this.panes.length * 52)
        }

        return value  - (this.panes.length * 53);
    }

    private selectPane(selectedPane: KictAccordionPane = this.panes.first): void {

        if(selectedPane.disabled) { return; }

        // Unselect all panes
        this.panes.forEach(( pane: KictAccordionPane ) => {
            pane.setActiveState(0);
        });

        //Select the selected pane
        selectedPane.setActiveState(1);

    }

    @HostListener('window:resize')
    public reflow(): void{
        setTimeout( () => {
            this.panes.forEach(pane => {
                pane.parentHeight$.next(this.getParentHeight());
                pane.resizePanel();
            })
        }, 0)
    }
}
