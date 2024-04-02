import * as React from "react";
import { styled } from "@mui/material/styles";
import MuiAccordion, { AccordionProps } from "@mui/material/Accordion";
import MuiAccordionSummary, {
  AccordionSummaryProps,
} from "@mui/material/AccordionSummary";
import MuiAccordionDetails from "@mui/material/AccordionDetails";
import { ArrowDownIcon } from "@/shared/components/icons/arrow-down";

const Accordion = styled((props: AccordionProps) => (
  <MuiAccordion disableGutters elevation={0} square {...props} />
))(({ theme }) => ({
  "&:not(:last-child)": {
    borderBottom: 0,
  },
  "&::before": {
    display: "none",
  },
  color: "white",
  backgroundColor: "transparent",
  padding: 0,
}));

const AccordionSummary = styled((props: AccordionSummaryProps) => (
  <MuiAccordionSummary
    expandIcon={<ArrowDownIcon className="rotate-180" />}
    {...props}
  />
))(() => ({
  height: 90,

  "& .MuiAccordionSummary-expandIconWrapper.Mui-expanded": {
    transform: "rotate(180deg)",
    borderBottom: "0px",
  },

  padding: 0,
  borderBottom: "1px solid rgba(255,255,255,0.25)",
  "&:last-child": {
    borderBottom: 0,
  },
}));

const AccordionDetails = styled(MuiAccordionDetails)(() => ({
  "& .MuiAccordionDetails-root": {
    padding: 0,
  },
}));

export { Accordion, AccordionDetails, AccordionSummary };
