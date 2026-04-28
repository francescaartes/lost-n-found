import { useNavigate } from "react-router-dom";
import ItemForm from "@/components/ItemForm";

export default function Report() {
    const navigate = useNavigate();

    const handleSuccess = () => {
        navigate("/");
    };

    return (
        <div className="mx-auto space-y-6">
            <ItemForm onRefresh={handleSuccess} />
        </div>
    );
}
