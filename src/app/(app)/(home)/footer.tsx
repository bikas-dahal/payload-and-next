export const Footer = () => {
    return (
        <footer className="flex border-t justify-between font-medium p-6">
            <div>
                <p>
                    &copy; {new Date().getFullYear()} Payload. All rights reserved.
                </p>
            </div>
        </footer>
    )
}