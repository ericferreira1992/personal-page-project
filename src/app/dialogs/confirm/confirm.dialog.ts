import { Dialog, PrepareDialog, DIALOG_REF, DialogRef } from '@nimble-ts/core/dialog';
import { Inject } from '@nimble-ts/core/inject';

@PrepareDialog({
    template: require('./confirm.dialog.html'),
    style: require('./confirm.dialog.scss')
})
export class ConfirmDialog extends Dialog {

	public text: string = 'Deseja realmente fazer isso?';
	public confirmText: string = 'Sim';
	public cancelText: string = 'Não';

    constructor(
        @Inject(DIALOG_REF) public dialogRef: DialogRef<ConfirmDialog>
    ) {
		super();
		if (dialogRef.data?.text)
			this.text = dialogRef.data.text;
		if (dialogRef.data?.confirmText)
			this.confirmText = dialogRef.data.confirmText;
		if (dialogRef.data?.cancelText)
			this.cancelText = dialogRef.data.cancelText;
    }

    onOpen() {
    }

    onClose() {
    }
}