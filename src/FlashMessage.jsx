import { useFlashMessage } from "./FlashMessageStore";
import { useEffect } from "react";

export default function FlashMessage() {
    const { getMessage, clearMessage, flashMessage } = useFlashMessage();
    const message = getMessage();

    useEffect(() => {
        console.log("Effect ran")
        const timer = setTimeout(() => {
            clearMessage();
        }, 3000);

        // we can return a CLEANUP FUNCTION for useEffect
        // the cleanup function is called when the effect triggers again
        // or when the effect ends
        return () => {
            clearTimeout(timer); // stop the timer if the effects run again
        }

    }, [flashMessage]);

    return <>
        {
            message.message && (
                <div className={`alert alert-${message.type}`}>
                    {message.message}
                </div>
            )
        }</>
}