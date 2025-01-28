import { columns } from "./columns";
import { DataTable } from "./data-table";
import { FormDialog } from "@/components/shared/formModal";
import MerchandiserForm from "@/components/form/MerchandiserForm";
import { api, HttpMethod } from "@/lib/api";

const MerchandiserPage = async () => {
  const { data } = await api<{ data: any[] }, any>({
    method: HttpMethod.GET,
    url: "/buyers",
  });
  return (
    <div>
      <div className="flex items-end justify-end m-4 ">
        <FormDialog button="Create">
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
