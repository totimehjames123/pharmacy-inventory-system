function checkIsAdmin() {
    if (typeof window !== 'undefined') {
        const role = window?.sessionStorage?.getItem("role");

        if (role === "admin") {
            return true
        } else if (role === "student") {
            return false;
        }
    }

    return 0;
}

export default checkIsAdmin;
