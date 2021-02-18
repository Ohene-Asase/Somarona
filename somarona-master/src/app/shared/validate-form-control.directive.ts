import { Directive, HostListener, Input, HostBinding, OnInit, AfterViewInit, Renderer2, ElementRef } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Directive({
    // tslint:disable-next-line: directive-selector
    selector: '[validate-form-control]'
})
export class ValidateFormControlDirective implements AfterViewInit {
    errorControlClass = 'is-invalid';
    errorTextClass = 'invalid-feedback';

    // tslint:disable-next-line: no-input-rename
    @Input('error-message') errorMessage: string;
    @Input('validate-form-control') control: FormControl;

    constructor(private renderer: Renderer2, private el: ElementRef) { }

    ngAfterViewInit() { this.control.valueChanges.subscribe(() => this.validate()); }

    validate() {
        if (this.control.invalid && this.control.dirty) {
            this.renderer.addClass(this.el.nativeElement, this.errorControlClass);
            if (this.errorMessage && !this.errorMessageExist()) {
                this.renderer.appendChild(this.el.nativeElement.parentNode, this.createErrorMsgSpan());
            }
        } else {
            this.renderer.removeClass(this.el.nativeElement, this.errorControlClass);
            if (this.errorMessage) { this.removeErrorMsgSpan(); }
        }
    }

    createErrorMsgSpan() {

        const span = this.renderer.createElement('span');
        const text = this.renderer.createText(this.errorMessage);
        this.renderer.addClass(span, this.errorTextClass);
        this.renderer.setProperty(span, 'id', `${this.el.nativeElement.id}ES`);
        this.renderer.appendChild(span, text);
        return span;
    }

    removeErrorMsgSpan() {
        const children: HTMLCollection = this.el.nativeElement.parentNode.children;
        const item = children.item(children.length - 1);
        if (item.id == `${this.el.nativeElement.id}ES`) {
            this.renderer.removeChild(this.el.nativeElement.parentNode, item);
        }
    }

    errorMessageExist() {
        const children: HTMLCollection = this.el.nativeElement.parentNode.children;
        const item = children.item(children.length - 1);
        return (item.id == `${this.el.nativeElement.id}ES`);
    }


}
