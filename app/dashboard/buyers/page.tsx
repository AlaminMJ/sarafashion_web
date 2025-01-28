import { columns } from "./columns";
import { DataTable } from "./data-table";
import { serverApiRequest } from "@/lib/apiServer";
import { FormDialog } from "@/components/shared/formModal";
import BuyerForm from "@/components/form/Buyer-form";
import { Button } from "@/components/ui/button";

const MerchandisersPage = async () => {
  const { data } = await serverApiRequest("GET", "/buyers");
  return (
    <div>
      <div className="flex items-end justify-end m-4 ">
        <FormDialog button={<Button>Add New Buyer</Button>}>
          <BuyerForm />
        </FormDialog>
      </div>

      <div className="w-full flex items-center justify-center">
        <div>
          <DataTable columns={columns} data={data} />
        </div>
      </div>
    </div>
  );
};

export default MerchandisersPage;
