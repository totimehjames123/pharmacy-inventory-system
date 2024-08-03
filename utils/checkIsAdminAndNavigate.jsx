import { useEffect } from "react";
import { useRouter } from "next/router";
import checkIsAdmin from "./checkIsAdmin";

function CheckIsAdminAndNavigate() {
    const router = useRouter();

    useEffect(() => {
        if (checkIsAdmin() !== true){
            router.push('/login');
        }
    }, [router]);

    return null;
}

export default CheckIsAdminAndNavigate;
