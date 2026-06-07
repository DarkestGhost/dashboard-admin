import { Link } from "react-router-dom";
import { HiPencil, HiTrash } from "react-icons/hi2";
import Button from "@/components/ui/Button";

const RowActions = ({ editPath, onDelete }) => {
  return (
    <>
      <Link to={editPath}>
        <Button size="sm" variant="primary" className="flex items-center gap-1 group">
          <HiPencil className="w-4 h-4" />
          <span>ویرایش</span>
        </Button>
      </Link>
      <Button
        size="sm"
        variant="danger"
        className="flex items-center gap-1 group"
        onClick={onDelete}
      >
        <HiTrash className="w-4 h-4" />
        <span>حذف</span>
      </Button>
    </>
  );
};

export default RowActions;
