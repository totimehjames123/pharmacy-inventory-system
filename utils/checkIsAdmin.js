function checkIsAdmin() {
    if (typeof window !== 'undefined') {
        const role = window?.sessionStorage?.getItem("role");

        if (role === "admin") {
            return true
        } else if (role === "worker") {
            return false;
        }
    }

    return 0;
}

export default checkIsAdmin;
