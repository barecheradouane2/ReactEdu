
import { useLocation } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getSchoolJoinRequests } from "../services/apiSchoolRequest";
import Loading from "../utlis/Loading";
import TableExample from "../utlis/TableExample";
import { useQueryClient, useMutation } from "@tanstack/react-query";
import { toast } from "react-hot-toast";

import {getClassRequests} from "../services/apiClassRequests";

import  {ApproveJoinRequest } from "../services/apiClassRequests";    
import {RefuseJoinRequests} from "../services/apiClassRequests";

function ClassJoinRequests() {

    const location = useLocation();
    const { class_id } = location.state;
  
    const { isLoading: loadingJoinRequests, data, error } = useQuery(
      ["ClassJoinRequests", class_id],
      () => getClassRequests(class_id),
      {
        retry: false, // Option to not retry if the request fails
        onError: (err) => {
          console.error('Error fetching class join requests:', err);
        },
      }
    );
    function remove() {}
  
    const queryClient = useQueryClient();
  
    const { mutate: approve, isLoading: lodingapprove } = useMutation({
      mutationFn: ApproveJoinRequest,
      onSuccess: (data) => {
        toast.success(data.message);
        //setschools(prevSchools => [...prevSchools, data]);
  
        queryClient.invalidateQueries("ClassMembers");
        queryClient.invalidateQueries("ClassJoinRequests");
      },
      onError: () => {
        toast.error("Error  for approving join to  a class");
      },
    });
  
    const { mutate: refuse, isLoading } = useMutation({
      mutationFn: RefuseJoinRequests,
      onSuccess: (data) => {
        toast.success(data.message);
  
        queryClient.invalidateQueries("ClassMembers");
        queryClient.invalidateQueries("ClassJoinRequests");
      },
      onError: () => {
        toast.error("Error  for refusing join to  a class");
      },
    });
  
    if (loadingJoinRequests) return <Loading />;

    if (error) return <div>Error: {error.message}</div>;

    console.log(data);











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
    )
}

export default ClassJoinRequests
