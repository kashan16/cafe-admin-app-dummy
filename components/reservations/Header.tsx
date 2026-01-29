export default function Header() {
    return (
        <div className="mb-6 sm:mb-10 text-center sm:text-left">
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight text-foreground">
                Reservation Dashboard
            </h1>
            <p className="text-sm sm:text-base text-muted-foreground mt-2 max-w-2xl">
                Manage and track reservation in real time.
            </p>
        </div>
    );
}
