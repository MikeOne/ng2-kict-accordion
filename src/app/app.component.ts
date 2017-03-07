import { Component, OnInit, ViewChild }                     from '@angular/core';
import {FormBuilder, FormGroup, FormArray, Validators}                           from '@angular/forms';
import { KictAccordionComponent }                           from './kict-accordion';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['app.components.scss'],
})
export class AppComponent implements OnInit {

    constructor(private fb:FormBuilder){
    }

    title = 'app works!';

    disabledPanes = [
        false,
        true,
        false
    ];

    panelForm: FormGroup;

    show = false;

    @ViewChild('accordion1') accordion1: KictAccordionComponent;
    @ViewChild('accordion2') accordion2: KictAccordionComponent;


    ngOnInit(){

        this.createForm();
        this.accordion1.reflow();

    }

    private createForm(){

        this.panelForm = this.fb.group({
            'partner'    : [null, [Validators.required]],
            'kidsBool'  : [null],
            'kids'      : this.fb.array([
                this.getKid()
            ])
        })

    }

    public addKid(){
        const control = <FormArray>this.panelForm.controls['kids'];
        // control.push(this.fb.group(new Kid(control.length+1)));
        control.push(this.getKid());
        this.accordion1.reflow();
    }

    public removeKid(index: number){
        const control = <FormArray>this.panelForm.controls['kids'];
        control.removeAt(index);
        this.accordion1.reflow();
    }

    private getKid(){
        return this.fb.group({
            dob: ''
        })
    }

    showExtra(){
        this.show = !this.show;
        this.accordion1.reflow();
    }

    goToPane(id, index){
        this[id].panes.toArray()[index].activate();
    }
}

