import { NgModule }                 from '@angular/core';
import { CommonModule }             from '@angular/common';

import { KictAccordionComponent }   from './kict-accordion.component';
import { KictAccordionPane }        from './kict-accordion-pane.component';

@NgModule({
    imports:        [ CommonModule ],
    declarations:   [ KictAccordionComponent, KictAccordionPane ],
    exports:        [ KictAccordionComponent, KictAccordionPane ]
})

export class KictAccordionModule {}
