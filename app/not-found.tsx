import { Button } from "@/components/ui";
import Link from "next/link";

export default function NotFound() {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen">
            <main className="text-center p-4">
                <h1 className="font-bold text-2xl">Not Found</h1>
                <p>Could not find requested resource</p>
                <Button className="mt-4" variant="outline" asChild size={"sm"}>
                    <Link href="/">Return Home</Link>
                </Button>
            </main>
        </div>
    );
}
