import { useEffect } from "react";
import { useRouter } from "next/router";
import AddCoinForm from "../app/components/AddCoinForm";
import Navbar from "../app/components/Navbar";
import EditReviewForm from "@/app/components/EditReviewForm";

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