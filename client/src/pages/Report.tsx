import { useNavigate } from "react-router-dom"
import ItemForm from "@/components/ItemForm"

export default function Report() {
    const navigate = useNavigate()

    const handleSuccess = () => {
        navigate("/")
    }

    return (
        <div className="max-w-3xl mx-auto">
            <ItemForm onRefresh={handleSuccess} />
        </div>
    )
}