import TableExample from "../utlis/TableExample";
import { useQuery } from "@tanstack/react-query";
import { getSchoolMembers } from "../services/apiSchool";
import { useLocation } from "react-router-dom";
import Loading from "../utlis/Loading";
import { useQueryClient, useMutation } from "@tanstack/react-query";
import { RemoveMember } from "../services/apiSchool";
import { toast } from "react-hot-toast";
import styled from "styled-components";
import Stats from "../utlis/Stats";
import { useEffect } from "react";

const StyledDashboardLayout = styled.div`
  display: grid;
  margin-top: 60px;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  /* grid-template-rows: auto 34rem auto; */
  gap: 1.5rem;
`;
function Members() {


  const location = useLocation();
  const { school_id } = location.state;

  const { isLoading: loadingMembers, data } = useQuery(
    ["SchoolMembers", school_id],
    () => getSchoolMembers(school_id)
  );

  const queryClient = useQueryClient();

  const { mutate: remove, isLoading } = useMutation({
    mutationFn: RemoveMember,
    onSuccess: (data) => {
      toast.success("you remove member form school successfully");
      //setschools(prevSchools => [...prevSchools, data]);

      queryClient.invalidateQueries("SchoolMembers");
    },
    onError: () => {
      toast.error("Error  remvoing member");
    },
  });

  function removemember(id) {
    const payload = { id: id };
    remove(payload);
  }

  if (loadingMembers) return <Loading />;
  //  console.log(data);

  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      gap:'15px',
      width: '100%'
    }}>
      
        <StyledDashboardLayout>
          <Stats Members={data} />
        </StyledDashboardLayout>
      

      <div style={{ width: "100%" }}>
        <TableExample
          Members={data}
          type="member"
          removemember={removemember}
        />
      </div>
    </div>
  );
}

export default Members;
