import { useEffect } from "react";
import { useRouter } from "next/router";
import AddCoinForm from "../app/components/admin/AddCoinForm";
import Navbar from "../app/components/Navbar";
import EditReviewForm from "../app/components/admin/EditReviewForm";

export default function Admin() {
    const router = useRouter();

    useEffect(() => {
        const isLoggedIn = localStorage.getItem('isLoggedIn');
        if (!isLoggedIn) {
            router.push('/login');
        }
    }, []);

    return (
        <>
        <Navbar />
        <AddCoinForm />
        <EditReviewForm />
        </>
    );
}