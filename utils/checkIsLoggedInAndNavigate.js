import axios from 'axios';
import { useEffect } from 'react';
import { useRouter } from 'next/router';

function checkIsLoggedInAndNavigate(passedPath, failedPath) {
    const router = useRouter();

    useEffect(() => {
        const id = sessionStorage.getItem("id");
        const username = sessionStorage.getItem("username");

        if (id && username) {
            const verifyUser = async () => {
                try {
                    const response = await axios.post(`${process.env.NEXT_PUBLIC_SERVER_URL}/verify-user`, { id, username });

                    if (response.status === 200) {
                        const { _id, name, email, role } = response.data.user;
                        sessionStorage.setItem('id', _id);
                        sessionStorage.setItem('name', name);
                        sessionStorage.setItem('email', email);
                        sessionStorage.setItem('username', username);
                        sessionStorage.setItem('role', role);
                        router.push(passedPath);
                        // alert('passed')
                    } else {
                        console.log(response.data.message);
                        router.push(failedPath);
                    }
                } catch (error) {
                    console.error("Error verifying user: ", error);
                    router.push(failedPath);
                }
            };
            verifyUser();
        } else {
            console.log("logged out");
            router.push(failedPath);
        }
    }, [passedPath, failedPath]);
}

export default checkIsLoggedInAndNavigate;
