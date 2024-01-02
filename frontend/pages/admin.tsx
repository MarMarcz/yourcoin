import { useEffect } from "react";
import { useRouter } from "next/router";


export default function Admin() {
    const router = useRouter();

    useEffect(() => {
        const isLoggedIn = localStorage.getItem('isLoggedIn');
        if (!isLoggedIn) {
            router.push('/login');
        }
    }, []);

    return (
        <h1>Works</h1>
    );
}