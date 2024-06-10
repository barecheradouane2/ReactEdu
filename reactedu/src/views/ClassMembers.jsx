import React from "react";
import styled from "styled-components";
import { getClassMember } from "../services/apiClass";
import { useQuery } from "@tanstack/react-query";
import { useLocation } from "react-router-dom";
import Loading from "../utlis/Loading";
import Stat from "../utlis/Stat";
import { FaPeopleGroup } from "react-icons/fa6";
import { GiTeacher } from "react-icons/gi";
import { RiParentFill } from "react-icons/ri";
import { RiAdminFill } from "react-icons/ri";
import { useQueryClient, useMutation } from "@tanstack/react-query";
import TableExample from "../utlis/TableExample";
import  {removeMember} from "../services/apiClass";
import { toast } from "react-hot-toast";

const StyledDashboardLayout = styled.div`
  display: grid;
  margin-top: 60px;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  /* grid-template-rows: auto 34rem auto; */
  gap: 1.5rem;
`;

function ClassMembers() {
  
  const location = useLocation();
  const { class_id } = location.state;

  const { isLoading: loadingMembers, data } = useQuery(
    ["ClassMembers", class_id],
    () => getClassMember(class_id)
  );
   
  const queryClient = useQueryClient();

  const { mutate: remove, isLoading } = useMutation({
    mutationFn: removeMember,
    onSuccess: (data) => {
      toast.success("you remove member form class successfully");
      //setschools(prevSchools => [...prevSchools, data]);

      queryClient.invalidateQueries("ClassMembers");
    },
    onError: () => {
      toast.error("Error  remvoing member");
    },
  });

  function removemember(id) {
    const payload = {class_id:class_id, id: id  };
    remove(payload);
  }


  if (loadingMembers) return <Loading />;

  const teacher = data.filter((member) => member.role === "teacher");
  console.log("the teahcer is here", teacher.length);
  const parents = data.filter((member) => member.role === "parent");
  const admin = data.filter((member) => member.role === "admin");

  return (
    <div
      style={{
        marginTop: "60px",

        display: "flex",
        flexDirection: "column",
        gap: "15px",
        width: "100%",
      }}
    >
      <StyledDashboardLayout>
        <Stat
          title="Members"
          color="blue"
          icon={<FaPeopleGroup />}
          value={data.length}
        />
        <Stat
          title="Teachers"
          color="green"
          icon={<GiTeacher />}
          value={teacher.length}
        />
        <Stat
          title="Parents"
          color="indigo"
          icon={<RiParentFill />}
          value={parents.length}
        />
        <Stat
          title="Admin"
          color="yellow"
          icon={<RiAdminFill />}
          value={admin.length}
        />
      </StyledDashboardLayout>

      <TableExample
          Members={data}
          type="member"
          removemember={removemember}
        />
    </div>
  );
}

export default ClassMembers;
