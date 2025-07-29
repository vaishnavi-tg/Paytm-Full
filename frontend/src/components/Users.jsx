import { useEffect, useState } from "react"
import { Button } from "./Button"
import axios from "axios"

export const Users = () => {
    const [users, setUsers] = useState([])
    const [filter, setFilter] = useState("")

    useEffect(() => {
        axios.get("http://localhost:3000/api/v1/user/users?filter=" + filter).then(response => {
            console.log(response.data)
            setUsers(response.data.users || []) 
        }).catch(err => {
            console.error("Failed to fetch users:", err)
        })
    }, [filter])

    return <>
        <div className="font-bold mt-6 text-lg">Users</div>
        <div className="my-2">
            <input onChange={(e) => setFilter(e.target.value)} type="text" placeholder="Search users..." className="w-full px-2 py-1 border rounded border-slate-200" />
        </div>
        <div>
            {users.map(user => <User key={user._id} user={user} />)}
        </div>
    </>
}

function User({ user }) {
    return <div className="flex justify-between my-2">
        <div className="flex">
            <div className="rounded-full h-12 w-12 bg-slate-200 flex justify-center items-center mr-2">
                <div className="text-xl">{user.firstName[0]}</div>
            </div>
            <div className="flex flex-col justify-center h-full">
                <div>{user.firstName} {user.lastName}</div>
            </div>
        </div>
        <div className="flex flex-col justify-center h-full">
            <Button label={"Send Money"} />
        </div>
    </div>
}
