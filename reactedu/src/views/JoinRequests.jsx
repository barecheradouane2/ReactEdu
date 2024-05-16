import { useLocation } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getSchoolJoinRequests } from "../services/apiSchoolRequest";
import Loading from "../utlis/Loading";
import TableExample from "../utlis/TableExample";
import { useQueryClient, useMutation } from "@tanstack/react-query";
import { ApproveJoinRequest } from "../services/apiSchoolRequest";
import { toast } from "react-hot-toast";
import { RefuseJoinRequests } from "../services/apiSchoolRequest";

function JoinRequests() {
  const location = useLocation();
  const { school_id } = location.state;
  const { isLoading: lodingjoinrequests, data } = useQuery(
    ["SchoolJoinRequests"],
    getSchoolJoinRequests
  );
  function remove() {}

  const queryClient = useQueryClient();

  const { mutate: approve, isLoading: lodingapprove } = useMutation({
    mutationFn: ApproveJoinRequest,
    onSuccess: (data) => {
      toast.success(data.message);
      //setschools(prevSchools => [...prevSchools, data]);

      queryClient.invalidateQueries("SchoolMembers");
      queryClient.invalidateQueries("SchoolJoinRequests");
    },
    onError: () => {
      toast.error("Error  for joinning  a school");
    },
  });

  const { mutate: refuse, isLoading } = useMutation({
    mutationFn: RefuseJoinRequests,
    onSuccess: (data) => {
      toast.success(data.message);

      queryClient.invalidateQueries("SchoolMembers");
      queryClient.invalidateQueries("SchoolJoinRequests");
    },
    onError: () => {
      toast.error("Error  for joinning  a school");
    },
  });

  if (lodingjoinrequests) return <Loading />;

  return (
    <div style={{ marginTop: "65px", width: "100%" }}>
      <TableExample
        Members={data}
        type="join"
        removemember={remove}
        refuse={refuse}
        approve={approve}
      />
    </div>
  );
}

export default JoinRequests;
