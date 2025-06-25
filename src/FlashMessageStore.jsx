// an atom is jotail is an indivisible unit of data that is to be stored
// when one part of the 'atom' changes it counts as if the entire atom has been changed
import { atom, useAtom } from 'jotai';

// create an atom -- this contains the data you want to share
export const flashMessageAtom = atom({
    message: '',
    type: 'info'   // possible values: info, danger success
});

// Custom React Hook
export const useFlashMessage = () => {
    const [flashMessage, setFlashMessage] = useAtom(flashMessageAtom);

    // set the current message that we are showing
    const showMessage = (message, type) => {
        if (message && ["info", "success", "danger"].includes(type)) {
            setFlashMessage({
                'message': message,
                'type': type
            })
        }

        // 3 seconds later, we will reset the flash message
        setTimeout(()=>{
            clearMessage()
        }, 3000)
    }

    const clearMessage = () => {
        setFlashMessage({
            'message': '',
            'type': 'info'
        })
    }

    const getMessage = () => {
        return flashMessage
    }

    return {
        getMessage, showMessage, clearMessage, flashMessage
    }

}
