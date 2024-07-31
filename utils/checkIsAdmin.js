
function checkIsAdmin() {

    const role = window?.sessionStorage.getItem("role")

    if (role === "admin"){
        // return true
        alert(role)
    }
    else if (role === "student") {
        return false
    }

  return 0
}

export default checkIsAdmin