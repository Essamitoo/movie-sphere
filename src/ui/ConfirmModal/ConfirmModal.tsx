import Link from "next/link";

interface ConfirmModalProps {
	isOpen: boolean
	onConfirm: () => void
	onCancel: () => void
	message: string
	unconfirmedLabel: string
	confirmLabel: string
	link?: string
}
  
  const ConfirmModal = ({ isOpen, onConfirm, onCancel, message, confirmLabel, link, unconfirmedLabel }: ConfirmModalProps) => {
    if (!isOpen) return null;

    return (
        <div className='fixed inset-0 bg-transparent flex justify-center items-center z-50'>
            <div className='bg-secondary rounded-xl shadow-lg p-6 w-[90%] max-w-md text-center'>
                <p className='text-lg mb-4'>{message}</p>
                <div className='flex justify-center gap-4'>
                    <button
                        onClick={onCancel}
                        className='bg-quaternary hover:bg-quaternary/60 text-tertiary font-bold py-2 px-4 rounded'
                    >
                        {unconfirmedLabel}
                    </button>
                    <Link
                        href={link || ''}
                        onClick={onConfirm}
                        className='bg-red-900 hover:bg-red-800 text-tertiary font-bold py-2 px-4 rounded'
                    >
                        {confirmLabel}
                    </Link>
                </div>
            </div>
        </div>
    );
};

  
  export default ConfirmModal;
  