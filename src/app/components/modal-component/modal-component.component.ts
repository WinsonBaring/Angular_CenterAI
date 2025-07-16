import { Component, inject, Input } from '@angular/core';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
	selector: 'ngbd-modal-content',
	templateUrl: './modal-component-content.component.html',

})
export class NgbdModalContent {
	activeModal = inject(NgbActiveModal);

	@Input() name!: string ;
}

@Component({
	selector: 'ngbd-modal-component',
	templateUrl: './modal-component.component.html',
})
export class NgbdModalComponent {
	private modalService = inject(NgbModal);

	open() {
		const modalRef = this.modalService.open(NgbdModalContent);
		modalRef.componentInstance.name = 'World';
	}
}