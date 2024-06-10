import DemoPaper from "@mui/material/Paper";
import { Typography } from "@mui/material";
import Box from "@mui/material/Box";
import { Link } from "react-router-dom";
import { useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { useLocation } from "react-router-dom";
import { useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";

function NewClassItem({ school_id, mycalss }) {
  const [open, setOpen] = useState(false);
  const { t } = useTranslation();
  const location = useLocation();
  const { schoolname } = useParams();
  const queryClient = useQueryClient();

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <DemoPaper
        variant="elevation"
        sx={{
          padding: "10px",
          height: "220px",
          overflow: "hidden",
          position: "relative",
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Box sx={{ width: "100px", height: "100px", objectFit: "cover" }}>
            <img
              src={
                mycalss.image
                  ? `http://localhost:8000/storage/${mycalss.image}`
                  : "../../public/school.webp"
              }
              style={{ width: "100%", height: "100%", borderRadius: "50%" }}
            />
          </Box>

          <Typography variant="h6">
            {mycalss.name.charAt(0).toUpperCase() + mycalss.name.slice(1)}
          </Typography>
          <Typography variant="body1" sx={{ color: "var(--color-blue-700)" }}>
            {t("class_admin")} :{" "}
            {mycalss.teacher_first_name.charAt(0).toUpperCase() +
              mycalss.teacher_first_name.slice(1) +
              " " +
              mycalss.teacher_last_name.charAt(0).toUpperCase() +
              mycalss.teacher_last_name.slice(1)}
          </Typography>
          <Typography variant="body2" sx={{ opacity: 0.5 }}>
            {t("members")} : {mycalss.members_count}
          </Typography>

          <Link
            to={`/home/schools/${schoolname}/classes/${encodeURIComponent(
              mycalss.name
            )}`}
            style={{ textDecoration: "none" }}
            state={{ school_id: school_id, class_id: mycalss.id }}
          >
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Box sx={{ width: "100px", height: "100px", objectFit: "cover" }}>
                <img
                  src={
                    mycalss.image
                      ? `http://localhost:8000/storage/${mycalss.image}`
                      : "../../public/school.webp"
                  }
                  style={{ width: "100%", height: "100%", borderRadius: "50%" }}
                />
              </Box>

              <Typography variant="h6">
                {mycalss.name.charAt(0).toUpperCase() + mycalss.name.slice(1)}
              </Typography>
              <Typography variant="body1" sx={{ color: "var(--color-blue-700)" }}>
                Admin :{" "}
                {mycalss.teacher_first_name.charAt(0).toUpperCase() +
                  mycalss.teacher_first_name.slice(1) +
                  " " +
                  mycalss.teacher_last_name.charAt(0).toUpperCase() +
                  mycalss.teacher_last_name.slice(1)}
              </Typography>
              <Typography variant="body2" sx={{ opacity: 0.5 }}>
                Members : {mycalss.members_count}
              </Typography>
            </Box>
          </Link>
        </Box>
      </DemoPaper>
    </>
  );
}

export default NewClassItem;
