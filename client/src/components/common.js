let admins = ["101585595450024077553", "106543447785281052218"]


export const isAdmin = (id) => {
        for (let admin of admins){
            if (id === admin)
                return true
        }
        return false
}