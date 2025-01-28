import { columns } from "./columns";
import { DataTable } from "./data-table";
import { serverApiRequest } from "@/lib/apiServer";
import { FormDialog } from "@/components/shared/formModal";
import MerchandiserForm from "@/components/form/MerchandiserForm";

const MerchandiserPage = async () => {
  const { data } = await serverApiRequest("GET", "/merchandisers");
  return (
    <div>
      <div className="flex items-end justify-end m-4 ">
        <FormDialog buttonText="Add Merchandiser">
          <MerchandiserForm />
        </FormDialog>
      </div>

      <div className="w-full flex items-center justify-center">
        <div className="w-1/2">
          <DataTable columns={columns} data={data} />
        </div>
        <MerchandiserForm />
      </div>
    </div>
  );
};

export default MerchandiserPage;
